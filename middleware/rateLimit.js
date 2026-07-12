const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();



// configuring ratelimiter to put limit of 15 request per minute
const limiter = rateLimit({
    max:15,
    windowMS:1000*60
})


// applying limiter to all incoming requests to my routes
router.use(limiter);


module.exports = router;