const { Review } = require("../../mongooseSchemas/index");

const getUserReviews = async (req, res) => {
  try {
    const id = req.user;
    const userReviews = await Review.find({ owner: id });

    res.status(200).json({
      code: 200,
      status: "Success",
      data: {
        result: userReviews,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = getUserReviews;
