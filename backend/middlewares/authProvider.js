import jwt from 'jsonwebtoken';



const authProvider = (req, res, next) => {
  try {
    // Read token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1]; // remove 'Bearer '
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ use req.userId instead of req.body.proId

    next();
  } catch (error) {
    console.error("JWT Error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token expired, please login again" });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid token, please login again" });
  }
};



export default authProvider;
