const express = require("express");
const crypto = require("crypto");
const helmet = require("helmet");
const router = express.Router();

/*

this will set nonce for document and also
for each style but nonce generated for document
will be checked by the browser and that nonce is exactly 
what is passed to head tag, browser kind of ignore
nonce generated for styles

*/

router.use((req, res, next) => {
  const nonce = crypto.randomUUID();
  res.locals.nonce = nonce;
  // res.setHeader(
  //   "Content-Security-Policy",
  //   `default-src 'self'; script-src 'nonce-${nonce}' ; style-src 'nonce-${nonce}'`,
  // );
  // console.log('nonce', nonce, req.path);
  next();
});

router.use(
  helmet({
    directives: {
      contentSecurityPolicy: {
        "script-src": ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      },
    },
  }),
);

module.exports = router;
