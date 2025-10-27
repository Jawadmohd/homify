const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const validateReview = require("../utils/validateReviewSchema.js");
const {isAuthenticate, verifyOwnerReview} = require("../midlewares.js");
const { newReview, destroyReview } = require("../controllers/reviewController.js");


router.post("/new", isAuthenticate ,validateReview, wrapAsync(newReview));


router.delete("/:r_id", isAuthenticate ,verifyOwnerReview ,wrapAsync(destroyReview));

module.exports = router;