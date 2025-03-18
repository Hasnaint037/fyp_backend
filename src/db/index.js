const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error(`Connection error: ${error}`);
  });

  db.once("open", () => {
    console.log("Database connected");
  });
};

module.exports = dbConnection;
