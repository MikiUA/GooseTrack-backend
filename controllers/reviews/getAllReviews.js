const { Review } = require("../../models/index");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate(
      "user",
      "_id, name, avatarUrl"
    );
    res.status(200).json({
      code: 200,
      status: "Success",
      data: {
        result: reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to fetch reviews",
    });
  }
};

module.exports = getAllReviews;
