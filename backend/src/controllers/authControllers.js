import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// REGISTER (Normal User)
export const register = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.query(
      `INSERT INTO users (name, email, address, password, role)
       VALUES ($1,$2,$3,$4,'USER') RETURNING id,name,email,role`,
      [name, email, address, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: user.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN (All Roles)
export const login = async (req, res) => {
  try {
    console.log("BODY:", req.body);
   const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
      receivedBody: req.body,
      contentType: req.headers["content-type"],
    });
  }
    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
