const express = require("express");
const router = express.Router();
const { EMPTYHANDLER } = require("../TODOhandler");
const reviewCntrl = require("../../controllers/index");

router.get("/reviews", reviewCntrl.getAllReviews);
router.get("/my-reviews", reviewCntrl.getUserReviews);
router.post("/my-reviews", reviewCntrl.addReview);
router.patch("/:reviewID", reviewCntrl.editReview);
router.delete("/:reviewID", reviewCntrl.removeReview);

module.exports = { router };
