import userModel from "../models/userModel.js";

//add Items into the Cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.user.id });
    let cartData = await userData.cartData;

    console.log(userData, cartData);

    //If already no product is present in the user cart
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.user.id, { cartData });
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
    let userData = await userModel.findOne({ _id: req.user.id });
    let cartData = await userData.cartData;
    //console.log("Cart Data :", cartData);

    if (!cartData[req.body.itemId]) {
      return res.json({
        success: false,
        message: "Item not found in Cart",
      });
    } else {
      cartData[req.body.itemId] > 1
        ? (cartData[req.body.itemId] -= 1)
        : delete cartData[req.body.itemId];

      await userModel.findByIdAndUpdate(req.user.id, { cartData });
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
const getCartData = async (req, res) => {
  try {
    const userData = await userModel.findById(req.user.id);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCartData };
