import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
    // 1. header se token lena
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. "Bearer token" me se token extract
    const token = authHeader.split(" ")[1];

    // 3. token verify
    const decoded = jwt.verify(token,"secretkey");

    // 4. user info store
    req.user = decoded;

    // 5. next middleware / route
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}