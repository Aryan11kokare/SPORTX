import Item from "../models/item.js";
import { findMatches } from "../utils/matcher.js";

export const createItem = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const newItem = new Item({
      title: title,
      description: description,
      category: category,
      price: price,
      image: req.file ? req.file.filename : "",
      user: req.user._id,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (e) {
    console.log(e);
    res.status(500).json("Error creating item");
  }
};

export const deleteItem = async (req, res) => {
  try {
    const user = req.user;
    const ItemId = req.params.id;
    const ItemFound = await Item.findById(ItemId);
    if (ItemFound.user.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json("You don't have permission to delete this event");
    }
    await Item.findByIdAndDelete(ItemId);
    res.status(200).json("Item deleted");
  } catch (e) {
    console.log(e);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("user", " username email phone ");
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId)
      .populate("user", " username email phone")
      .populate({ path: "reviews", populate: { path: "author" } });
    if (!item) {
      return res.status(404).json("item not found!");
    }
    res.status(200).json(item);
  } catch (e) {
    console.log(e);
  }
};

export const MatchItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(200).json("Item not foun");
    }
    const opposite = await Item.find({ category: item.category });
    const matches = findMatches(opposite, item);
    res.status(200).json(matches);
  } catch (e) {
    console.log(e);
  }
};
