const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signUp = async (firstName, lastName, emailId, password) => {
  try {
    // Encrypt Password
    const passwordHash = await bcrypt.hash(password, 10);

    // Store user in the database
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // Save user
    const savedUser = await user.save();

    // Generate JWT token
    const token = await user.getJWTToken();

    return { user: savedUser, token };
  } catch (error) {
    throw new Error("Error during user sign up: " + error.message);
  }
};

// Login Service
const login = async (emailId, password) => {
  try {
    // Find user in database
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid EmailId or Password");
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid EmailId or Password");
    }

    // Generate JWT token
    const token = await user.getJWTToken();

    return { user, token };
  } catch (error) {
    throw new Error("Error during login: " + error.message);
  }
};

// Logout Service
const logout = () => {
  return { message: "Logout Successful!" };
};

module.exports = { signUp, login, logout };
