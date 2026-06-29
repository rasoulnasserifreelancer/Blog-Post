const express = require('express');
const {loadData} = require("../database/database");
const { error } = require('node:console');
const router = express.Router();


router.get('/', async (req, res, next) => {
  res.redirect('/posts')
})


module.exports = router ;