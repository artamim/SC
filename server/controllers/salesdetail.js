const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add a sales order
exports.addSalesDetail = async (req, res) => {
  const { xordernum, xitem, xqty } = req.body;

  try {

    // Insert into opord table
    await pool.query(
      `INSERT INTO opodt (xordernum, xitem, xqty, xtotamt) VALUES ($1, $2, $3, ($3 * (select xrate from caitem where xitem=$2)))`,
      [xordernum, xitem, xqty]
    );

    res.status(201).json({ message: `Item ${xitem} Added Successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add sales order" });
  }
};

// Show a sales order
exports.showSalesDetail = async (req, res) => {
  const { xordernum, xitem } = req.query;

  try {
    const result = await pool.query(`SELECT * FROM opodt WHERE xordernum = $1 and xitem = $2`, [xordernum, xitem]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the detail
    } else {
      res.status(404).json({ error: "Sales detail not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales detail" });
  }
};

// Update a sales order
exports.updateSalesDetail = async (req, res) => {
  const { xordernum, xcus, xdate, xstatus } = req.body;

  try {
    await pool.query(
      `UPDATE opodt SET xitem = $1, xqty = $2, xtotamt = ($2 * (select xrate from caitem where xitem=$1)) WHERE xordernum = $3`,
      [xitem, xqty, xordernum]
    );
    res.status(200).json({ message: "Sales detail updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update sales detail" });
  }
};

// Delete a sales order
exports.deleteSalesDetail = async (req, res) => {
  const { xordernum } = req.body;

  try {
    await pool.query(`DELETE FROM opodt WHERE xordernum = $1 and xitem = $2`, [xordernum, xitem]);
    res.status(200).json({ message: "Sales order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete sales order" });
  }
};

// Show all sales orders
exports.showAllSalesDetails = async (req, res) => {
  const { offset } = req.query;

  try {
    const ordersResult = await pool.query(`SELECT * FROM opodt order by xitem LIMIT 10 OFFSET $1`, [offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM opodt`);
    const total = parseInt(countResult.rows[0].total, 10);

    if (ordersResult.rows.length > 0) {
      res.status(200).json({
        salesOrders: ordersResult.rows,
        total,
      });
    } else {
      res.status(404).json({ error: "No sales details found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales details" });
  }
};
