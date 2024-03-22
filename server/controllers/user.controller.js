import Attendance from "../models/attendance.model.js";
import { errorHandler } from "../utils/error.js"


export const attendance = async (req, res, next) => {
        if (req.user._id !== req.params.id) return next(errorHandler(401, "You cannot give attendance of others"));
        try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPresent = await Attendance.find({
                        userId: req.params.id,
                        createdAt: {
                                $gte: today,
                                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                        }
                })
                console.log(isPresent);

                if (isPresent.length !== 0) {
                        return res.status(400).json({ "message": "Attendance already marked!" })
                }

                const attendance = new Attendance({ userId: req.params.id })
                await attendance.save();
                return res.status(201).json({ "message": "Attendance marked Successfully" })
        } catch (error) {
                next(error)
        }
}


export const records = async (req, res, next) => {

        try {

                if (!req.user) {
                        return res.status(401).json({ message: "You must be logged in to access" })
                }
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0); // Set time to start of the day in UTC
                const nextDay = new Date(today);
                nextDay.setUTCHours(24, 0, 0, 0); // Set time to start of next day in UTC
                const attendanceRecords = await Attendance.find({

                        createdAt: {
                                $gte: today, // Greater than or equal to start of today
                                $lt: nextDay // Less than start of next day
                        }
                });
                console.log(attendanceRecords);
                return res
                        .status(201)
                        .json(attendanceRecords)
        } catch (err) {
                next(err)
        }
}

