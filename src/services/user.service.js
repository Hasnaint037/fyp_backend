const UserSchema = require("../schema/user.schema");
const bcrypt = require("bcrypt");

exports.comparePassword = async function (new_password, hashedPassword) {
  console.log("new password", new_password);
  console.log("hashed password", hashedPassword);
  const isValid = await bcrypt.compare(new_password, hashedPassword);
  return isValid;
};

exports.register = async (user) => {
  const newUser = new UserSchema(user);
  newUser.password = await newUser.hashPassword(user.password);
  return newUser.save();
};

exports.login = async (email) => {
  const user = UserSchema.findOne({ email });
  return user;
};
