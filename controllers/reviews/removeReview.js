const { Review } = require("../../models/index");

const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const result = await Review.findByIdAndRemove({ _id: reviewId });
    if (!result) {
      return res.status(404).json({ code: 404, message: error.message });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = removeReview;
