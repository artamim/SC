const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add a sales order
exports.addSalesOrder = async (req, res) => {
  const { xcus, xdate, xstatus } = req.body;

  try {
    // Generate `xordernum`
    const result = await pool.query(`SELECT xordernum FROM opord ORDER BY xordernum DESC LIMIT 1`);
    let nextXordernum = "ORD-000001";
    if (result.rows.length > 0) {
      const lastXordernum = result.rows[0].xordernum;
      const lastNumber = parseInt(lastXordernum.split("-")[1]);
      nextXordernum = `ORD-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Insert into opord table
    await pool.query(
      `INSERT INTO opord (xordernum, xcus, xdate, xstatus) VALUES ($1, $2, $3, $4)`,
      [nextXordernum, xcus, xdate, xstatus]
    );

    res.status(201).json({ message: "Sales order created successfully", xordernum: nextXordernum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add sales order" });
  }
};

// Show a sales order
exports.showSalesOrder = async (req, res) => {
  const { xordernum } = req.query;

  try {
    const result = await pool.query(`SELECT * FROM opord WHERE xordernum = $1`, [xordernum]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the order
    } else {
      res.status(404).json({ error: "Sales order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales order" });
  }
};

// Update a sales order
exports.updateSalesOrder = async (req, res) => {
  const { xordernum, xcus, xdate, xstatus } = req.body;

  try {
    await pool.query(
      `UPDATE opord SET xcus = $1, xdate = $2, xstatus = $3 WHERE xordernum = $4`,
      [xcus, xdate, xstatus, xordernum]
    );
    res.status(200).json({ message: "Sales order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update sales order" });
  }
};

// Delete a sales order
exports.deleteSalesOrder = async (req, res) => {
  const { xordernum } = req.body;

  try {
    await pool.query(`DELETE FROM opord WHERE xordernum = $1`, [xordernum]);
    res.status(200).json({ message: "Sales order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete sales order" });
  }
};

// Show all sales orders
exports.showAllSalesOrders = async (req, res) => {
  const { offset } = req.query;

  try {
    const ordersResult = await pool.query(`SELECT opord.*, cacus.xorg FROM opord inner join cacus using(xcus) LIMIT 10 OFFSET $1`, [offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM opord`);
    const total = parseInt(countResult.rows[0].total, 10);

    if (ordersResult.rows.length > 0) {
      res.status(200).json({
        salesOrders: ordersResult.rows,
        total,
      });
    } else {
      res.status(404).json({ error: "No sales orders found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales orders" });
  }
};
