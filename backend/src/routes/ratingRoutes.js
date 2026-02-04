import { Router } from "express";
import {
  submitRating,
  totalRatings,
} from "../controllers/ratingControllers.js";

import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";
import { validateRating } from "../middlewares/validationMiddleware.js";

const router = Router();

// User: submit or update rating
router.post(
  "/",
  auth,
  role("USER"),
  validateRating,
  submitRating
);

// Admin: total ratings count
router.get(
  "/count",
  auth,
  role("ADMIN"),
  totalRatings
);

export default router;
