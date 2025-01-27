import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;

    !cartData[req.body.itemId]
      ? (cartData[req.body.itemId] = 1)
      : (cartData[req.body.itemId] += 1);

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart." });
  } catch (error) {
    console.log("Error in addToCart: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

// remove item from cart
const removeFromCart = async (req, res) => {
  try {
    // Fetch user data based on userId from request body
    let userData = await userModel.findById(req.body.userId);

    // Check if user is found
    if (!userData) {
      return res.json({ success: false, message: "User not found!" });
    }

    // Get cart data
    let cartData = userData.cartData;

    // Ensure that the item exists and its quantity is greater than 0 before modifying it
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1; // Decrease quantity by 1
    }

    // Update the cart data in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Send the response once
    res.json({ success: true, message: "Product removed from cart!" });
  } catch (error) {
    console.log("Error in removeFromCart: ", error);
    // Ensure that we only send one response in case of an error
    if (!res.headersSent) {
      res.json({ success: false, message: "Something went wrong!" });
    }
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    // Fetch the user data by userId
    let userData = await userModel.findById(req.body.userId);

    // Check if userData is found
    if (!userData) {
      return res.json({ success: false, message: "User not found!" });
    }

    let cartData = userData.cartData;

    // Respond with cart data
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Error in getCart: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

export { addToCart, removeFromCart, getCart };
