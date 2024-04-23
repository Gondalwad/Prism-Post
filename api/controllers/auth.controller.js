import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (!username || !email || !password || username === '' || password === '' || email === '') {
        res.status(400).send("All filds are required");
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
        res.json(err.message);
    }
}
