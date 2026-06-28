const express = require('express');
const {loadData} = require("../database/database");
const router = express.Router();


router.get('/', async (req, res, next) => {
  const [allPosts] = await loadData('SELECT p.*, a.full_name AS fullName FROM users.posts p INNER JOIN authors a ON p.author_id=a.id');
  console.log(allPosts);
  res.render('index', {allPosts})
})




module.exports = router ;