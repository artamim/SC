const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Correct placement
const loginHandler = require("./controllers/login");
const userHandler = require("./controllers/user");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware for parsing cookies

// Route handlers
app.post("/login", loginHandler);
app.get("/user", userHandler); // Changed POST to GET for fetching user info

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
