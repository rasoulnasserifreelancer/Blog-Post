const crypto = require("crypto");

function setNonce(req, res) {
  const nonce = crypto.randomUUID();
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; style-src  'nonce-${nonce}' ; script-src 'nonce-${nonce}'`,
  );
  console.log("nonce", nonce, req.path);
  return nonce;
}

module.exports = { setNonce };
