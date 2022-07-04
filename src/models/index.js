const mongoose = require("mongoose");
const { MONGODB_URI, MONGODB_NAME } = require("../config");

const connectDB = async () => {
  if (process.env.NODE_ENV === "production") {
    console.log("mongoose set debug");
    mongoose.set("debug", true);
  }

  try {

    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_NAME
    });

    console.log("MongoDB connected ...");

  } catch (err) {
    console.log("Failed to connect to MongoDB");
    process.exit(1);
  }
};

exports.connectDB = connectDB;
// module.exports = { connect };