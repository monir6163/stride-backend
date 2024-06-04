const UploadCloudinary = require("../../utility/uploadImage");
const User = require("../models/userModel");

class userServices {
  getUserEmail = async (email) => {
    return await User.findOne({ email: email });
  };
  getUserId = async (id) => {
    return await User.findById(id);
  };

  updateUser = async (data) => {
    const user = await User.findById(data.id);
    await DestroyCloudinary(user.image.public_id);
    const url = await UploadCloudinary(data?.img, "ecom/user");
    const userData = {
      name: data?.name,
      phone: data?.phone,
      avater: {
        public_id: url?.public_id,
        url: url?.url,
      },
    };

    return await User.findByIdAndUpdate(data?.id, userData);
  };
}

module.exports = new userServices();
