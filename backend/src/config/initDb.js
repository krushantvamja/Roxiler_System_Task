import db from "./db.js";

const initializeDatabase = async () => {
  try {
    // Drop existing tables to recreate with correct schema
    await db.query("DROP TABLE IF EXISTS ratings CASCADE");
    await db.query("DROP TABLE IF EXISTS stores CASCADE");
    await db.query("DROP TABLE IF EXISTS users CASCADE");

    // Create users table
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(400),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER', 'OWNER')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create stores table
    await db.query(`
      CREATE TABLE stores (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        address VARCHAR(400),
        owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create ratings table
    await db.query(`
      CREATE TABLE ratings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        store_id INT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, store_id)
      )
    `);

    // Create indexes
    await db.query(`CREATE INDEX idx_users_email ON users(email)`);
    await db.query(`CREATE INDEX idx_stores_owner_id ON stores(owner_id)`);
    await db.query(`CREATE INDEX idx_ratings_user_id ON ratings(user_id)`);
    await db.query(`CREATE INDEX idx_ratings_store_id ON ratings(store_id)`);

    console.log("✅ Database schema initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing database:", error.message);
    throw error;
  }
};

export default initializeDatabase;
