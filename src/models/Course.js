import { Schema, model } from 'mongoose'

var participationSubSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        score: {
            type: Number,
            required: true
        }

    }, { _id: false }

);

const courseSchema = new Schema(
    {
        theme: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        students: [participationSubSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Course', courseSchema);