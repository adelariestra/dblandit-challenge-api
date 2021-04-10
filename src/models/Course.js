import { Schema, model } from 'mongoose'

const courseSchema = new Schema(
    {
        theme: String,
        year: Number,
        duration: Number,
        students: [
            {
                student: {
                    type: Schema.Types.ObjectId,
                    ref: 'Student',
                },
                score: Number
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Course', courseSchema);