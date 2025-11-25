import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  category: { type: String, require: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
//mongoose.models.food ||
// Whenever this file loads it will create a new model again to prevent that before creating
// we are checking this model is present or not if not it will create if it is there it won't create
