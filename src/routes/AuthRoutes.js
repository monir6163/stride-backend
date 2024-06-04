const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const router = Router();

router.post("/register", AuthController.registration);

module.exports = router;
