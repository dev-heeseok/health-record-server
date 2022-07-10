const dotenv = require('dotenv');
dotenv.config();

// Server Info
const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 4000;

// MongoDB Info
const MONGODB_URI = process.env.MONGODB_URI; // require
const MONGODB_NAME = process.env.MONGODB_NAME || "RemoteDB";

// Security Info
const SALT_ROUND = Number(process.env.SALT_ROUND) || 10;
const SECRETE_TOKEN = process.env.SECRETE_TOKEN; // require

// Config option
const TEMPLATE_FOLDER = String(process.env.TEMPLATE_FOLDER);
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(", ");

module.exports = {
  IP,
  PORT,
  MONGODB_URI,
  MONGODB_NAME,
  SALT_ROUND,
  SECRETE_TOKEN,
  TEMPLATE_FOLDER,
  ALLOWED_ORIGINS,

}