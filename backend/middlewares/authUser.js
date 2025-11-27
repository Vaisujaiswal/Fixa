

import jwt from 'jsonwebtoken';

// Middleware for authentication
// const authUser = (req, res, next) => {
//     try {
//         const token = req.headers.atoken; // same header name you use in Postman

//         if (!token) {
//             return res.status(401).json({ success: false, message: "Access denied, no token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.body.userId = decoded.id

//         next();

//     } catch (error) {
//         console.error(error);

//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ success: false, message: "Token expired, please login again" });
//         }

//         return res.status(401).json({ success: false, message: "Invalid token, please login again" });
//     }
// };


// const authUser = (req, res, next) => {
//   try {
//     const token = req.headers.atoken; // or Authorization if you change it

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Access denied, no token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.id;   // ✅ use req.userId instead of req.body.userId

//     next();

//   } catch (error) {
//     console.error(error);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ success: false, message: "Token expired, please login again" });
//     }

//     return res.status(401).json({ success: false, message: "Invalid token, please login again" });
//   }
// };



const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Standard header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1]; // Get token after 'Bearer '
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ Attach userId for controllers

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





export default authUser;
