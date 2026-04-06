import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
  const { userName, email, password } = req.body;

  await User.create({
    userName,
    email,
    password,
  });
  res.json({msg : "User created successfully"})
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Invalid password");

    const token = jwt.sign(
        { id: user._id },
        "secretkey",
        { expiresIn: "1h" }
    );

    res.json({ token });
    
};



