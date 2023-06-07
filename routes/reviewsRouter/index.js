const express = require("express");
const router = express.Router();

const reviewCntrl = require("../../controllers/index");
const { authentificateUser } = require("../../middleware");

router.get("/reviews", authentificateUser, reviewCntrl.getAllReviews);
router.get("/my-reviews", authentificateUser, reviewCntrl.getUserReviews);
router.post("/my-reviews", authentificateUser, reviewCntrl.addReview);
router.patch("/:reviewID", authentificateUser, reviewCntrl.editReview);
router.delete("/:reviewID", authentificateUser, reviewCntrl.removeReview);

module.exports = { router };
