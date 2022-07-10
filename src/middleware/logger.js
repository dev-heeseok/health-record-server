const { v4: uuid } = require('uuid');
const { TEMPLATE_FOLDER } = require("../config");
const appRoot = require('app-root-path');
const dayjs = require("dayjs");

const fs = require("fs");
const path = require("path");

const profiler = async (message, fileName) => {
  const dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const folder = path.join(appRoot.path, TEMPLATE_FOLDER);
  const line = `${dateTime} ${uuid()} ${message}\n`;

  try {
    if (!fs.existsSync(folder)) {
      await fs.promises.mkdir(folder);
    }

    await fs.promises.appendFile(
      path.join(folder, fileName),
      line
    );

  } catch (err) {
    console.log(err);
  }
}

const logger = (req, res, next) => {
  const message = `${req.method} ${req.originalUrl}`;
  profiler(message, "service.log");

  console.log(message);
  next();
}

module.exports = { profiler, logger };