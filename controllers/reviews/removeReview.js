const { Review } = require("../../mongooseSchemas/index");

const removeReview = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Review.findByIdAndRemove(reviewID);
    if (!result) {
      return res.status(404).json({ code: 404, message: error.message });
    }
    res.status(204).json({
      status: "success",
      code: 204
    });
  } catch (error) {
    throw error;
  }
};

module.exports = removeReview;
