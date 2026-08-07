import express from "express";
import { 
    loginUser,
    logoutUser,
    registerUser
    } from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser)

export default router;