const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    prise: { type: Number, required: true },
    user: { type: Types.ObjectId, required: true, ref: "User" },
    
  },
  {
    timestamps: true,
  }
);

const Item = new mongoose.model("Item", itemSchema);

module.exports = Item;
