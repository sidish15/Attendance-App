import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
        try {
                const { name, email, password } = req.body;
                const hashedPassword = bcryptjs.hashSync(password, 10);
                const newUser = new User({ name, email, password: hashedPassword })
                // console.log(newUser)
                await newUser.save();
                return res.status(201).json("User create successfully")

        } catch (error) {
                next(error)

        }

}

export const signin = async (req, res, next) => {
        const { email, password } = req.body;
        try {
                const validUser = await User.findOne({ email: email })
                if (!validUser) return next(errorHandler(404, "user not found"))
                const validPassword = bcryptjs.compareSync(password, validUser.password)
                if (!validPassword) return next(errorHandler(401, "Wrong Credentials"))
                const token = jwt.sign({ user: validUser }, process.env.JWT_SECRET)


                // console.log(token);
                const { password: pass, ...rest } = validUser._doc;
                res
                        .cookie("access_token", token, { httpOnly: true })
                        .status(200)
                        .json(rest)

        } catch (error) {
                next(error)
        }
}

export const signOut = async (req, res, next) => {
        try {
                res.clearCookie('access_token');
                return res.status(200).json('User has been logged out!')
        } catch (error) {
                next(error)
        }
}