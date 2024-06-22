const Order = require("../models/orderModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
class paymentServices {
  createPayment = async (data) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: data.p_name,
                images: [data.p_image],
              },
              unit_amount: parseInt(data.p_price) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `https://stride-frontend-kappa.vercel.app/success`,
        cancel_url: `https://stride-frontend-kappa.vercel.app/cancel`,
      });

      // insert order into database here

      const order = {
        session_id: session.id,
        price: data.p_price,
        status: session.payment_status,
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        p_name: data.p_name,
        p_price: data.p_price,
        p_id: data.p_id,
        p_img: data.p_image,
      };

      // insert order into database here

      if (session.payment_status === "paid") {
        order.status = "success";
      }
      if (session.payment_status === "unpaid") {
        order.status = "pending";
      }
      if (session.payment_status === "canceled") {
        order.status = "failed";
      }
      if (session) {
        await Order.create(order);
      }

      return session;
    } catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = new paymentServices();
