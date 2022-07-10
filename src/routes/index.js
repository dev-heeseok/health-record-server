const express = require("express");
const router = express.Router();

const userRoutes = require("./users");

router.use("/", (req, res, next) => {
  console.log(`/api routes`);
  next();
});

/**
 * @name users routes
 * @path /api/users
 */
router.use("/users", userRoutes);

module.exports = router;