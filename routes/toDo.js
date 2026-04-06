import { Router } from "express";
import { createToDo, getToDos } from "../controllers/toDo.js";

const toDoRouter = Router();

toDoRouter.post("/", createToDo);
toDoRouter.get("/",getToDos)

export default toDoRouter;