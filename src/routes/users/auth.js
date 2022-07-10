const express = require("express");
const router = express.Router();

const { authentication } = require("../../middleware/authentication");

router.use("/", (req, res, next) => {
  console.log('/api/users/auth routes');
  next();
});

router.get("/auth", authentication, (req, res) => {
  res.status(200).json({
    success: true,
    auth: true,
    _id: req.user._id,
    email: req.user.email
  });
});

module.exports = router;
