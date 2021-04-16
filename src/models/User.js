import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
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

userSchema.statics.encryptPassword = async (psw) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(psw, salt);
};

userSchema.statics.comparePassword = async (psw, pswToCompare) => {
    return await bcrypt.compare(psw, pswToCompare)
}

export default model('User', userSchema);