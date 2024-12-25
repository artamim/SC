const jwt = require("jsonwebtoken");
const pool = require("../config/dbConfig"); // PostgreSQL pool
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

// Function to create a JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// Login handler
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user from the database using the email
    console.log("_____")
    console.log(email)
    console.log(password)
    const result = await pool.query(
      "SELECT xuser, xpassword FROM users WHERE xemail = $1",
      [email]
    );

    // Check if the user exists
    if (result.rows.length === 0) {
      return res.status(400).json({ errors: { email: "Email is not registered" } });
    }

    const appuser = result.rows[0];

    // Validate the password
    if (password !== appuser.xpassword) {
      return res.status(400).json({ errors: { password: "Incorrect password" } });
    }

    // Create a JWT token
    const token = createToken(appuser.xuser);

    // Set the JWT as an HttpOnly cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // Send a success response
    res.status(200).json({ appuser: appuser.xuser });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ errors: { database: "An internal server error occurred" } });
  }
};

module.exports = loginHandler;
