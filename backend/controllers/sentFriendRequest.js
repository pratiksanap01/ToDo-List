import { FriendRequest } from "../models/friendsRequest";
import { User } from "../models/user";

export const findReceiver = async (req, res,next) => {
    try {
        const receiverID = req.params.receiverID

        const receiver = await User.findById(receiverID)
        req.receiver = receiver;

        if (!receiver) {
            return res.status(404).json({
                message: "Receiver not found"
            });
        }
        next();

        
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}