const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SALT_ROUND, SECRETE_TOKEN } = require("../config");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  userName: {
    type: String,
    minlength: 3,
    maxlength: 23,
  },
  token: {
    type: String,
  }

});

/**
 * @desc password encryption
 * @access public
 */
userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_ROUND, (err, salt) => {
      if (err) {
        console.log(`Failed to bcrypt genSalt ${err}`);
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log(`Failed to bcrypt hash ${err}`);
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/**
 * @desc compare password 
 * @access public
 */
userSchema.methods.comparePassword = function (plainPassword, callback) {
  const user = this;

  bcrypt.compare(plainPassword, user.password)
    .then(invalid => callback(null, invalid))
    .catch(err => callback(err,));
};

/**
 * @desc generate token
 * @access public
 */
userSchema.methods.generateToken = function (callback) {
  const user = this;

  const token = jwt.sign({ _id: user._id }, SECRETE_TOKEN);
  user.token = token;
  user.save()
    .then(newUser => callback(null, newUser))
    .catch(err => callback(err));
};

/**
 * @desc find user by token
 * @access public static
 */
userSchema.statics.findByToken = function (token, callback) {
  const user = this;

  jwt.verify(token, SECRETE_TOKEN, (err, decodedUser) => {
    user.findOne({ _id: decodedUser._id, token: token })
      .then(findUser => callback(null, findUser))
      .catch(err => callback(err));
  });
};

module.exports = mongoose.model("User", userSchema);
