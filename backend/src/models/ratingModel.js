import db from "../config/db.js";

class RatingModel {
  static async submit({ userId, storeId, rating }) {
    const existing = await db.query(
      "SELECT id FROM ratings WHERE user_id = $1 AND store_id = $2",
      [userId, storeId]
    );

    if (existing.rows.length > 0) {
      await db.query(
        "UPDATE ratings SET rating = $1 WHERE user_id = $2 AND store_id = $3",
        [rating, userId, storeId]
      );
      return "updated";
    }

    await db.query(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3)",
      [userId, storeId, rating]
    );
    return "created";
  }

  static async getByStore(storeId) {
    const { rows } = await db.query(
      `
      SELECT u.name, r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
      `,
      [storeId]
    );
    return rows;
  }

  static async countAll() {
    const { rows } = await db.query(
      "SELECT COUNT(*) FROM ratings"
    );
    return rows[0].count;
  }
}

export default RatingModel;
