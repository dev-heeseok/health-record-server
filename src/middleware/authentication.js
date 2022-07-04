const path = require("path");
const User = require("../models/User");

const authentication = (req, res, next) => {
  const token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      console.log(`Failed to findByToken ${err}`);
      // throw err;
      return res.json({ success: false, auth: false, err });
    }
    if (!user) {
      console.log(`Failed to findByToken`);
      return res.json({ success: false, auth: false });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { authentication };