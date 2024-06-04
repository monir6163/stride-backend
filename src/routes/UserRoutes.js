const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const router = Router();

router.get("/userEmail", UsersController.getUserEmail);
router.get("/userId", UsersController.getUserId);
router.patch("/userUpdate", UsersController.updateUser);

module.exports = router;
