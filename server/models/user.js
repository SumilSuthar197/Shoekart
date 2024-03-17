const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
      validate: {
        validator: function (v) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})$/;
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          size: {
            type: Number,
          },
          qty: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
