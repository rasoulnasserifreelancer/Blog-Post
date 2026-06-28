const express = require('express');
const {loadData} = require("../database/database");
const router = express.Router();


router.get('/view/:id', async (req, res, next) => {
  const [thePost] = await loadData('SELECT p.*, a.full_name AS fullName FROM users.posts p INNER JOIN authors a ON p.author_id=a.id WHERE p.id = ?', req.params.id);
  console.log(thePost);
  res.render('postDetail', {thePost})
})



router.get('/create', (req, res) => {
    res.render('create-post')
})


router.post('/create', (req, res) => {
    console.log('running post ');
    console.log(req.body);
})



module.exports = router