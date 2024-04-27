import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export default function test(req, res) {
    res.json({ message: "Test api success" });
}

export const updateUser = async (req, res, next) => {
    console.log(req.user);
    if (req.user.id !== req.params.userID) {
        return next(errorHandler(401, 'Permission Denied'))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must contain more than 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Usernames should contain between 7 and 20 characters.'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username Cannot contain Spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can contain only letters and numbers'));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userID,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profileImage: req.body.profileImage,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }

}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.userID){
        return next(errorHandler(401,'Permission Denied'));
    }

    try{
        await User.findByIdAndDelete(req.params.userID);
        res.status(200).json('Your account is deleted !');
    }catch(error){
        next(error);
    }
}

export const signOutApi = async(req,res,next)=>{
    try {
        res
          .clearCookie('access_token')
          .status(200)
          .json('User has been signed out');
      } catch (error) {
        next(error);
      }
}