const { Review } = require("../../mongooseSchemas/index");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
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
      error: error.message,
    });
  }
};

module.exports = getAllReviews;
