const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add a sales order
exports.addSalesDetail = async (req, res) => {
  const { xordernum, xitem, xqty } = req.body;

  try {

    // Insert into opodt table
    await pool.query(
      `INSERT INTO opodt (xordernum, xitem, xqty, xtotamt) VALUES ($1, $2::varchar, $3::int, ($3 * (select xrate from caitem where xitem=$2)))`,
      [xordernum, xitem, xqty]
    );

    res.status(201).json({ message: `Item ${xitem} Added Successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add sales order" });
  }
};

// Show a sales detail
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


exports.updateSalesDetail = async (req, res) => {
  const { xitem, xqty, xordernum } = req.body;

  try {
    // Query to update sales detail and return the updated total amount
    const result = await pool.query(
      `
      UPDATE opodt 
      SET xqty = $1::int, xtotamt = ($1 * (SELECT xrate FROM caitem WHERE xitem = $3::varchar))
      WHERE xordernum = $2 AND xitem = $3::varchar
      RETURNING xtotamt
      `,
      [xqty, xordernum, xitem]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Sales detail not found or no changes made" });
    }

    const { xtotamt } = result.rows[0];

    res.status(200).json({
      message: "Sales detail updated successfully",
      xtotamt,
    });
  } catch (error) {
    console.error("Error updating sales detail:", error.message);
    res.status(500).json({ error: "Failed to update sales detail" });
  }
};


// Delete a sales order
exports.deleteSalesDetail = async (req, res) => {
  const { xordernum, xitem } = req.body;

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
  const { xordernum, offset } = req.query;

  try {
    const ordersResult = await pool.query(`SELECT opodt.*, caitem.xrate, caitem.xdesc FROM opodt inner join caitem using(xitem) where xordernum = $1 order by xitem LIMIT 10 OFFSET $2`, [xordernum, offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM opodt`);
    const total = parseInt(countResult.rows[0].total, 10);

    if (ordersResult.rows.length > 0) {
      res.status(200).json({
        salesDetails: ordersResult.rows,
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
