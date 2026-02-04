import db from "../config/db.js";

class UserModel {
  static async create({ name, email, address, password, role }) {
    const query = `
      INSERT INTO users (name, email, address, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, address, role
    `;
    const values = [name, email, address, password, role];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const { rows } = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query(
      "SELECT id, name, email, address, role FROM users WHERE id = $1",
      [id]
    );
    return rows[0];
  }

  static async getAll(filters = {}) {
    let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
    const values = [];

    if (filters.name) {
      values.push(`%${filters.name}%`);
      query += ` AND name ILIKE $${values.length}`;
    }
    if (filters.email) {
      values.push(`%${filters.email}%`);
      query += ` AND email ILIKE $${values.length}`;
    }
    if (filters.address) {
      values.push(`%${filters.address}%`);
      query += ` AND address ILIKE $${values.length}`;
    }
    if (filters.role) {
      values.push(filters.role);
      query += ` AND role = $${values.length}`;
    }

    const { rows } = await db.query(query, values);
    return rows;
  }

  static async updatePassword(id, password) {
    await db.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [password, id]
    );
    return true;
  }
}

export default UserModel;
