const { ValidationError } = require("../../helpers/errorHandling");
const { Review } = require("../../mongooseSchemas/index");

const editReview = async (req, res) => {
  const { reviewID } = req.params;
  const { message, rating: untypedRating } = req.body;
  const rating = untypedRating && Number(untypedRating);
  const updateBody = {
    ...(rating && rating > 0 && rating <= 5) ? { rating: Number(rating) } : {},
    ...(message && typeof (message) === 'string') ? { message } : {}
  }
  if (Object.keys(updateBody).length === 0) throw new ValidationError("Please update a message or rating")

  const updateReview = await Review.findByIdAndUpdate(
    reviewID,
    updateBody,
    { new: true }
  );

  res.status(200).json({
    code: 200,
    result: updateReview,
  });
};

module.exports = editReview;
