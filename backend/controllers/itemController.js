import itemModel from "../models/itemModel.js";
import fs from "fs";

// Add item
const addItem = async (req, res) => {
  let image_filename = req.file.filename; // Use req.file.filename directly
  const item = new itemModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename, // Corrected here
  });
  try {
    await item.save();
    res.json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ success: false, message: "Failed to add item" });
  }
};

// List items
const listItem = async (req, res) => {
  try {
    const items = await itemModel.find({});
    res.json({ success: true, data: items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error retrieving items" });
  }
};

// Remove item
const removeItem = async (req, res) => {
  try {
    const item = await itemModel.findById(req.body.id);
    fs.unlink(`uploads/${item.image}`, () => {});
    await itemModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Item Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "And Error Occured" });
  }
};

export { addItem, listItem, removeItem };