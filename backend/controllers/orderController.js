import dotenv from "dotenv";
dotenv.config();
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order
const placeOrder = async (req, res) => {

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("Error in placeOrder: ", error);
    res.json({ success: false, message: "Something went wrong! " });
  }
};

// verify order
const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful!" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

//order from frontend
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.body.userId })
      .sort({ date: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("error in getUserOrders", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

// get orders for admin
const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("error in getAllOrderForAdmin: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated!" });
  } catch (error) {
    console.log("Error in updateOrderStatus: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

export {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getAllOrdersForAdmin,
  updateOrderStatus,
};
