import Student from '../models/Student'

export const get = async (req, res) => {
    const students = await Student.find();

    res.status(200).json(students)
}

export const create = async (req, res) => {
    const { fname, lname, dni, address } = req.body;

    const newStudent = new Student({ fname, lname, dni, address })

    await newStudent.save();

    res.status(201).json(newStudent);
}

export const deleteById = async (req, res) => {
    const {id} = req.params;

    await Student.findByIdAndDelete(id);

    res.status(200).json()
}

export const getWithCourse = async (id) => {
    const students = await Student.find().where(`this.participations.course =${id}`);

    return students;
}