const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  console.log('Request cookies:', req.cookies);
  const { cybervie } = req.cookies;
  if (!cybervie) {
    return res.status(401).json({
      message: "session ended",
      success: false,
    });
  }

  const decoded = jwt.verify(cybervie,"9D71AA85A1B9A");
  const user = await User.findById(decoded.id);

  req.user = user;

  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
