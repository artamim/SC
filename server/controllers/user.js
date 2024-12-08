const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "jwt";

// User handler to validate the JWT
const userHandler = async (req, res) => {
  const token = req.cookies[COOKIE_NAME]; // Extract the token from cookies
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, SECRET); // Verify the JWT
    //console.log(`111_______________${JSON.stringify(user.id)}`)
    res.json(user.id); // Respond with the user payload from the token
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = userHandler;
