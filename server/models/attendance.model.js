import mongoose, { Types } from "mongoose"
import User from "./user.model.js";

const attendanceSchema = new mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        userName: {
                type: String // This field will store the name of the user
        },
}, { timestamps: true })

attendanceSchema.pre('save', async function (next) {
        try {
                const user = await User.findById(this.userId);
                if (user) {
                        this.userName = user.name; // Populating userName field with the name of the user
                }
                next();
        } catch (error) {
                next(error);
        }
});


const Attendance = mongoose.model("Attendance", attendanceSchema)

export default Attendance;