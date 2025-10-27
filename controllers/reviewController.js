const review = require("../models/review.js");
const listing = require("../models/listings.js");
const user = require("../models/user.js");

module.exports.newReview = async (req, res) => {
    let { id } = req.params;
    let { rating, comment } = req.body;
    let name = res.locals.currUser.username;
    let createdBy = res.locals.currUser._id;
    let foundListing = await listing.findById(id);

    let newReview = new review({
        name, rating, comment, createdBy
    });

    newReview.listing = id;
    await newReview.save();

    foundListing.reviewIds.push(newReview._id);
    await foundListing.save();

    let userId = await user.findById(res.locals.currUser._id);
    userId.reviews.push(newReview);
    await userId.save();

    req.flash("success", "Review Added!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, r_id } = req.params;
    await review.findByIdAndDelete(r_id);
    await listing.findByIdAndUpdate(id, { $pull: { reviewIds: r_id } });
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};