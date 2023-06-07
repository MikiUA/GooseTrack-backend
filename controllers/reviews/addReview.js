const { Review } = require("../../models/index");
const { User } = require("../../validShemas/index");

const addReview = async (req, res) => {
  try {
    const id = req.user;

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "Unuathorization",
      });
    }

    const { rating, message } = req.body;
    if (!message) {
      return res.status(400).json({
        code: 400,
        message: "Please write something in field message",
      });
    }

    const newReview = await Review.create({
      ...req.body,
      owner: id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });

    res.status(201).json({
      code: 201,
      result: newReview,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addReview;
