import foodModel from "../models/foodModels.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  const body = req.body;
  const image_filename = `${req.file.filename}`;

  //const image_filename = `wertyhtr`;

  //console.log(req.image);

  const food = new foodModel({
    name: body.name,
    description: body.description,
    price: body.price,
    category: body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//get All Foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    console.log(food);

    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
