import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (!username || !email || !password || username === '' || password === '' || email === '') {
        next(errorHandler(400,"All fields are required"));
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
    }catch(err){
        next(err);
    }
}
