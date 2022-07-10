const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../models/User");
const httpStatus = require("../../lib/httpStatusCode")
const { comparePassword } = require("../../controllers/userController");
const { SECRETE_TOKEN } = require("../../config/development");

router.use("/", (req, res, next) => {
  console.log(`/api/users/login routes`);
  next();
});

router.post("/", async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(httpStatus.badRequest).json({ message: "email and password are required." });
  }

  try {
    const foundUser = await User.findOne({ email }).exec();
    await comparePassword(foundUser, password, (err, validate) => {
      if (!validate) {
        throw err;
      }
    });

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign({
      UserInfo: {
        username: foundUser.username,
        roles
      }
    }, SECRETE_TOKEN, {
      expiresIn: "1h"
    });

    const newRefreshToken = jwt.sign({
      username: foundUser.username
    }, SECRETE_TOKEN, {
      expiresIn: "14d"
    });

    const cookies = req.cookies;
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter(token => token !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      if (!foundToken) {
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", newRefreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 14 * 24 * 60 * 60 * 1000 });
    res.json({ accessToken, roles });

  } catch (err) {
    console.log(err);
    res.status(httpStatus.unauthorized).json({ message: "failed to authentication", err });
  }

});

module.exports = router;
