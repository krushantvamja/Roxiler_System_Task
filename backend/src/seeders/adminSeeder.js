import bcrypt from "bcrypt";
import db from "../config/db.js";

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@system.com";

    // Check if admin already exists
    const existingAdmin = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [adminEmail]
    );

    if (existingAdmin.rows.length > 0) {
      console.log("⚠️ Admin already exists. Skipping seeding.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await db.query(
      `
      INSERT INTO users (name, email, address, password, role)
      VALUES ($1, $2, $3, $4, 'ADMIN')
      `,
      [
        "System Administrator Account",
        adminEmail,
        "System Generated Admin Address",
        hashedPassword,
      ]
    );

    console.log("✅ Admin user seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

export default seedAdmin;
