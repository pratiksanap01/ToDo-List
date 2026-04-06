import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.js";
import toDoRouter from "./routes/toDo.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(
    `${process.env.MONGODB_URI}`,
  )
  .then(() => {
    console.log("MongoDB Connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", router)
app.use("/toDos", toDoRouter)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
