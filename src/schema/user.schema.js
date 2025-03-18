const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return (this.password = hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
