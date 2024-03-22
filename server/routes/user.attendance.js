import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { attendance, records } from "../controllers/user.controller.js";
const router = express.Router()


router.get("/attendance/:id", verifyUser, attendance)
router.get("/records/:id", verifyUser, records)

export default router;