const express = require("express");
const router = express.Router();

const reviewCntrl = require("../../controllers/index");
const { authentificateUser } = require("../../middleware");
const { middlewareHandler: handled } = require('../../helpers/errorHandling');

router.get("/", handled(reviewCntrl.getAllReviews));
router.get("/my-reviews", authentificateUser, handled(reviewCntrl.getUserReviews));
router.post("/my-reviews", authentificateUser, handled(reviewCntrl.addReview));
router.patch("/:reviewID", authentificateUser, handled(reviewCntrl.editReview));
router.delete("/:reviewID", authentificateUser, handled(reviewCntrl.removeReview));

module.exports = { router };
