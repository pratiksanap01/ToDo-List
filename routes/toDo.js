import express from "express";

import authMiddleware from "../middlewares/auth.js";

import {
    createTodo,
    getTodos,
    deleteTodo
} from "../controllers/toDo.js";

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;