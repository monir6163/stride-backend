const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const router = Router();

router.post("/register", AuthController.registration);
router.put("/change-password", AuthController.changePassword);

module.exports = router;
