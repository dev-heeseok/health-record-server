const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const comparePassword = async (user, plainPassword, callback) => {
  try {
    const validate = await bcrypt.compare(plainPassword, user.password);
    callback(null, validate);
  } catch (err) {
    callback(err);
  }
};

const generateToken = async (user, callback) => {
  const token = jwt.sign({ _id: user._id }, SECRETE_TOKEN, {
    expiresIn: "1h"
  });

  try {

    user.token = jwt.sign(
      { _id: user._id },
      SECRETE_TOKEN,
      { expiresIn: "1h" }
    );

    const newUser = await user.save();
    callback(null, newUser);

  } catch (err) {
    callback(err);
  }
};

const findByToken = async (token, callback) => {
  try {
    const decode = await jwt.verify(token, SECRETE_TOKEN);
    const findUser = await User.findOne({ _id: decodedUser._id, token: token });
    callback(null, findUser);
  } catch (err) {
    callback(err);
  }
};

module.exports = { comparePassword, generateToken, findByToken };
