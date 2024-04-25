import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import mongoose from "mongoose";
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

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;

        return res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

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


        const validUser = await user.findOne({ username });
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

// signIn with google

export const google = async (req, res, next) => {
    const { name, email, profileImage } = req.body;
    let splitName = name.split(' ');
    const firstName = splitName[0];
    const lastName = splitName[1];

    try {
        const validUser = await user.findOne({ email });
        if (validUser) {

            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = validUser._doc;

            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);

        } else {
            const username = firstName + lastName + Math.random().toString(9).slice(-4);
            const passs = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const password = bcryptjs.hashSync(passs, 10);

            const newUser = new user({
                username,
                email,
                password,
                profileImage
            });

            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);


        }
    } catch (error) {
        next(error);
    }

}
