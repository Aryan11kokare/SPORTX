import Item from "../models/item.js";
import Cart from "../models/cart.js";
import User from "../models/user.js";

export const AddToCart = async (req, res) => {
  try {
    const user = req.user;
    const { itemId, quantity, totalAmount } = req.body;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json("item not found!");
    }
    const newCart = new Cart({
      item: item._id,
      quantity: quantity,
      totalAmount: totalAmount,
    });
    user.cartItems.push(newCart);
    await newCart.save();
    await user.save();
    res.status(200).json("review created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteCart = async (req, res) => {
  const user = req.user;
  try {
    let cartId = req.header("cartId");
    const foundCart = await Cart.findById(cartId);
    if (!foundCart) {
      return res.status(200).json("cart not found");
    }
    await User.findByIdAndUpdate(user._id, { $pull: { cartItems: cartId } });
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json("Cart deleted successfully");
  } catch (e) {
    console.log(e);
  }
};
