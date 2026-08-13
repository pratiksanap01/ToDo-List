import express from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import { getAllUsers } from "../controllers/admin.js";

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);



export default router;