import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const signup = async (req, res, next) => {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (!username || !email || !password || username === '' || password === '' || email === '') {
        next(errorHandler(400, "All fields are required"));
    }

    const hashedpassword = bcryptjs.hashSync(password, 10);

    const newUser = new user({
        username,
        email,
        password: hashedpassword
    });

    try {
        await newUser.save();
        res.json("Account Created Successfull");
    } catch (err) {
        next(err);
    }
}


//Signin Function 
export const signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === '' || password === '') {
        return next(errorHandler(400, "Enter Valid Credentials"));
    }

    // finding user
    try {


        const validUser = await User.findOne({ username });
        if (!validUser) {
            return next(errorHandler(404, "Invalid Username or Password"));
        }
        // checking password
        const validPass = await bcryptjs.compareSync(password, validUser.password);
        if (!validPass) {
            return next(errorHandler(404, "Invalid Username or Password"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;


        return res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);
    } catch (error) {
        return next(error);
    }
}