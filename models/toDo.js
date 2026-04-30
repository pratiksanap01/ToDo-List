import mongoose, { Schema } from "mongoose";

const toDoSchema = new Schema({
    title:{
        type: String
    },
    description: {
        type: String
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {timestamps: true}
);


export const Todo = mongoose.model("Todo", toDoSchema);