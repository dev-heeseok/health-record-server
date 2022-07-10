const express = require("express");
const router = express.Router();

const httpStatus = require("../../lib/httpStatusCode");
const User = require("../../models/User");

router.use("/", (req, res, next) => {
  console.log(`/api/users/register routes`);
  next();
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(httpStatus.badRequest).json({ message: "Username, email and password are required." });
  }

  const duplicateUserName = await User.findOne({ username }).exec();
  const duplicateEmail = await User.findOne({ email: email }).exec();
  if (duplicateUserName || duplicateEmail) {
    return res.status(httpStatus.conflict).json({ message: "Conflict username or email" });
  }

  try {
    const result = await User.create({
      username: username,
      email: email,
      password: password
    });

    console.log(result);

    res.status(httpStatus.created).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(httpStatus.internalServiceError).json({ message: err.message });
  }

});

module.exports = router;
