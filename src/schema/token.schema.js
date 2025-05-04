const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // 24 hours in seconds
  },
});

const ExpiredToken = mongoose.model("Token", tokenSchema, "tokens");
module.exports = ExpiredToken;
