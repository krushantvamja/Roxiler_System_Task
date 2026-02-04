import bcrypt from "bcrypt";
import db from "../config/db.js";

// ADMIN: Create User (Admin / User / Owner)
export const createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.query(
      `INSERT INTO users (name,email,address,password,role)
       VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role`,
      [name, email, address, hashedPassword, role]
    );

    res.status(201).json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: Get All Users (with filters)
export const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    let query = "SELECT id,name,email,address,role FROM users WHERE 1=1";
    const values = [];

    if (name) {
      values.push(`%${name}%`);
      query += ` AND name ILIKE $${values.length}`;
    }
    if (email) {
      values.push(`%${email}%`);
      query += ` AND email ILIKE $${values.length}`;
    }
    if (address) {
      values.push(`%${address}%`);
      query += ` AND address ILIKE $${values.length}`;
    }
    if (role) {
      values.push(role);
      query += ` AND role=$${values.length}`;
    }

    const users = await db.query(query, values);
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER / OWNER: Update Password
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password=$1 WHERE id=$2",
      [hashedPassword, req.user.id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
