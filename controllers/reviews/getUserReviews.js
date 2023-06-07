const { Review } = require("../../models/index");

const getUserReviews = async (req, res) => {
  try {
    const reviewId = req.params;

    const userReviews = await Review.find();

    res.status(200).json({
      code: 200,
      status: "Success",
      data: {
        result: userReviews,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getUserReviews;
