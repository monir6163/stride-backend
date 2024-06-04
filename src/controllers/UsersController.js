const User = require("../models/userModel");
const UsersServices = require("../services/UsersServices");
const { formidable } = require("formidable");

class usersController {
  getUserEmail = async (req, res, next) => {
    try {
      const email = req.query.email;
      const user = await UsersServices.getUserEmail(email);
      return res.status(200).json({ status: true, user });
    } catch (error) {
      next(error);
    }
  };

  getUserId = async (req, res, next) => {
    try {
      const id = req.query.id;
      const user = await UsersServices.getUserId(id);
      return res.status(200).json({ status: true, user });
    } catch (error) {
      next(error);
    }
  };
  updateUser = async (req, res, next) => {
    try {
      const formData = formidable({});
      const [fields, files] = await formData.parse(req);
      const id = req.query.id;
      const name = fields?.name?.[0]?.trim() || null;
      const phone = fields?.phone?.[0]?.trim() || null;
      const img = files?.avatar?.[0]?.filepath || null;

      await UsersServices.updateUser({ id, name, phone, img });
      return res.status(200).json({ status: true, message: "User updated" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new usersController();
