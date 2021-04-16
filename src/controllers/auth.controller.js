import User from '../models/User'
import { PSW_SEED, SESSION_DURATION } from '../config/config.json'
import handleError from '../utils/handleMongooseError'
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOne({ username: username });
    
        console.log(user)

        if (!await User.comparePassword(password, user.password)){
            res.status(401).json({ token: null, message: "Invalid password" });
            return;
        }
        const token = jwt.sign({ id: user._id }, PSW_SEED, {
            expiresIn: SESSION_DURATION
        });

        res.status(200).json({token:token});
    } catch (e) { handleError(e, res); }
}

export const logout = async (req, res) => {
    console.log(req.body);
    // query 

    // res.status(200).json(...)
}