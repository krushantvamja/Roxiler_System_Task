import db from "../config/db.js";

class StoreModel {
  static async create({ name, email, address, ownerId }) {
    const query = `
      INSERT INTO stores (name, email, address, owner_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [name, email, address, ownerId];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll(filters = {}) {
    let query = `
      SELECT s.id, s.name, s.address,
      COALESCE(AVG(r.rating), 0) AS rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;
    const values = [];

    if (filters.name) {
      values.push(`%${filters.name}%`);
      query += ` AND s.name ILIKE $${values.length}`;
    }
    if (filters.address) {
      values.push(`%${filters.address}%`);
      query += ` AND s.address ILIKE $${values.length}`;
    }

    query += " GROUP BY s.id";

    const { rows } = await db.query(query, values);
    return rows;
  }

  static async findByOwner(ownerId) {
    const { rows } = await db.query(
      "SELECT * FROM stores WHERE owner_id = $1",
      [ownerId]
    );
    return rows[0];
  }
}

export default StoreModel;
