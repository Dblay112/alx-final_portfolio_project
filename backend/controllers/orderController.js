import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    // Log incoming request data for debugging
    console.log("Received place order request with data:", req.body);

    // Save the order to the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    console.log("Order saved successfully:", newOrder);

    // Clear the user's cart
    const user = await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("User cart cleared successfully");

    // Create Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 15, // Multiply by 100 to convert to cents and by 15 for currency conversion
      },
      quantity: item.quantity,
    }));

    // Add shipment charges
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Shipment Charges",
        },
        unit_amount: 2 * 100 * 15, // Multiply by 100 to convert to cents and by 15 to Ghanaian cedis
      },
      quantity: 1,
    });

    console.log("Line items created for Stripe session:", line_items);

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=true&orderId={newOrder._id}`, // Adjusted cancel URL for clarity
    });

    console.log("Stripe session created successfully:", session);

    // Respond with the created session URL
    res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in placeOrder controller:", error);
    res
      .status(500)
      .json({ success: false, message: "500 Internal Server Error" });
  }
};

// Temporary verification of order function
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "An Error Occurred During Payment" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// Users orders to be sent to the frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// logic to list orders for the admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    console.log(orders);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

//logic to handle api for updating status of order
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Status Update Failed" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };