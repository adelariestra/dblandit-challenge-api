import Student from '../models/Student'

export const get = (req, res) => {
    res.json([{
        name: "manolo",
        lname: "sanchez"
    },
    {
        name: "manolo",
        lname: "manoles"
    }])
}

export const create = (req, res) => {
    console.log(req.body)

    const { fname, lname, dni, address } = req.body;

    const newStudent = new Student({
        fname: fname,
        lname: lname,
        dni: dni,
        address: address
    })

    res.json(newStudent);
}