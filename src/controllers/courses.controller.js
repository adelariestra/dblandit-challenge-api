import Course from '../models/Course'

export const get = async (req, res) => {
    const Courses = await Course.find();

    res.status(200).json(Courses)
}

export const create = async (req, res) => {
    // console.log(req.body);
    const { theme, year, duration } = req.body;

    const newCourse = new Course({ theme, year, duration })

    await newCourse.save();

    res.status(201).json(newCourse);
}