const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

class authServices {
  registration = async (data) => {
    const registerData = await User.create(data);
    return registerData;
  };

  changePassword = async (id, newPassword) => {
    console.log({ id, newPassword });
    const user = await User.findByIdAndUpdate(id, { password: newPassword });
    return user;
  };
}

module.exports = new authServices();
