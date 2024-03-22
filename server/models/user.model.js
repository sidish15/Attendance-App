import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
                type: String,
                // required: true,

        },
        email: {
                type: String,
                // required: true,
                // unique: true
        },
        password: {
                type: String,
                // required: true,

        },

}, { timestamps: true })


// timestamps tell us the time of creation and updation of user 
const User = mongoose.model('User', userSchema);

export default User;