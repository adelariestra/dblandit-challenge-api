import mongoose from 'mongoose'

const handleError = (e, res) => {
    if (e instanceof mongoose.Error.CastError)
        res.status(422).json({message: "Invalid ID."});
    else if (e instanceof mongoose.Error.ValidationError)
        res.status(400).json({message: "Invalid data or missing."});
    else{
        res.status(400).json(e);
    }
}

export default handleError;