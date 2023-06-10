const { model, Schema } = require("mongoose");

const user = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  birthday: {
    type: String,
  },
  phone: {
    type: String,
  },
  skype: {
    type: String,
  },
  avatarUrl: {
    type: String,
    required: [true, "Avatar is required"],
  },
}, { versionKey: false });

const User = model("users", user);
module.exports = User;