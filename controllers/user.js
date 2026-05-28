import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({
                message: "All fields required"
            });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        await User.create({
            username,
            email,
            password
        });

        return res.json({
            message: "User registered successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email) {
            return res.json({message:"Email is required!!"})
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save();

        return res.json({
            accessToken,
            refreshToken
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};

export const refreshAccessToken = async (req, res) => {

    try {

        const { refreshToken } = req.body;

        if(!refreshToken) {
            return res.status(401).json({
                message: "Refresh token required"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if(!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = user.generateAccessToken();

        return res.json({
            accessToken: newAccessToken
        });

    } catch (error) {

        return res.status(403).json({
            message: "Invalid refresh token"
        });
    }
};

export const logoutUser = async (req, res) => {
    const user = await User.findById(req.user.id);
    
    if(!user){
        return res.json({message: "User not exist"})
    }
    user.refreshToken = null;
    await user.save();

    return res.json({
  "message": "Logged out successfully"
});

}