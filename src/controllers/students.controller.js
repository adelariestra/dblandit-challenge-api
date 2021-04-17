import Student from '../models/Student'
import handleError from '../utils/handleMongooseError'

export const get = async (req, res) => {
    const students = await Student.find();

    res.status(200).json(students)
}

export const create = async (req, res) => {
    const { fname, lname, dni, address } = req.body;

    const newStudent = new Student({ fname, lname, dni, address })

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (e) {
        handleError(e, res);
    }

}

export const deleteById = async (req, res) => {
    const { id } = req.params;

    await Student.findByIdAndDelete(id, function (err, doc) {
        if (err) { 
            handleError(err,res);
            return;
        }
        if (!doc) {
            res.status(404).json({message:"Student not found."})
            return;
        }
        res.status(204).json()
    });
}

