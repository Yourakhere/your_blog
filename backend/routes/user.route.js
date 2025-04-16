import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

// User profile
router.get("/my-profile", isAuthenticated, getMyProfile);

// Public access to admin list (if intentional)
router.get("/admins", getAdmins);

export default router;
