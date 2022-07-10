const { ALLOWED_ORIGINS } = require("../config");
const httpStatus = require("../lib/httpStatusCode");

const corsOptions = {
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: httpStatus.ok
}

module.exports = corsOptions;