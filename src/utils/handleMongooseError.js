import mongoose from 'mongoose'

const handleError = (e, res) => {
    if (e instanceof mongoose.Error.CastError)
        res.status(422).json("Invalid course ID.");
    else
        res.status(400).json(e);
}

export default handleError;