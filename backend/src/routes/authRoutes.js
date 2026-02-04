import { Router } from "express";
import { register, login } from "../controllers/authControllers.js";
import { validateUser } from "../middlewares/validationMiddleware.js";

const router = Router();

// Normal user signup
router.post("/register", validateUser, register);

// All users login
router.post("/login", login);

export default router;
