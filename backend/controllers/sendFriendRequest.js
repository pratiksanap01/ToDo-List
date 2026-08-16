import { FriendRequest } from "../models/friendsRequest.js";
import { User } from "../models/user.js";

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

export const checkSelfRequest = async (req, res, next) => {
    try {
        const receiverID = req.params.receiverID;
        const senderId = req.user.id;

        if(receiverID === senderId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself"
            });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const checkAlreadyFriends = async (req, res, next) => {
    try {
        const senderId = req.user.id;

        const sender = await User.findById(senderId);

        if(!sender){
            return res.status(404).json({
               message: "Sender not found"
         });
        }

         const receiverId = req.params.receiverID;

         if(sender.friends.some(
              friendId => friendId.toString() === receiverId
              )){
                  return res.status(400).json({
                     message: "Already friends !!"
                     })
         } else {
        next();
         }
     } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const checkPendingRequest = async (req, res, next) => {
    try {
        const senderId = req.user.id;

        const receiverId = req.params.receiverID;

        const isPending = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiverId,
            status: "pending"
        });

        if(!isPending){
            next();
        } else {
            return res.status(409).json({
                message: "Request already sent"
            });
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = req.params.receiverID;

        await FriendRequest.create({
            sender: senderId,
            receiver: receiverId,
            status: "pending"
        });

        return res.status(201).json({
            message: "Request sent successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const receiverId = req.user.id;

        const friendRequest = await FriendRequest.findOne({
            _id: requestId,
            receiver: receiverId,
            status: "pending"
        });

        if (!friendRequest) {
            return res.status(404).json({
                message: "Pending friend request not found"
            });
        }

        const senderId = friendRequest.sender;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        receiver.friends.push(senderId);
        sender.friends.push(receiverId);

        await receiver.save();
        await sender.save();

        friendRequest.status = "accepted";
        await friendRequest.save();

        return res.status(200).json({
            message: "Friend request accepted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

