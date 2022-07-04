const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const { verifyToken, authentication } = require("../../middleware/authentication");

/**
 * @route /api/users/register
 * @desc register
 * @access public
 */
router.post("/register", (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(user => res.status(200).json({ success: true }))
    .catch(err => res.json({ success: false, err }));
});

/**
 * @route /api/users/login
 * @desc login
 * @access public
 */
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.comparePassword(req.body.password, (err, invalid) => {
        if (err) {
          console.log(`Failed to comparePassword ${err}`);
          return res.json({ success: false, message: "not found email", err });
        }
        if (!invalid) {
          console.log('Invalid to comparePassword');
          return res.json({ success: false, message: "not found email" });
        }

      });

      user.generateToken((err, user) => {
        if (err) {
          console.log(`Failed to generateToken ${err}`);
          return res.json({ success: false, message: "failed to authentication", err });
        }

        res.cookie("x_auth", user.token)
          .status(200)
          .json({ success: true, accessToken: user.token });
      });
    })
    .catch((err) => {
      console.log(`Failed to login route ${err}`);
      res.json({ success: false, message: "not found email", err });
    });
});

/**
 * @route /api/users/logout
 * @desc logout
 * @access public
 */
router.get("/logout", authentication, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      console.log(`Failed to logout ${err}`);
      return res.json({ success: false, err });
    }

    res.status(200).send({ success: ture });
  })
});

/**
 * @route /api/users/auth
 * @desc authentication
 * @access public
 */
router.get("/auth", authentication, (req, res) => {
  res.status(200).json({
    success: true,
    auth: true,
    _id: req.user._id,
    email: req.user.email
  });
});

router.get("/verifyToken", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    auth: true,
    email: req.user.email,
    _id: req.user._id
  });

});

module.exports = router;