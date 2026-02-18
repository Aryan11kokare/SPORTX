import mongoose from "mongoose";
import Review from "./review.js";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Basketball",
        "Cricket",
        "Footwear",
        "Fitness",
        "Tennis",
        "Football",
        "Strength Training",
        "Swimming",
        "Boxing",
        "Cycling",
        "Golf",
        "Skateboarding",
      ],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

itemSchema.post("findOneAndDelete", async (item) => {
  if (item) {
    await Review.deleteMany({ _id: { $in: item.reviews } });
  }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
