const dotenv = require('dotenv');
dotenv.config();

const IP = process.env.IP || "localhost" // default 'localhost'
const PORT = process.env.PORT || 4000 // default port 4000

module.exports = {
  IP,
  PORT,
}