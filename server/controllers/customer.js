const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());

// Add a customer
exports.addCustomer = async (req, res) => {
  const { xorg, xadd1, xphone, xemail, xempnum } = req.body;

  try {
    // Generate `xcus`
    const result = await pool.query(`SELECT xcus FROM cacus ORDER BY xcus DESC LIMIT 1`);
    let nextXcus = "CUS-000001";
    if (result.rows.length > 0) {
      const lastXcus = result.rows[0].xcus;
      const lastNumber = parseInt(lastXcus.split("-")[1]);
      nextXcus = `CUS-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Insert into DB
    await pool.query(
      `INSERT INTO cacus (xcus, xorg, xadd1, xphone, xemail, xempnum) VALUES ($1, $2, $3, $4, $5, $6)`,
      [nextXcus, xorg, xadd1, xphone, xemail, xempnum]
    );

    res.status(201).json({ message: "Customer created successfully", xcus: nextXcus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add customer" });
  }
};

// Show a customer
exports.showCustomer = async (req, res) => {
  const { xcus } = req.query; // Use query parameters for GET requests
  try {
    const result = await pool.query(`SELECT * FROM cacus WHERE xcus = $1`, [xcus]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the entire row
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};


// Update a customer
exports.updateCustomer = async (req, res) => {
  const { xcus, xorg, xadd1, xphone, xemail, xempnum } = req.body;

  try {
    await pool.query(
      `UPDATE cacus SET xorg = $1, xadd1 = $2, xphone = $3, xemail = $4, xempnum = $5 WHERE xcus = $6`,
      [xorg, xadd1, xphone, xemail, xempnum, xcus]
    );

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  const { xcus } = req.body;

  try {
    await pool.query(`DELETE FROM cacus WHERE xcus = $1`, [xcus]);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete customer" });
  }
};

// Show all customer
exports.showallCustomers = async (req, res) => {
  const { offset } = req.query;
  try {
    const customersResult = await pool.query(`SELECT * FROM cacus limit 10 offset $1`, [offset]);
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM cacus`);
    const total = parseInt(countResult.rows[0].total, 10);
    if (customersResult.rows.length > 0) {
      res.status(200).json({
        customers: customersResult.rows,
        total,
      });
    } else {
      res.status(404).json({ error: "No customers found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};
