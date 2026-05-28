import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import todoRouter from "./routes/toDo.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected!!");

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on PORT ${process.env.PORT || 3000}`);
    });
})
.catch((err) => {
    console.log(err.message);
});