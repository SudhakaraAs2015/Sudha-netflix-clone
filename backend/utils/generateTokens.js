import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", token, {
    httpOnly: true, // cookie cannot be accessed by client side script
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
    sameSite: "strict",
    secure: ENV_VARS.NODE_ENV !== "development", // cookie will only be sent in HTTPS
  });
  return token;
};
