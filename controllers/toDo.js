import { Todo } from "../models/toDo.js";

export const createToDo = async (req, res) => {
    const {title, description} = req.body;


    const todo = await Todo.create({
        title,
        description,
        user: req.user.id
    });

    console.log("created todo", todo)

    res.json({msg: "ToDo Created!!"})
};

export const getToDos = async (req, res) => {
    const toDos = await Todo.find({user: req.user.id}).select("title description -_id");
    res.json({toDos});
}