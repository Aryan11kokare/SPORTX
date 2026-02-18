import Item from "../models/item.js";
import Review from "../models/review.js";

export const ItemReview = async (req, res) => {
  const user = req.user;
  try {
    const { itemId, comment, rating } = req.body;
    let item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json("event not found");
    }
    let newReview = new Review({
      comment: comment,
      rating: rating,
    });
    newReview.author = user._id;
    item.reviews.push(newReview);
    item.totalRatings += 1;
    item.averageRating =
      (item.averageRating * (item.totalRatings - 1) + rating) /
      item.totalRatings;
    await newReview.save();
    await item.save();
    res.status(200).json("review created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteReview = async (req, res) => {
  const user = req.user;
  try {
    let itemId = req.header("itemId");
    let reviewId = req.header("reviewId");
    const foundReview = await Review.findById(reviewId);
    if (foundReview.author.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json("You don't have permission to delete this review");
    }
    await Item.findByIdAndUpdate(itemId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json("review deleted successfully");
  } catch (e) {
    console.log(e);
  }
};
