const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add a supplier
exports.addSupplier = async (req, res) => {
  const { xorg, xadd1, xphone, xemail, xcountry } = req.body;

  try {
    // Generate `xsup`
    const result = await pool.query(`SELECT xsup FROM casup ORDER BY xsup DESC LIMIT 1`);
    let nextXcus = "SUP-000001";
    if (result.rows.length > 0) {
      const lastXcus = result.rows[0].xsup;
      const lastNumber = parseInt(lastXcus.split("-")[1]);
      nextXcus = `SUP-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Insert into DB
    await pool.query(
      `INSERT INTO casup (xsup, xorg, xadd1, xphone, xemail, xcountry) VALUES ($1, $2, $3, $4, $5, $6)`,
      [nextXcus, xorg, xadd1, xphone, xemail, xcountry]
    );

    res.status(201).json({ message: "Supplier created successfully", xsup: nextXcus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add supplier" });
  }
};

// Show a supplier
exports.showSupplier = async (req, res) => {
  const { xsup } = req.query; // Use query parameters for GET requests
  try {
    const result = await pool.query(`SELECT * FROM casup WHERE xsup = $1`, [xsup]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the entire row
    } else {
      res.status(404).json({ error: "Supplier not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch supplier" });
  }
};


// Update a supplier
exports.updateSupplier = async (req, res) => {
  const { xsup, xorg, xadd1, xphone, xemail, xcountry } = req.body;

  try {
    await pool.query(
      `UPDATE casup SET xorg = $1, xadd1 = $2, xphone = $3, xemail = $4, xcountry = $5 WHERE xsup = $6`,
      [xorg, xadd1, xphone, xemail, xcountry, xsup]
    );

    res.status(200).json({ message: "Supplier updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update supplier" });
  }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
  const { xsup } = req.body;

  try {
    await pool.query(`DELETE FROM casup WHERE xsup = $1`, [xsup]);
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete supplier" });
  }
};

// Show all supplier
exports.showallSuppliers = async (req, res) => {
  const { offset } = req.query;
  try {
    const suppliersResult = await pool.query(`SELECT * FROM casup limit 10 offset $1`, [offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM casup`);
    const total = parseInt(countResult.rows[0].total, 10);
    if (suppliersResult.rows.length > 0) {
      res.status(200).json({
        suppliers: suppliersResult.rows,
        total,
      });
    } else {
      res.status(404).json({ error: "No suppliers found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
};
