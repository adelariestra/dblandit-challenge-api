import { Schema, model } from 'mongoose'

const studentSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: true,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Student', studentSchema);