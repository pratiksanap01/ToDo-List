import express from "express";

import {
    findReceiver,
    checkSelfRequest,
    checkAlreadyFriends,
    checkPendingRequest,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
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

router.patch(
    "/request/:requestId/accept",
    authMiddleware,
    acceptFriendRequest
);

router.patch(
    "/request/:requestId/reject",
    authMiddleware,
    rejectFriendRequest
);

export default router;