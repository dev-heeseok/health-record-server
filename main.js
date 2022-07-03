const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`The express server is listening at port ${PORT}`);
});