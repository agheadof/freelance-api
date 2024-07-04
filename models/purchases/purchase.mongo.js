const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const purchaseSchema = new Schema(
  {
    name: { type: String, required: true, ref: "Item" },
    prise: { type: Number, required: true, ref: "Item" },
    user: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const purchase = new mongoose.model("Purchase", purchaseSchema);

module.exports = purchase;
