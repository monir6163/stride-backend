const { Router } = require("express");
const PaymentController = require("../controllers/PaymentController");
const middleware = require("../middleware/authMiddleware");
const router = Router();

router.post(
  "/create-checkout-session",
  middleware.auth,
  PaymentController.createPayment
);

module.exports = router;
