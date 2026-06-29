const express = require('express');
const {loadData, savePost, updatePost, deletePost} = require("../database/database");
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
        console.log(error);
        res.render("500");
    }
})

router.get('/view/:id', async (req, res, next) => {
  const thePost = await loadData('SELECT p.*, a.full_name AS fullName FROM users.posts p INNER JOIN authors a ON p.author_id=a.id WHERE p.id = ?', [req.params.id]);
  if (thePost.length === 0 ) return res.render("404");
  res.render('postDetail', {thePost:thePost[0]})
})



router.get('/edit/:id', async(req, res, next) => {
    try {
        const [post] = await loadData('SELECT * FROM posts WHERE id=?', [req.params.id]); 
        if (!post) return res.render('404');
        res.render('edit-post', {post})
    } catch (error) {
        if (error) next(error)        
    }
    
}, (e,req,res,next)=>{
    if (e) {
        console.log(e);
        res.render('500');
    }
})


router.post('/edit/:id', async(req, res, next) => {
    let values = [];
    values = values.concat(Object.values(req.body)).concat(+req.params.id); 
    console.log('values', values);
    try {
    const result = await updatePost(values);
    res.redirect('/')
  } catch (error) {
    next(error);    
  }  
}, (e, req, res, next) => {
    if (e) {
        console.log(e, "here");
        res.render('500');
    }
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



router.post('/delete', async (req,res, next) => {
    try {
        const id = req.body.id;
        const result = await deletePost([id]);
        console.log('result', result);
        res.redirect('/')
    } catch (error) {
        console.log(error);
        next(error);
    }
}, (e, req, res, next) => {
    if (e) res.render('500');
})



module.exports = router