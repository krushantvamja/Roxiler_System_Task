import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "store_rating_db",
  DB_PORT: process.env.DB_PORT || 5432,

  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
