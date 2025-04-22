const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const ExpiredToken = mongoose.model("Token", tokenSchema, "tokens");
module.exports = ExpiredToken;
