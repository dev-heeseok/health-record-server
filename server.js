const main = require("./src/main");
const { PORT } = require("./src/config");
const connectDB = require("./src/models/mongoDB");

connectDB();

main.listen(PORT, () => {
  console.log(`The express server is listening at port ${PORT}`);
});