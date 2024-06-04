const { formidable } = require("formidable");
const DogServices = require("../services/DogServices");

class dogController {
  create = async (req, res, next) => {
    try {
      const formData = formidable({});
      const [fields, files] = await formData.parse(req);
      const name = fields?.name?.[0]?.trim() || null;
      const price = fields?.price?.[0]?.trim() || null;
      const stock = fields?.stock?.[0]?.trim() || null;
      const des = fields?.description?.[0]?.trim() || null;
      const img = files?.image[0]?.filepath || null;

      const data = await DogServices.create({ name, price, stock, des, img });
      return res
        .status(201)
        .json({ status: true, data, message: "Create Success" });
    } catch (error) {
      next(error);
    }
  };

  getAllDogs = async (req, res, next) => {
    try {
      const data = await DogServices.getAllDogs();
      return res.status(200).json({ status: true, data });
    } catch (error) {
      next(error);
    }
  };

  getSingleDog = async (req, res, next) => {
    try {
      const { id } = req.query;
      const data = await DogServices.getSingleDog(id);
      return res.status(200).json({ status: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateDog = async (req, res, next) => {
    try {
      const formData = formidable({});
      const [fields, files] = await formData.parse(req);
      const name = fields?.name?.[0]?.trim() || null;
      const price = fields?.price?.[0]?.trim() || null;
      const stock = fields?.stock?.[0]?.trim() || null;
      const des = fields?.description?.[0]?.trim() || null;
      const img = files?.image[0]?.filepath || null;
      const { id } = req.query;

      const data = await DogServices.updateDog({
        name,
        price,
        stock,
        des,
        img,
        id,
      });
      return res
        .status(201)
        .json({ status: true, data, message: "Edit Success" });
    } catch (error) {
      next(error);
    }
  };

  deleteDog = async (req, res, next) => {
    try {
      const { id } = req.query;
      const data = await DogServices.deleteDog(id);
      return res.status(200).json({ status: true, data });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new dogController();
