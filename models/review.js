const { name } = require("ejs");
const { required, ref } = require("joi");
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        required: true
    },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: false
        }
});

const review = new mongoose.model("review", reviewSchema);

module.exports = review;