const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is require"],
    },
    city: {
      type: String,
      required: [true, "city is require"],
    },
    country: {
      type: String,
      required: [true, "country is require"],
    },
    postalCode: {
      type: Number,
      required: [true, "postalCode is require"],
    },

    p_name: {
      type: String,
      required: [true, "product name is require"],
    },
    p_price: {
      type: Number,
      required: [true, "product price is require"],
    },
    p_id: {
      type: Schema.Types.ObjectId,
      ref: "Dog",
      required: [true, "product id is require"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Order = model("Order", orderSchema);
module.exports = Order;
