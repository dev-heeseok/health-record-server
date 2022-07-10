const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const roles = require("../lib/RoleCode");
const { SALT_ROUND, SECRETE_TOKEN } = require("../config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 23,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: roles.Member
    },
    Editor: Number,
    Admin: Number
  },
  refreshToken: [String]

});

/**
 * @desc before create/save
 */
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUND);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
      next();

    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
