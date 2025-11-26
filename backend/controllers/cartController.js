import userModel from "../models/userModel.js";

//add Items into the Cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;

    //If already no product is present in the user cart
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({
      success: true,
      message: "Item Added to Cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//remove items from the cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      return res.json({
        success: false,
        message: "Invalid item id",
      });
    } else {
      cartData[req.body.itemId] > 0
        ? (cartData[req.body.itemId] -= 1)
        : delete cartData[req.body.itemId];

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      return res.json({
        success: true,
        message: "Item deleted from Cart",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//fetch user Cart Data
const getCartData = async (req, res) => {};

export { addToCart, removeFromCart, getCartData };
