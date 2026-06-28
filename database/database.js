const mysql2 = require('mysql2/promise');
let pool;

function createPool(){
    pool = mysql2.createPool(
        {
            user:"root",
            password:"88121",
            host : "localhost",
            database:"users",
    
        }
    )
    return pool;
}


async function loadData(sql, values){
    try {
        const [rows, fields] = await pool.execute(sql, values);
        return rows
    }catch(e){
        return e
    }
}


async function savePost(values){
    const sql = 'INSERT INTO users.posts (title, summary, content, author_id) VALUES(?,?,?,?)';
    const [result, field] = await pool.execute(sql, values);
    return result;
}





module.exports = {
    createPool, 
    loadData,
    savePost
}
