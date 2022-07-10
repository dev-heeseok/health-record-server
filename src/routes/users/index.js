const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  console.log(`/api/users routes`);
  next();
});

// public routes
router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));
// router.use("/auth", require("./auth"));
// router.use("/refresh", require("./refresh"));

// protected routes


module.exports = router;