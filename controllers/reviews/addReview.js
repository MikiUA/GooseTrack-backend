const { UnauthorisedError, ValidationError } = require("../../helpers/errorHandling");
const { findUserByID } = require("../../models/users");
const { Review } = require("../../mongooseSchemas/index");

const addReview = async (req, res) => {
  const user = await findUserByID(req.user);
  if (!user) throw new UnauthorisedError();

  const { rating, message } = req.body;
  if (!rating || typeof (Number(rating)) !== 'number' || typeof (message) !== 'string')
    throw new ValidationError("Please write a message and a rating");

  const newReview = await Review.create({
    rating: Number(rating),
    message,
    owner: user._id,
    name: user.name,
    avatarUrl: user.avatarUrl,
  });

  res.status(201).json({
    code: 201,
    result: newReview,
  });
};

module.exports = addReview;
