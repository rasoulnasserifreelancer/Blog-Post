const express = require("express");
const {rateLimit} = require("express-rate-limit");
const router = express.Router();

// configuring ratelimiter to put limit of 10 request per minute
const limiter = rateLimit({
  windowMs:1000*60,
  limit:10,
  handler : (req, res) => {
    console.log(req.path, "path");
    res.status(429).render('429');
  }
});

// applying limiter to all incoming requests to my routes
router.use(limiter);

module.exports = router;
