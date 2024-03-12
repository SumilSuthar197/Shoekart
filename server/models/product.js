const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const options = {
//   separator: "-",
//   lang: "en",
//   truncate: 120,
// };

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "Please provide a sku"],
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    slug: {
      type: String,
      slug: ["name", "color"],
      slug_padding_size: 4,
    },
    brand: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand"],
    },
    image: {
      type: String,
      trim: true,
      required: [true, "Please provide an image"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a description"],
    },
    sizeQuantity: [
      {
        size: {
          type: Number,
          required: [true, "Please provide a size"],
        },
        quantity: {
          type: Number,
          required: [true, "Please provide a quantity for the size"],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    color: {
      type: String,
      lowercase: true,
      trim: true, 
      required: [true, "Please provide a color"],
    },
    material: {
      type: String,
      lowercase: true,  
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
        review: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
