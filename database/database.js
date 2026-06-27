const mysql2 = require('mysql2/promise');
let pool;

function createPool(){
    pool = mysql2.createPool(
        {
            user:"root",
            password:"88121",
            host : "http://localhost:3306",
            database:"users",
    
        }
    )
    return pool;
}


async function loadData(sql, values){
    try {
        const [rows, fields] = await pool.execute(sql, values);
        return [rows,fields]
    }catch(e){
        return e
    }
}




module.exports = {
    createPool, 
    loadData
}
