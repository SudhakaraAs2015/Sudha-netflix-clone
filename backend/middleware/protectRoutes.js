import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    console.log("Error in Middleware", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// export const protectRoutes = async (req, res, next) => {
//   try {
//     const token = req.cookies["jwt-netflix"];
//     if (!token) {
//       res
//         .status(401)
//         .json({ success: false, message: "Unauthorized - No Token Provided" });
//     }
//     const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
//     if (!decoded) {
//       res.status.json({
//         success: false,
//         message: "Unathorized = Invalid Token",
//       });
//     }
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       res.status(404).json({ success: false, message: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in Middleware", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };