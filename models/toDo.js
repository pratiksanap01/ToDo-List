import mongoose, { Schema } from "mongoose";

const toDoSchema = new Schema({
    title:{
        type: String
    },
    description: {
        type: String
    } 
}, {timestamps: true}
);


export const Todo = mongoose.model("Todo", toDoSchema);