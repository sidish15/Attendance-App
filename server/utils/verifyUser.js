import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";

export const verifyUser = (req, res, next) => {
        const token = req.cookies.access_token;
        if (!token) return next(errorHandler(401, "Unauthorized"))
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) return next(errorHandler(401, "Forbidden"));
                console.log(data);
                console.log(data.user.name);
                req.user = data.user

                next();
        })

}