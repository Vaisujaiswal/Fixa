// backend/middlewares/auth.js
import jwt from "jsonwebtoken";

const authReview = (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header) return res.status(401).json({ success: false, message: "No token provided" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // use req.userId in controllers
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authReview;
