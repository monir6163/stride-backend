const {
  UploadCloudinary,
  DestroyCloudinary,
} = require("../../utility/uploadImage");
const Dog = require("../models/dogModel");
const Order = require("../models/orderModel");

class dogServices {
  create = async (data) => {
    const url = await UploadCloudinary(data?.img, "ecom/dog");
    return await Dog.create({
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.des,
      image: {
        public_id: url?.public_id,
        url: url?.url,
      },
    });
  };
  getAllDogs = async () => {
    return await Dog.find().sort({ createdAt: -1 });
  };

  getSingleDog = async (id) => {
    return await Dog.findById(id);
  };

  updateDog = async (data) => {
    //remove old image from cloudinary
    const dog = await Dog.findById(data.id);
    await DestroyCloudinary(dog.image.public_id);
    //upload new image
    const url = await UploadCloudinary(data?.img, "ecom/dog");
    return await Dog.findByIdAndUpdate(data.id, {
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.des,
      image: {
        public_id: url?.public_id,
        url: url?.url,
      },
    });
  };

  deleteDog = async (id) => {
    //also delete image from cloudinary
    const dog = await Dog.findById(id);
    await DestroyCloudinary(dog.image.public_id);
    return await Dog.findByIdAndDelete(id);
  };

  createOrder = async (data) => {
    return await Order.create({
      name: data.name,
      email: data.email,
      address: data.address,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
      p_name: data.p_name,
      p_price: data.p_price,
      p_id: data.p_id,
    });
  };

  allOrders = async () => {
    return await Order.find().sort({ createdAt: -1 });
  };

  newTest = async ({ filepath, name }) => {
    const url = await UploadCloudinary(filepath, "ecom/dog");
    return url;
  };
}
module.exports = new dogServices();
