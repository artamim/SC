const express = require("express");
const app = express();
const cors = require("cors");
const loginHandler = require("./controllers/login");

app.use(cors());
app.use(express.json());

const port = 5000;

// Use the login handler directly
app.post("/login", loginHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
