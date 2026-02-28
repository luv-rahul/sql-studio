const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Step 1: Get Token from Cookies
    const { token } = req.cookies;

    // If token is not present, send an unauthorized error
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, please login." });
    }

    // Step 2: Verify Token
    const decodedObject = await jwt.verify(
      token,
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
    );

    // Step 3: Extract User ID from token
    const { _id } = decodedObject;

    // Step 4: Find User in Database
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 5: Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle token expiration error
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    // Handle other errors (e.g., invalid token)
    return res
      .status(400)
      .json({ message: "Something went wrong: " + error.message });
  }
};

module.exports = { userAuth };
