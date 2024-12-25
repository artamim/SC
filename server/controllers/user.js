const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "jwt";

const userHandler = async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, SECRET);
    res.json(user.id);
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = userHandler;
