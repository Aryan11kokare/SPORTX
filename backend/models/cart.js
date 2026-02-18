import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
