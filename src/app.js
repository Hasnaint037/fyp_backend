const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", userRouter);

module.exports = app;
