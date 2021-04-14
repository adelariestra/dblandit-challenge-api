import { Schema, model } from 'mongoose'

const studentSchema = new Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        dni: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Student', studentSchema);