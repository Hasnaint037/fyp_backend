const {
  register,
  login,
  comparePassword,
} = require("../services/user.service");
const UserSchema = require("../schema/user.schema");
const BlackListedToken = require("../schema/token.schema");
const { createToken } = require("../services/jwt.service");

exports.userRegistration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isUserRegistered = await UserSchema.exists({
      $or: [{ email }, { username }],
    });
    if (isUserRegistered) {
      return res
        .status(400)
        .json({ success: false, message: "email or username already taken" });
    }
    const newUser = await register({ username, email, password });
    if (newUser) {
      createToken({ email: newUser.email, role: newUser.role }, res);
      res.status(201).json({
        success: true,
        message: "user registered successfully",
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await login(email);
  if (user === null) {
    return res
      .status(400)
      .json({ success: false, message: "invalid email or password" });
  }
  const passwordMatched = await comparePassword(password, user.password);
  if (passwordMatched) {
    createToken(
      {
        email: user.email,
        role: user.role,
        name: user?.username,
        _id: user._id,
      },
      res
    );
    res
      .status(200)
      .json({ success: true, message: "user logged in successfully", user });
  } else {
    res
      .status(400)
      .json({ success: false, message: "invalid email or password" });
  }
};

exports.logout = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("req.cookies", req.cookies); // Debugging

  if (token) {
    await BlackListedToken.create({ token });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ success: true, message: "User Logged out" });
};
