import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is not uploaded!" });
    }

    let image_filename = `${req.file.filename}`;

    const foodData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    };
    console.log("Food data before saving:", foodData);

    const food = new foodModel(foodData);
    await food.save();

    console.log("Food saved successfully:", food);

    res.status(200).json({ success: true, message: "Food added!", data: food });
  } catch (error) {
    console.log("Error in addFood: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

// all food list
const getFoodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.log("Error in getFoodList: ", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({ success: true, message: "Food removed!" });
  } catch (error) {
    console.log("Error in removeFood: ", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export { addFood, getFoodList, removeFood };
