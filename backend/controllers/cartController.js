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
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = { ...userData.cartData }; // Copy cart data

    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1; // Reduce quantity
    } else {
      delete cartData[req.body.itemId]; // ✅ Remove item when quantity is 0
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Product removed from cart!" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Error in getCart: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

export { addToCart, removeFromCart, getCart };
