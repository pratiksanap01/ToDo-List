import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password -refreshToken");

        return res.json(users);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};