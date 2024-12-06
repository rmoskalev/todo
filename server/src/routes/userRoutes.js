import express from "express";

import {
  changePassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userLoginStatus,
} from "../controllers/auth/userController.js";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
} from "../controllers/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

router.get("/login-status", userLoginStatus);

router.patch("/change-password", protect, changePassword);

export default router;
