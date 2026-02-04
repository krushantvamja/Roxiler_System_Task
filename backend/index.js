import express from "express";
import cors from "cors";

import env from "./src/config/env.js";
import db from "./src/config/db.js";
import initializeDatabase from "./src/config/initDb.js";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import storeRoutes from "./src/routes/storeRoutes.js";
import ratingRoutes from "./src/routes/ratingRoutes.js";

import seedAdmin from "./src/seeders/adminSeeder.js";
import app from "./src/app.js";

process.on("unhandledRejection", (reason) => {
  console.error("âŒ Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("âŒ Uncaught Exception:", error);
});

const startServer = async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database connection verified");

    await initializeDatabase();
    await seedAdmin();

    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server error:", err);
      process.exit(1);
    });

    server.on("close", () => {
      console.warn("⚠️ Server closed");
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
