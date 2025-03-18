const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const dbConnection = require("./db");

dbConnection();
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
