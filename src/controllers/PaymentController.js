const PaymentServices = require("../services/PaymentServices");

class paymentController {
  createPayment = async (req, res, next) => {
    try {
      const { order } = req.body;
      const payment = await PaymentServices.createPayment(order);
      return res.status(200).json({ status: true, id: payment.id });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new paymentController();
