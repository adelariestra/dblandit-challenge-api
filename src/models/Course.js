import { Schema, model } from 'mongoose'

const courseSchema = new Schema(
    {
        theme: String,
        year: Number,
        duration: Number
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Course', courseSchema);