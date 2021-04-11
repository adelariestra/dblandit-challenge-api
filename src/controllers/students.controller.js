import Student from '../models/Student'
import handleError from '../utils/handleMongooseError'

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
    const { id } = req.params;
    try {
        await Student.findByIdAndDelete(id);

        res.status(204).json()
    } catch (e) { handleError(e, res); }

}

