const mysql2 = require("mysql2/promise");
let pool;
try {
  pool = mysql2.createPool({
    user: process.env["DB-USER"],
    password: process.env["DB-PASSWORD"],
    host: process.env["DB-HOST"],
    database: process.env["DB-DATABASE"],
  });
} catch (error) {
  console.error("Fatal, bad configuration for pool");
  process.exit(1);
}

module.exports = { pool };
