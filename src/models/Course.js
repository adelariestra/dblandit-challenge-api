import { Schema, model } from 'mongoose'

const courseSchema = new Schema(
    {
        theme: String,
        year: String,
        duration: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Course', courseSchema);