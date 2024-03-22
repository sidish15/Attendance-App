import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.attendance.js"
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
mongoose.connect(process.env.MONGO)
        .then(() => {
                console.log(`Connected to MongoDB`);
        }).catch((err) => {
                console.log(`Error : ${err}`);
        })

const __dirname = path.resolve()

const app = express();

app.use(express.json())
app.use(cookieParser())


app.listen(4000, () => {
        console.log(`Server is running on PORT 4000`);
})


app.use('/api/auth', authRouter)
app.use("/api/user", userRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
                success: false,
                statusCode,
                message
        })
})



