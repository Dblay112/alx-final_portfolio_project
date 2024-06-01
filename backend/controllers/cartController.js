import userModel from "../models/userModel.js";

// Logic to add items to the cart of a user
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

// Logic to remove items from the cart of a user
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId] > 1) {
        cartData[itemId] -= 1;
      } else {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

// Logic to fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

export { addToCart, removeFromCart, getCart };