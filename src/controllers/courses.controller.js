import Course from '../models/Course'

export const get = async (req, res) => {
    const courses = await Course.find(req.query)
    .select('theme year');

    res.status(200).json(courses)
}

export const create = async (req, res) => {
    // console.log(req.body);
    const { theme, year, duration } = req.body;

    const newCourse = new Course({ theme, year, duration })

    await newCourse.save();

    res.status(201).json(newCourse);
}

export const deleteById = async (req, res) => {
    const { id } = req.params;

    await Course.findByIdAndDelete(id);

    res.status(200).json()
}