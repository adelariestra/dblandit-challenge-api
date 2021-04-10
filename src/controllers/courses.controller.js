import Course from '../models/Course'
import { getWithCourse } from './students.controller'

export const get = async (req, res) => {
    const courses = await Course.find(req.query)
        .select('theme year');

    res.status(200).json(courses)
}

export const getById = async (req, res) => {
    const { id } = req.params;
    var course = await (await Course.findById(id)).toObject();

    res.status(200).json(course)
}

export const create = async (req, res) => {
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

export const addStudent = async (req, res) => {
    const { id } = req.params;
    const { student, score } = req.body;

    const courseFound = await Course.findOneAndUpdate(
        { _id: id },
        { $push: { students: { student, score } } }
    )

    courseFound.save();

    res.status(200).json(courseFound);
}

export const removeStudent = async (req, res) => {
    const { theme, year, duration } = req.body;

    const newCourse = new Course({ theme, year, duration })

    await newCourse.save();

    res.status(201).json(newCourse);
}