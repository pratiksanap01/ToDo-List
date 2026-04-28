import { Router } from "express";
import { loginUser, registerUser,verifyUser } from "../controllers/user.js";

const router = Router()

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyUser);

export default router;