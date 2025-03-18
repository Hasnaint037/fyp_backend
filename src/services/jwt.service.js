const jwt = require("jsonwebtoken");

exports.createToken = (data, res) => {
  const token = jwt.sign(data, process.env.SECRET_KEY);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    expiresIn: "24h",
  });
};
