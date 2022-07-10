const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const appRoot = require('app-root-path');
const cookieParser = require("cookie-parser");
const httpStatus = require("./lib/httpStatusCode");
const { logger } = require("./middleware/logger");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./middleware/corsOptions");
const apiRoutes = require("./routes");

// custom middleware logger
app.use(logger);

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(appRoot.path, "/public")));

// routes
app.use("/api", apiRoutes);

// not found
app.all("*", (req, res) => {
  res.status(httpStatus.notFound);

  if (req.accepts("json")) {
    res.json({ "error": "404 Not Found" });
  } else if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// error
app.use(errorHandler);

module.exports = app;