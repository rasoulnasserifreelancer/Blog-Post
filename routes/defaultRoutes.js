const express = require('express');
const {loadData} = require("../database/database");
const { error } = require('node:console');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
      const allPosts = await loadData('SELECT p.*, a.full_name AS fullName FROM users.posts p INNER JOIN authors a ON p.author_id=a.id');
      console.log(allPosts);
      res.render('index', {allPosts})
    
  } catch (error) {
    next(error)
  }  
}, (error, req, res, next) => {
    if (error) {
        res.render("500");
    }
})




module.exports = router ;