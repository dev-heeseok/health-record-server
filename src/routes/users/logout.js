const express = require("express");
const router = express.Router();
const httpStatus = require("../../lib/httpStatusCode");

const User = require("../../models/User");

router.use("/", (req, res, next) => {
  console.log(`/api/users/logout routes`);
  next();
});

router.get("/", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(httpStatus.noContent);
  }

  console.log("find user by token");
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(httpStatus.noContent);
  }

  console.log("remove refreshToken");
  foundUser.refreshToken = foundUser.refreshToken.filter(token => token !== refreshToken);
  const result = await foundUser.save();

  console.log("clear cookies");
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(httpStatus.noContent);
});

module.exports = router;
