const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add an item
exports.addItem = async (req, res) => {
  const { xdesc, xcat } = req.body;

  try {
    // Generate `xitem`
    const result = await pool.query(`SELECT xitem FROM caitem ORDER BY xitem DESC LIMIT 1`);
    let nextXitem = "ITM-000001";
    if (result.rows.length > 0) {
      const lastXitem = result.rows[0].xitem;
      const lastNumber = parseInt(lastXitem.split("-")[1]);
      nextXitem = `ITM-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Insert into DB
    await pool.query(
      `INSERT INTO caitem (xitem, xdesc, xcat) VALUES ($1, $2, $3)`,
      [nextXitem, xdesc, xcat]
    );

    res.status(201).json({ message: "Item created successfully", xitem: nextXitem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

// Show an item
exports.showItem = async (req, res) => {
  const { xitem } = req.query;
  try {
    const result = await pool.query(`SELECT * FROM caitem WHERE xitem = $1`, [xitem]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { xitem, xdesc, xcat } = req.body;

  try {
    await pool.query(
      `UPDATE caitem SET xdesc = $1, xcat = $2 WHERE xitem = $3`,
      [xdesc, xcat, xitem]
    );

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  const { xitem } = req.body;

  try {
    await pool.query(`DELETE FROM caitem WHERE xitem = $1`, [xitem]);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

// Show all items
exports.showAllItems = async (req, res) => {
  const { offset } = req.query;
  try {
    const itemsResult = await pool.query(`SELECT * FROM caitem LIMIT 10 OFFSET $1`, [offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM caitem`);
    const total = parseInt(countResult.rows[0].total, 10);

    if (itemsResult.rows.length > 0) {
      res.status(200).json({
        items: itemsResult.rows,
        total,
      });
    } else {
      res.status(404).json({ error: "No items found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};
