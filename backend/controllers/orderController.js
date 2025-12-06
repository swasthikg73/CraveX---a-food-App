import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  const { items, amount, address } = req.body;
  try {
    const newOrder = new orderModel({
      userId: req.user.id,
      items,
      amount,
      address,
    });

    await newOrder.save();
    //Clearing cart from user once food is ordered
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 86,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100 * 86,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, meessage: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

//List order for Page
const listOrders = async (req, res) => {
  const { status } = req.query;
  let filter = {};
  if (status) {
    filter.status = status;
  }

  try {
    const orders = await orderModel.find(filter);
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Order Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
