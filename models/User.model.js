const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: [true, "Name is already taken."],
      trim: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/marcelusironhack/image/upload/v1710765987/neutralPNG_p60p83.png",
    },
    email: {
      type: String,
      unique: [true, "Email is already taken."],
      trim: true,
    },
    password: {
      required: [true, "Password is required."],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
