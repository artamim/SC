const jwt = require("jsonwebtoken");
const pool = require("../config/dbConfig"); // PostgreSQL pool
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

// Function to create a JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: maxAge,
  });
};

// Export the login handler directly
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT xuser, xpassword FROM users WHERE xemail = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ errors: { email: "Email is not registered" } });
    }

    const appuser = result.rows[0];

    const isMatch = password === appuser.xpassword;
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: { password: "Incorrect password" } });
    }

    const token = createToken(appuser.xuser);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ appuser: appuser.xuser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errors: { database: "An error occurred" } });
  }
};

module.exports = loginHandler;
