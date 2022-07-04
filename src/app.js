const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRoute = require("./routes/main");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../public/build")));

app.use("*", (req, res, next) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);

  next();
});

app.use("/api", mainRoute);

app.use((err, req, res, next) => {
  // res.static = err.statusCode || 500;
  // res.send(err.message);

  console.log(`Failed to route ${err}`);
});

module.exports = app;