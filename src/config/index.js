const serverMode = process.env.NODE_ENV
  ? process.env.NODE_ENV : "development";
console.log(`${serverMode} is running`);

if (serverMode === "production") {
  module.exports = require("./production");
} else {
  module.exports = require("./development");
}