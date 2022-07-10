const { ALLOWED_ORIGINS } = require("../config");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}

module.exports = credentials;