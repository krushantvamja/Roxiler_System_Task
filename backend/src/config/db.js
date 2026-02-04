import { Pool } from "pg";
import env from "./env.js";

const pool = new Pool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err);
});

export default {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};
