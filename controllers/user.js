import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)

  await User.create({
    username,
    email,
    password,
  });
  res.json({msg : "User created successfully"})

// user save hone ke baad ↓

const token = jwt.sign(
  { id: User._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

const verifyLink = `http://localhost:5000/api/users/verify/${token}`;

console.log("VERIFY LINK:", verifyLink);

res.json({
  message: "User registered. Verify link generated",
});
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

    if (!user.isVerified) {
  return res.status(401).json({
    message: "Please verify your email first"
  });
}
};

export const verifyUser = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    res.send("Email verified successfully");
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
};



