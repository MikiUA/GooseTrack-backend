const { Review } = require("../../validShemas/index");

const editReview = async (req, res) => {
  try {
    const { reviewID } = req.params;
    const { message, rating } = req.body;

    if (!message) {
      return res.status(400).json({
        code: 404,
        message: "Please write something in field message",
      });
    }

    const updateReview = await Review.findByIdAndUpdate(
      reviewID,
      { message, rating },
      { new: true }
    );

    res.status(200).json({
      code: 200,
      result: updateReview,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = editReview;
