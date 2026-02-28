const AuthService = require("../services/authService");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const { user, token } = await AuthService.signUp(
      firstName,
      lastName,
      emailId,
      password,
    );
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.status(200).json({
      message: "User Signed Up Successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const { user, token } = await AuthService.login(emailId, password);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.status(200).json({ message: "Login Successfully!", status: 200, user });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

const logout = async (req, res) => {
  try {
    const result = await AuthService.logout();
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = { signUp, login, logout };
