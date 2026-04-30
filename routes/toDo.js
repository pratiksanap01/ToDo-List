import { Router } from "express";
import { createToDo, getToDos } from "../controllers/toDo.js";
import {authMiddleware} from "../middlewares/auth.js";

const toDoRouter = Router();

toDoRouter.post("/", authMiddleware, createToDo);
toDoRouter.get("/", authMiddleware,getToDos)

export default toDoRouter;