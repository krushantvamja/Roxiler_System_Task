import db from "../config/db.js";

// ADMIN: Add Store
export const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const store = await db.query(
      `INSERT INTO stores (name,email,address,owner_id)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, email, address, ownerId]
    );

    res.status(201).json(store.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER: Get All Stores
export const getAllStores = async (req, res) => {
  try {
    const { name, address } = req.query;

    let query = `
      SELECT s.id,s.name,s.address,
      COALESCE(AVG(r.rating),0) AS rating
      FROM stores s
      LEFT JOIN ratings r ON s.id=r.store_id
      WHERE 1=1
    `;
    const values = [];

    if (name) {
      values.push(`%${name}%`);
      query += ` AND s.name ILIKE $${values.length}`;
    }
    if (address) {
      values.push(`%${address}%`);
      query += ` AND s.address ILIKE $${values.length}`;
    }

    query += " GROUP BY s.id";

    const stores = await db.query(query, values);
    res.json(stores.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// OWNER: Dashboard
export const ownerDashboard = async (req, res) => {
  try {
    const store = await db.query(
      "SELECT id FROM stores WHERE owner_id=$1",
      [req.user.id]
    );

    const ratings = await db.query(
      `SELECT u.name, r.rating
       FROM ratings r
       JOIN users u ON r.user_id=u.id
       WHERE r.store_id=$1`,
      [store.rows[0].id]
    );

    res.json(ratings.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: Assign store owner (also promotes user to OWNER)
export const assignStoreOwner = async (req, res) => {
  try {
    const { id: storeId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const userRes = await db.query(
      "SELECT id, role FROM users WHERE id=$1",
      [userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userRes.rows[0].role === "ADMIN") {
      return res
        .status(400)
        .json({ error: "Admin cannot be assigned as store owner" });
    }

    const storeCheck = await db.query(
      "SELECT id FROM stores WHERE id=$1",
      [storeId]
    );

    if (storeCheck.rows.length === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    const storeRes = await db.query(
      "UPDATE stores SET owner_id=$1 WHERE id=$2 RETURNING id,name,owner_id",
      [userId, storeId]
    );

    const updatedUser = await db.query(
      "UPDATE users SET role='OWNER' WHERE id=$1 RETURNING id,name,email,role",
      [userId]
    );

    res.json({ store: storeRes.rows[0], user: updatedUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
