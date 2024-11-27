const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 5000;

app.use(express.json());

const usersRoutes = require("./controllers/users");
app.use("/users", usersRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});