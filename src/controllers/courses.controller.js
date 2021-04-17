import Course from '../models/Course'
import handleError from '../utils/handleMongooseError'

const fillCourseWithStudents = async (id) => {
    const course = await Course.findById(id)
        .populate('students.student', 'fname lname dni address')
        .exec();

    return course.toObject();
}

export const get = async (req, res) => {
    const courses = await Course.find(req.query)
        .select('theme year');

    res.status(200).json(courses)
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id)
        if (!course) {
            res.status(404).json({ message: "Course not found." })
            return;
        }

        var courseWithStudents = await fillCourseWithStudents(id);

        res.status(200).json(courseWithStudents)
    } catch (e) { handleError(e, res); }
}

export const create = async (req, res) => {
    const { theme, year, duration, students } = req.body;

    const newCourse = new Course({ theme, year, duration, students })

    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (e) {
        handleError(e, res);
    }
}

export const deleteById = async (req, res) => {
    const { id } = req.params;

    await Course.findByIdAndDelete(id, function (err, doc) {
        if (err) { 
            handleError(err,res);
            return;
        }
        if (!doc) {
            res.status(404).json({message:"Course not found."})
            return;
        }
        res.status(204).json()
    });
}

export const addStudent = async (req, res) => {
    const { id } = req.params;
    const { student, score } = req.body;

    try {
        var course = await Course.findById(id)
        if (!course) {
            res.status(404).json({ message: "Course not found." })
            return;
        }
        
        course = course.toObject();

        if (course.students.some((st) => { return st.student == student; })) {
            res.status(409).json({message:"Student already in course."});
            return;
        }
        var courseFound = await Course.findOneAndUpdate(
            { _id: id },
            { $push: { students: { student, score } } },
            { new: true }
        )

        await courseFound.save();

        res.status(200).json(courseFound);

    } catch (e) { handleError(e, res); }
}

export const removeStudent = async (req, res) => {
    const { id, studentId } = req.params;
    try {
        const course = await Course.findById(id)
        if (!course) {
            res.status(404).json({ message: "Course not found." })
            return;
        }

        const courseFound = await Course.findOneAndUpdate(
            { _id: id },
            { $pull: { students: { student: studentId } } },
            { new: true }
        )

        await courseFound.save();

        res.status(204).json(courseFound);
    } catch (e) { handleError(e, res); }

}

export const getStudents = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id)

        if (!course) {
            res.status(404).json({ message: "Course not found." })
            return;
        }

        const courseWithStudents = await fillCourseWithStudents(id);

        const students = courseWithStudents
            .students
            .map(student => student.student);

        res.status(200).json(students);
    } catch (e) { handleError(e, res); }
}

export const getBestStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id)

        if (!course) {
            res.status(404).json({ message: "Course not found." })
            return;
        }

        const courseWithStudents = await fillCourseWithStudents(id);

        const students = courseWithStudents.students

        if (students.length == 0) {
            res.status(200).json({});
            return;
        }

        const student = students.reduce((curr, next) => {
            return curr.score > next.score ? curr : next;
        }).student;

        res.status(200).json(student);

    } catch (e) { handleError(e, res); }

}