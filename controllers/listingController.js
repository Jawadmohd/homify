const listing = require("../models/listings.js");
const user = require("../models/user.js");
const NodeGeocoder = require("node-geocoder");
const options = {
  provider: 'openstreetmap',
  httpAdapter: 'https',
  formatter: null,
  headers: {
    'User-Agent': 'homify/1.0 (jawadmohd2706@example.com)',
    'Referer': 'https://homify-dnkk.onrender.com/'
  }
};
const geocoder = NodeGeocoder(options);

module.exports.homePage = async (req, res) => {

    const listings = await listing.find().select("name price photos");
    res.render("home.ejs", { listings });

};

module.exports.getAddListingsPage = (req, res) => {
    res.render("add.ejs");
};

module.exports.newListingAdd = async (req, res, next) => {
  try {
    const { name, description, price, country, type } = req.body;
    const owner = res.locals.currUser._id;
    const photos = req.files.map(f => f.path);

    console.log(photos, req.body);

    let longitude = 0;
    let latitude = 0;

    try {
      const result = await geocoder.geocode(country);

      if (result.length) {
        longitude = result[0].longitude;
        latitude = result[0].latitude;
      } else {
        req.flash('warning', 'Could not fetch location, coordinates set to 0,0.');
      }
    } catch (geoErr) {
      console.error('Geocoding error:', geoErr.message);
      req.flash('warning', 'Error fetching location, coordinates set to 0,0.');
    }

    const newListing = new listing({
      name,
      description,
      price,
      photos,
      country,
      owner,
      geoLocation: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      type
    });

    await newListing.save();
    let userId = await user.findById(owner);
    userId.listings.push(newListing);
    await userId.save();

    req.flash('success', 'Listing added successfully!');
    res.redirect('/');

  } catch (err) {
    next(err);
  }
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    let listingId = await listing.findById(id).populate("reviewIds").populate("owner");
    let reviews = listingId.reviewIds;
    res.render("show", { listingId, id, reviews});

};

module.exports.getEditListing = async (req, res) => {
    let { id } = req.params;
    let listingId = await listing.findById(id);
    res.render("edit.ejs", { listingId, id });

};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let { name, description, price, country } = req.body;
    let photosPaths = [];
    let updatedListing = await listing.findByIdAndUpdate(id, {
        name,
        description,
        price,
        country
    }, { new: true });

    if (req.files && req.files.length > 0) {
        updatedListing.photos = [];
        photosPaths = req.files.map(f => f.path);
        updatedListing.photos.push(...photosPaths);
        await updatedListing.save();
    }

    req.flash("success", "Listing Edited!");
    res.redirect(`/`)

};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/");

};
