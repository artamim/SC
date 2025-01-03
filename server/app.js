const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Correct placement
const loginHandler = require("./controllers/login");
const userHandler = require("./controllers/user");
const signoutHandler = require("./controllers/signout");
const customerRoutes = require("./routes/customerRoute");
const supplierRoutes = require("./routes/supplierRoute");
const collectionRoutes = require("./routes/collectionRoute");
const itemRoutes = require("./routes/itemRoute");
const salesorderRoutes = require("./routes/salesorderRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin)
      const allowedOrigins = [
        "http://localhost:5173",
        "https://tamimerp.netlify.app",
      ];
      // Allow dynamic Netlify subdomains
      if (
        allowedOrigins.includes(origin) ||
        (origin && origin.endsWith(".netlify.app"))
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use("/customer", customerRoutes);
app.use("/supplier", supplierRoutes);
app.use("/item", itemRoutes);
app.use("/salesorder", salesorderRoutes);
app.use("/collection", collectionRoutes);
app.use("/dashboard", dashboardRoutes);

app.post("/login", loginHandler);
app.get("/user", userHandler);
app.get("/signout", signoutHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
