const fs = require("fs");
const mysql2 = require("mysql2/promise");

let pool;
try {
  console.log({
  host: process.env["DB_HOST"],
  port: process.env["DB_PORT"],
  user: process.env["DB_USER"],
  database: process.env["DB_DATABASE"],
});
  pool = mysql2.createPool({
    user: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    port : process.env["DB_PORT"],
    host: process.env["DB_HOST"],
    database: process.env["DB_DATABASE"],
    ssl: {
      ca: fs.readFileSync("./isrgrootx1.pem"), // Certificate Authority (CA) for TLS connection
      rejectUnauthorized: true,
    },
  });
} catch (error) {
  console.error("Fatal, bad configuration for pool");
  process.exit(1);
}

module.exports = { pool };
