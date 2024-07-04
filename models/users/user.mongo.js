const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const userSchema = new Schema(
  {
    /** Required Attributes */
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ["USER", "FREELANCER"] },
    balance: { type: Number, required: true, default: 0 },

    /** Not Required Attributes */
    category: { type: Types.ObjectId, required: false, ref: "Category" },
    rating: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
