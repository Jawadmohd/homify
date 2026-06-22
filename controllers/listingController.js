const listing = require("../models/listings.js");
const user = require("../models/user.js");
const geocodePlace = require("../utils/geocode.js");

async function resolveCoordinates(country, req) {
  let longitude = 0;
  let latitude = 0;

  try {
    const result = await geocodePlace(country);

    if (result) {
      longitude = result.longitude;
      latitude = result.latitude;
    } else {
      req.flash(
        "warning",
        "Could not fetch location, coordinates set to 0,0.",
      );
    }
  } catch (geoErr) {
    console.error("Geocoding error:", geoErr.message);
    req.flash("warning", "Error fetching location, coordinates set to 0,0.");
  }

  return { longitude, latitude };
}

module.exports.homePage = async (req, res) => {
  const listings = await listing.find().select("name price photos");
  res.render("home.ejs", { listings });
};

module.exports.searchListings = async (req, res) => {
  const { searchKey } = req.query;

  if (!searchKey || !searchKey.trim()) {
    return res.redirect("/");
  }

  const query = searchKey.trim();
  const regex = new RegExp(
    query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "i",
  );

  const listings = await listing
    .find({
      $or: [
        { name: regex },
        { country: regex },
        { type: regex },
        { description: regex },
      ],
    })
    .select("name price photos");

  res.render("home.ejs", { listings, searchKey: query });
};

module.exports.getAddListingsPage = (req, res) => {
  res.render("add.ejs");
};

module.exports.newListingAdd = async (req, res, next) => {
  try {
    const { name, description, price, country, type } = req.body;
    const owner = res.locals.currUser._id;
    const photos = req.files.map((f) => f.path);
    const { longitude, latitude } = await resolveCoordinates(country, req);

    const newListing = new listing({
      name,
      description,
      price,
      photos,
      country,
      owner,
      geoLocation: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      type,
    });

    await newListing.save();
    let userId = await user.findById(owner);
    userId.listings.push(newListing);
    await userId.save();

    req.flash("success", "Listing added successfully!");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  let listingId = await listing
    .findById(id)
    .populate("reviewIds")
    .populate("owner");
  let reviews = listingId.reviewIds;
  res.render("show", { listingId, id, reviews });
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
  const { longitude, latitude } = await resolveCoordinates(country, req);
  let updatedListing = await listing.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      country,
      geoLocation: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    },
    { new: true },
  );

  if (req.files && req.files.length > 0) {
    updatedListing.photos = [];
    photosPaths = req.files.map((f) => f.path);
    updatedListing.photos.push(...photosPaths);
    await updatedListing.save();
  }

  req.flash("success", "Listing Edited!");
  res.redirect(`/`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;

  await listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/");
};
