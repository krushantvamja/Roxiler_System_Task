import { Router } from "express";
import {
  createUser,
  getAllUsers,
  updatePassword,
} from "../controllers/userControllers.js";

import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";
import { validateUser } from "../middlewares/validationMiddleware.js";

const router = Router();

// Admin: create user (ADMIN / USER / OWNER)
router.post(
  "/",
  auth,
  role("ADMIN"),
  validateUser,
  createUser
);

// Admin: list users with filters
router.get(
  "/",
  auth,
  role("ADMIN"),
  getAllUsers
);

// User / Owner: update password
router.put(
  "/update-password",
  auth,
  updatePassword
);


export default router;
