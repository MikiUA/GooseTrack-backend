const { model, Schema } = require("mongoose");

const review = Schema({
  user: {
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
});

const Review = model("reviews", review);
module.exports = Review;
