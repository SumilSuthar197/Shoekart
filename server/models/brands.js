const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // lowercase: true,
    },
    description: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    activeProducts: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    isActivate: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
