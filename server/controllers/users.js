const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig"); // Import the shared connection pool

// Add User (Create)
router.post("/add", async (req, res) => {
  const { user_id, username } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (user_id, username) VALUES ($1, $2) RETURNING *",
      [user_id, username]
    );
    res.json(result.rows[0]); // Return the newly added user
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get All Users (Read)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows); // Return all users
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update User (Update)
router.put("/update/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { username } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET username = $2 WHERE user_id = $1 RETURNING *",
      [user_id, username]
    );
    res.json(result.rows[0]); // Return the updated user
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete User (Delete)
router.delete("/delete/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [user_id]);
    res.send("User deleted successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
