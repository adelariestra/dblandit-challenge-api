import { Schema, model } from 'mongoose'

var participationSubSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
        score: Number,

    }, { _id: false }

);

const courseSchema = new Schema(
    {
        theme: String,
        year: Number,
        duration: Number,
        students: [participationSubSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Course', courseSchema);