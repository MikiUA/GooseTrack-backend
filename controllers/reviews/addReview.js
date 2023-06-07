const { Review } = require("../../models/index");

const addReview = async (req, res) => {
  try {
    const { _id } = req.user;
    const { rating, message } = req.body;
    if (!message) {
      return res.status(400).json({
        code: 400,
        message: "Please write something in field message",
      });
    }
    const newReview = await Review.create({ ...req.body, user: _id });

    res.status(201).json({
      code: 201,
      result: newReview,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addReview;
