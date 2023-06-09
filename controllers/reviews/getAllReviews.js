const { CustomError } = require("../../helpers/errorHandling");
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
    throw new CustomError(500, "Failed to fetch reviews");
  }
};

module.exports = getAllReviews;
