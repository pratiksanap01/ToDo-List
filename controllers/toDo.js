import { Todo } from "../models/toDo.js";

export const createTodo = async (req, res) => {

    try {

        const { title, description } = req.body;

        await Todo.create({
            title,
            description,
            user: req.user.id
        });

        return res.json({
            message: "Todo created"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};

export const getTodos = async (req, res) => {

    try {

        const todos = await Todo.find(
            { user: req.user.id },
            "title description completed"
        );

        return res.json({
            todos
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteTodo = async (req, res) => {

    try {

        await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        return res.json({
            message: "Todo deleted"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};
export const updateTodo = async (req, res) => {

    try {

        const id = req.params.id;

        const updatedTodo = await Todo.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if(!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.json({
            message: "Todo updated successfully",
            updatedTodo
        });
    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};