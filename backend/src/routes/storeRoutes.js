import { Router } from "express";
import {
  addStore,
  getAllStores,
  ownerDashboard,
  assignStoreOwner,
} from "../controllers/storeControllers.js";

import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = Router();

// Admin: add store
router.post(
  "/",
  auth,
  role("ADMIN"),
  addStore
);

// User/Admin: list stores
router.get(
  "/",
  auth,
  getAllStores
);

// Store owner dashboard
router.get(
  "/owner/dashboard",
  auth,
  role("OWNER"),
  ownerDashboard
);

// Admin: assign store owner
router.patch(
  "/:id/owner",
  auth,
  role("ADMIN"),
  assignStoreOwner
);

export default router;
