import { Todo } from "../models/toDo.js";

export const createToDo = async (req, res) => {
    const {title, description} = req.body;

    await Todo.create({
        title,
        description
    })

    res.json({msg: "ToDo Created!!"})
};

export const getToDos = async (req, res) => {
    const toDos = await Todo.find() .select("title description");;
    res.json({toDos});
}