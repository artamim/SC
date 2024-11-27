const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tamim",
  password: "postgres",
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
