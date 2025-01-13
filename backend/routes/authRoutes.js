import express from "express";
import {
  signup,
  login,
  logout,
  authCheck,
} from "../controllers/authControllers.js";
import { protectRoutes } from "../middleware/protectRoutes.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/authCheck", protectRoutes, authCheck);

export default router;
