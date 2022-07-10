const { profiler } = require("./logger");
const { httpStatus } = require("../lib/httpStatusCode");

const errorHandler = (err, req, res, next) => {
  profiler(`${err.name}: ${err.message}`, "error.log");
  console.error(err.stack);
  res.status(httpStatus.internalServiceError).send(err.message);
}

module.exports = errorHandler;