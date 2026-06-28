const express = require('express');
const {loadData} = require("../database/database");
const router = express.Router();


router.get('/', async (req, res, next) => {
  const allPosts = await loadData('SELECT * FROM posts.posts');
  console.log(allPosts);
  res.render('index', {allPosts})
})






module.exports = router ;