const { Review } = require("../../validShemas/index");

const getUserReviews = async (req, res) => {
  try {
    const id = req.user;
    console.log(id);
    const userReviews = await Review.find({ owner: id });

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
