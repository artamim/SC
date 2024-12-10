const pool = require("../config/dbConfig"); // PostgreSQL pool
require("dotenv").config();

const customerHandler = async (req, res) => {
    const { action } = req.params;
    const { xorg, xadd1, xphone, xemail, xempnum } = req.body; // No `xcus` in the request body for create
    res.status(201).json({ xorg });
    try {
        switch (action) {
        case "add":
            // Generate a new `xcus` value
            const result = await pool.query(
            `SELECT xcus FROM cacus ORDER BY xcus DESC LIMIT 1`
            );

            let nextXcus = "CUS-000001"; // Default for the first customer
            if (result.rows.length > 0) {
            const lastXcus = result.rows[0].xcus; // e.g., "CUS-000005"
            const lastNumber = parseInt(lastXcus.split("-")[1]); // Extract "000005" -> 5
            nextXcus = `CUS-${String(lastNumber + 1).padStart(6, "0")}`; // Increment and format as "CUS-000006"
            }

            // Insert the new customer
            await pool.query(
            `INSERT INTO cacus (xcus, xorg, xadd1, xphone, xemail, xempnum)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [nextXcus, xorg, xadd1, xphone, xemail, xempnum]
            );

            res.status(201).json({ message: "Customer created successfully", xcus: nextXcus });
            break;

        case "show":
            // Fetch customers (optional: filter by xcus)
            const customer = await pool.query(
                `SELECT * FROM cacus WHERE xcus = $1`,
                [req.body.xcus]
            );
            
            res.status(200).json(customer.rows);
            break;

        case "update":
            // Update customer details
            const { xcus } = req.body;
            await pool.query(
            `UPDATE cacus 
            SET xorg = $1, xadd1 = $2, xphone = $3, xemail = $4, xempnum = $5
            WHERE xcus = $6`,
            [xorg, xadd1, xphone, xemail, xempnum, xcus]
            );
            res.status(200).json({ message: "Customer updated successfully" });
            break;

        case "delete":
            // Delete a customer
            await pool.query(`DELETE FROM cacus WHERE xcus = $1`, [req.body.xcus]);
            res.status(200).json({ message: "Customer deleted successfully" });
            break;

        default:
            res.status(400).json({ error: "Invalid action" });
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "An internal server error occurred" });
    }
};

module.exports = customerHandler;
