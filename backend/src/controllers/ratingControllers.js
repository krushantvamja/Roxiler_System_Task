import db from "../config/db.js";

// USER: Submit or Update Rating
export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    const existing = await db.query(
      "SELECT * FROM ratings WHERE user_id=$1 AND store_id=$2",
      [req.user.id, storeId]
    );

    if (existing.rows.length > 0) {
      await db.query(
        "UPDATE ratings SET rating=$1 WHERE user_id=$2 AND store_id=$3",
        [rating, req.user.id, storeId]
      );
      return res.json({ message: "Rating updated" });
    }

    await db.query(
      "INSERT INTO ratings (user_id,store_id,rating) VALUES ($1,$2,$3)",
      [req.user.id, storeId, rating]
    );

    res.status(201).json({ message: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: Total Ratings Count
export const totalRatings = async (req, res) => {
  try {
    const count = await db.query("SELECT COUNT(*) FROM ratings");
    res.json({ totalRatings: count.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
