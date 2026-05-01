require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME,
  connectionLimit : process.env.DB_CONNECTION_LIMIT || 10,
  charset         : 'utf8mb4_general_ci',    // ← línea nueva
  timezone        : 'local'                  // ← línea nueva
});

module.exports = pool.promise();