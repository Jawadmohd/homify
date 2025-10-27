const { required, ref } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);