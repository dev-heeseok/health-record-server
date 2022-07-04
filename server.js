const app = require("./src/app");
const { PORT } = require("./src/config");
const { connectDB } = require("./src/models");

connectDB();

app.listen(PORT, () => {
  console.log(`The express server is listening at port ${PORT}`);
});