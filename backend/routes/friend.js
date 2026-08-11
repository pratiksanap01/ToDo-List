import express from "express";

import {
    findReceiver,
    checkSelfRequest,
    checkAlreadyFriends,
    checkPendingRequest,
    sendFriendRequest
} from "../controllers/sendFriendRequest.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post(
    "/request/:receiverID",
    authMiddleware,
    findReceiver,
    checkSelfRequest,
    checkAlreadyFriends,
    checkPendingRequest,
    sendFriendRequest
);

export default router;