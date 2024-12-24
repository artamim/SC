const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add a collection
exports.addCollection = async (req, res) => {
  const { xcus, xordernum, xamount } = req.body;
  const xstatus = "Pending"

  try {
    // Generate `xrecnum`
    const result = await pool.query(`SELECT xrecnum FROM opcusrec ORDER BY xrecnum DESC LIMIT 1`);
    let nextXrecnum = "COL-000001";
    if (result.rows.length > 0) {
      const lastXordernum = result.rows[0].xrecnum;
      const lastNumber = parseInt(lastXordernum.split("-")[1]);
      nextXrecnum = `COL-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Insert into opcusrec table
    const insertResult = await pool.query(
      `INSERT INTO opcusrec (xrecnum, xcus, xordernum, xamount, xstatus, xdate)
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) 
       RETURNING xdate`,
      [nextXrecnum, xcus, xordernum, xamount, xstatus]
    );

    const xdate = insertResult.rows[0].xdate;

    res.status(201).json({ message: "Collection created successfully", xrecnum: nextXrecnum, xstatus, xdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add collection" });
  }
};

// Show a collection
exports.showCollection = async (req, res) => {
  const { xrecnum } = req.query;

  try {
    const result = await pool.query(`SELECT * FROM opcusrec WHERE xrecnum = $1`, [xrecnum]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the order
    } else {
      res.status(404).json({ error: "Collection not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
};

// Update a collection
exports.updateCollection = async (req, res) => {
  const { xrecnum, xcus, xamount, xordernum } = req.body;

  try {
    await pool.query(
      `UPDATE opcusrec SET xcus = $1, xordernum = $2, xamount = $3 WHERE xrecnum = $4`,
      [xcus, xordernum, xamount, xrecnum]
    );
    res.status(200).json({ message: "Collection updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update collection" });
  }
};

// Delete a collection
exports.deleteCollection = async (req, res) => {
  const { xrecnum } = req.body;

  try {
    await pool.query(`DELETE FROM opcusrec WHERE xrecnum = $1`, [xrecnum]);
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete collection" });
  }
};

// Show all collections
exports.showAllCollections = async (req, res) => {
  const { offset } = req.query;

  try {
    const ordersResult = await pool.query(`SELECT opcusrec.*, cacus.xorg FROM opcusrec inner join cacus using(xcus) order by xrecnum LIMIT 10 OFFSET $1`, [offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM opcusrec`);
    const total = parseInt(countResult.rows[0].total, 10);

    if (ordersResult.rows.length > 0) {
      res.status(200).json({
        salesOrders: ordersResult.rows,
        total,
      });
    } else {
      res.status(404).json({ error: "No collections found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};

exports.cancelCollection = async (req, res) => {
  const { xrecnum } = req.query;

  try {
    await pool.query(`UPDATE opcusrec SET xstatus = 'Cancelled' WHERE xrecnum = $1`, [xrecnum]);
    res.status(200).json({ message: "Collection cancelled", xstatus: 'Cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel collection" });
  }
};

exports.completeCollection = async (req, res) => {
  const { xrecnum } = req.query;
  try {
    await pool.query(`UPDATE opcusrec SET xstatus = 'Completed' WHERE xrecnum = $1`, [xrecnum]);
    res.status(200).json({ message: "Collection completed", xstatus: 'Completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to complete collection" });
  }
};

