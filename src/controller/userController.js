const { UserService } = require("../services");

const signUp = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const response = await UserService.createUser({
      email,
      userName,
      password,
    });
    res.status(200).json({
      message: "User created successfully ",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await UserService.signIn({
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
    });
    res.status(200).json({
      data: response,
      message: "token is send",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "something went wrong ",
      success: false,
    });
  }
};

module.exports = { signUp, signIn };
