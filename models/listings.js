const { string, required, ref } = require("joi");
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photos: [{
        type: String,
        required: false
    }],
    country: {
        type: String,
        required: true
    },
    reviewIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
        required: false
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false
    },
     geoLocation: {
    type: {
      type: String, 
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  type: {
    type: String,
    required: false,
  }

})

const listing = new mongoose.model("listing", listingSchema);



module.exports = listing;