const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password");
        }
      },
    },
  },
  { timestamps: true },
);

// Always use function syntax, not arrow function
userSchema.methods.getJWTToken = async function () {
  const user = this;

  /*Generate JWT Token*/
  const token = await jwt.sign(
    { _id: user._id },
    process.env.JSON_WEB_TOKEN_SECRET_KEY,
    { expiresIn: "1d" },
  );
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
