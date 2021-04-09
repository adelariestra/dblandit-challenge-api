import { Schema, model } from 'mongoose'

const studentSchema = new Schema(
    {
        fname: String,
        lname: String,
        dni: Number,
        address: String,
        participations: [
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
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

export default model('Student', studentSchema);