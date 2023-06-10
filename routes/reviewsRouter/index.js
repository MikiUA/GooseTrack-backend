const express = require("express");
const router = express.Router();

const reviewCntrl = require("../../controllers/index");
const { authentificateUser, isValidId } = require("../../middleware");
const { middlewareHandler: handled } = require('../../helpers/errorHandling');

router.get("/", handled(reviewCntrl.getAllReviews));
router.get("/my-reviews", authentificateUser, handled(reviewCntrl.getUserReviews));
router.post("/my-reviews", authentificateUser, handled(reviewCntrl.addReview));
router.patch("/:id", isValidId, authentificateUser, handled(reviewCntrl.editReview));
router.delete("/:id", isValidId, authentificateUser, handled(reviewCntrl.removeReview));

module.exports = { router };
