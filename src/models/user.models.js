const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pincode: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      
    },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User=mongoose.model("user", userSchema);

module.exports = User
