const User = require("../models/userModel");

class authServices {
  registration = async (data) => {
    const registerData = await User.create(data);
    return registerData;
  };
}

module.exports = new authServices();
