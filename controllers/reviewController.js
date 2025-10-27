const review = require("../models/review.js");
const listing = require("../models/listings.js");

module.exports.newReview = async (req, res) => {
    let { id } = req.params;
    let { rating, comment } = req.body;
    let name = res.locals.currUser.username;
    let foundListing = await listing.findById(id);

    let newReview = new review({
        name, rating, comment
    });

    newReview.listing = id;
    await newReview.save();

    foundListing.reviewIds.push(newReview._id);
    await foundListing.save();

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