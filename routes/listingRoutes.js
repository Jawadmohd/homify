const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const validateListing = require("../utils/validateListingSchema.js");
const { isAuthenticate, verifyOwnerListing } = require("../midlewares.js");
const { homePage, getAddListingsPage, newListingAdd, showListing, getEditListing, editListing, deleteListing } = require("../controllers/listingController.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router.get("/", wrapAsync(homePage));

router.get("/listings/add", isAuthenticate, getAddListingsPage);

router.post("/listings/new", upload.array('photos', 12),isAuthenticate, validateListing, wrapAsync(newListingAdd));

router.get("/listings/:id", wrapAsync(showListing));

router.get("/listings/:id/edit", isAuthenticate ,verifyOwnerListing ,wrapAsync(getEditListing));

router.patch("/listings/:id/edit", upload.array("photos", 12), isAuthenticate ,verifyOwnerListing,validateListing, wrapAsync(editListing));

router.delete("/listings/:id/delete", isAuthenticate, verifyOwnerListing,wrapAsync(deleteListing));

module.exports = router;
