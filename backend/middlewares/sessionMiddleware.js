import { Session } from "../models/session";

const sessionMiddkeware = async(req, res, next) => {

    const sessionId = req.headers["session-id"];

    if(!sessionId) {
        return res.status(401).json({
            message: "Session ID is required"
        });
    }

    const session = await Session.find({sessionId});

    if(!session) {
        return res.status(401).json({
            message: "Invalid Session"
        });
    }

    if (session.expiresAt < new Date()) {
        return res.status(401).json({
            message: "Session Expired"
        });
    }

    req.session = session;


    next();
}

export default sessionMiddleware;