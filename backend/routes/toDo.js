import express from "express";

import authMiddleware from "../middlewares/auth.js";

import {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    markCompleteIncomplete
} from "../controllers/toDo.js";

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.delete("/:id", authMiddleware, deleteTodo);
router.put("/update-todo/:id", authMiddleware, updateTodo);
router.patch("/:id/complete", authMiddleware, markCompleteIncomplete)

export default router;