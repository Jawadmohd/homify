const listing = require("./models/listings");
const review = require("./models/review");

module.exports.isAuthenticate = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You are not logged in");
        res.redirect("/login");
    }
};

module.exports.savedRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};

module.exports.verifyOwnerListing = async(req, res, next) => {
  const { id } = req.params;
  let listingId = await listing.findById(id);
  if(!listingId.owner.equals(res.locals.currUser._id)){
    req.flash("error", "You are not the owner of this listing");
   return res.redirect("/listings");
  }
  next();
  
};

module.exports.verifyOwnerReview = async (req, res, next) => {
    let {r_id} = req.params;
    let reviewId = await review.findById(r_id);

    if(!reviewId.createdBy.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of this review");
        return res.redirect(`/listings`);
    }

    next();

};

