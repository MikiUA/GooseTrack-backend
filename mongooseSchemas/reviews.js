const { model, Schema } = require("mongoose");

const review = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  name: {
    type: String,

    required: [true, "Name is required"],
  },
  avatarUrl: {
    type: String,
    required: [true, "Avatar is required"],
  },
});

const Review = model("reviews", review);
module.exports = Review;
