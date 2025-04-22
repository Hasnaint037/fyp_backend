const jwt = require("jsonwebtoken");

exports.createToken = (data, res) => {
  const token = jwt.sign(data, process.env.SECRET_KEY);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
};
