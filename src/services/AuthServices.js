const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

class authServices {
  registration = async (data) => {
    const registerData = await User.create(data);
    return registerData;
  };

  changePassword = async (id, oldPassword, newPassword) => {
    console.log({ id, oldPassword, newPassword });
    const user = await User.findById(id).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Password not match");
    }
    user.password = newPassword;
    await user.save();
    return user;
  };
}

module.exports = new authServices();
