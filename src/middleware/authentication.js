const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SALT_ROUND, SECRETE_TOKEN } = require("../config");

const verifyToken = (req, res, next) => {
  const { authentication } = req.headers;
  if (!authentication) {
    console.log("Failed to verifyToken");
    return res.status(401).json({
      success: false,
      authentication: false,
      message: "로그인 정보가 없습니다."
    });
  }

  const [tokenType, tokenValue] = authentication.split(" ");
  if (tokenType !== "Bearer") {
    console.log("Failed to verifyToken");
    return res.status(401).json({
      success: false,
      authentication: false,
      message: "로그인 정보가 올바르지 않습니다."
    });
  }

  try {
    jwt.verify(tokenValue, SECRETE_TOKEN, (err, decoded) => {
      if (err) {
        console.log(`Failed to jwt.verify ${err.name}`);
        return res.status(401).json({
          success: false,
          authentication: false,
          message: "로그인 정보가 만료되었습니다.",
          err
        });
      }
      if (!decoded) {
        console.log("Expired to verifyToken");
        return res.status(401).json({
          success: true,
          authentication: false,
          message: "로그인을 실패하였습니다."
        });
      }

      User.findOne({ _id: decoded._id })
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          console.log(`Failed to jwt.verify ${err}`);
          return res.status(401).json({
            success: false,
            authentication: false,
            message: "로그인 정보가 올바르지 않습니다."
          });
        });
    });
  } catch (err) {
    console.log(`verifyToken Error ${err}`);
    res.status(401).json({
      success: false,
      authentication: false,
      message: "로그인을 실패하였습니다.",
      err
    });
  }
};

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

module.exports = {
  verifyToken,
  authentication
};
