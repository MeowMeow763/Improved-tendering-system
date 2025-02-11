const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["client", "bidder"], // Valid roles
    default: "bidder", // Default role if not specified
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
