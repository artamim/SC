const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./controllers/users");
app.use(cors());
const port = 5000;
const pool = require("./config/dbConfig"); 
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});