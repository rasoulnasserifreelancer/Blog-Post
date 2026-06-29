const mysql2 = require('mysql2/promise');
let pool;
try {
    pool = mysql2.createPool(
            {
                user:"root",
                password:"88121",
                host : "localhost",
                database:"users",   
            }
        )
    
} catch (error) {
    console.error("Fatal, bad configuration for pool");
    process.exit(1);
}


module.exports = {pool}