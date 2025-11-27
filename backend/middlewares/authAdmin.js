// import jwt from 'jsonwebtoken';

// // Middleware to check if the user is an admin



// const authAdmin = (req, res, next) => {
//     try {
//         const token = req.headers.atoken; // same header name you use in Postman

//         if (!token) {
//             return res.status(401).json({ success: false, message: "Access denied, no token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (decoded.email !== process.env.ADMIN_EMAIL) {
//             return res.status(403).json({ success: false, message: "Not Authorized Login Again" });
//         }

//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// export default authAdmin;


































import jwt from 'jsonwebtoken';

// Middleware to check if the user is an admin
const authAdmin = (req, res, next) => {
    try {
        const token = req.headers.atoken; // same header name you use in Postman

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not Authorized, login again" });
        }

        next();
    } catch (error) {
        console.error(error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired, please login again" });
        }

        return res.status(401).json({ success: false, message: "Invalid token, please login again" });
    }
};

export default authAdmin;
