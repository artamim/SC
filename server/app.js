const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Correct placement
const loginHandler = require("./controllers/login");
const userHandler = require("./controllers/user");
const signoutHandler = require("./controllers/signout");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/login", loginHandler);
app.get("/user", userHandler);
app.get("/signout", signoutHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
