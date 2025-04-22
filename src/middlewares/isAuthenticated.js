const jwt = require("jsonwebtoken");

const checkAuthenticity = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "unauthorized" });
  }
};

module.exports = checkAuthenticity;
