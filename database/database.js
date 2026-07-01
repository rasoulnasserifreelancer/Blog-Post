const { pool } = require("./db");

async function loadData(sql, values) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(sql, values);
    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

async function savePost(values) {
  let connection;
  try {
    connection = await pool.getConnection();
    const sql =
      "INSERT INTO posts (title, summary, content, author_id) VALUES(?,?,?,?)";
    const [result, field] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function updatePost(values) {
  let connection;
  try {
    connection = await pool.getConnection();
    const sql = "UPDATE posts SET title=?, summary=?, content=? WHERE id = ?";
    const [result, field] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function deletePost(values) {
  let connection;
  try {
    connection = await pool.getConnection();
    let sql = "DELETE FROM posts WHERE id = ?";
    let [result] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  loadData,
  savePost,
  updatePost,
  deletePost,
};
