const { TokenCreate } = require("../../utility/TokenCreate");
const User = require("../models/userModel");
const AuthServices = require("../services/AuthServices");

class authController {
  registration = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await TokenCreate(email);
      //check user exist email
      const existUser = await User.findOne({ email: email });
      if (existUser) {
        return res
          .status(200)
          .json({ status: true, token, message: "login Success" });
      }

      await AuthServices.registration(req.body);
      return res
        .status(201)
        .json({ status: true, message: "User Register Success", token });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { id } = req.query;
      const { newPassword } = req.body;
      await AuthServices.changePassword(id, newPassword);
      return res
        .status(200)
        .json({ status: true, message: "Password Change Success" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new authController();
