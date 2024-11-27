const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./controllers/users");
app.use(cors());
const port = 5000;
const pool = require("./config/dbConfig"); 
app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users");
      const formattedResponse = result.rows.map(
        (user) => `User Code ${user.xuser} belongs to ${user.xusername}`
      );
      res.json(result.rows); // Return all users
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});