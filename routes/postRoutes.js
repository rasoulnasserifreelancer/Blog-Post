const express = require('express');
const {loadData, savePost} = require("../database/database");
const router = express.Router();


router.get('/view/:id', async (req, res, next) => {
  const thePost = await loadData('SELECT p.*, a.full_name AS fullName FROM users.posts p INNER JOIN authors a ON p.author_id=a.id WHERE p.id = ?', [req.params.id]);
  if (thePost.length === 0 ) return res.render("404");
  res.render('postDetail', {thePost:thePost[0]})
})



router.get('/create', (req, res) => {
    res.render('create-post')
})


router.post('/create', async (req, res, next) => {
    const values = {...req.body, author_id:+req.body.author_id}
    try {
        console.log(values);
        const resp = await savePost(Object.values(values));
        console.log(resp);
        res.redirect('/');

    }catch(e){
        next(e);
    }
}, (e,req,res, next)=> {
    if (e) {
        console.log(e);
        res.render('500');
    }
})







module.exports = router