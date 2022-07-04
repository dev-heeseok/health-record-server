const dotenv = require('dotenv');
dotenv.config();

// Server Info
const IP = process.env.IP || "localhost"
const PORT = process.env.PORT || 4000

// MongoDB Info
const MONGODB_URI = process.env.MONGODB_URI; // require
const MONGODB_NAME = process.env.MONGODB_NAME || "RemoteDB"

// Security Info
const SALT_ROUND = Number(process.env.SALT_ROUND) || 10;
const SECRETE_TOKEN = process.env.SALT_ROUND // require

module.exports = {
  IP,
  PORT,
  MONGODB_URI,
  MONGODB_NAME,
  SALT_ROUND,
  SECRETE_TOKEN,

}