const joi = require("joi");
const ExpressError = require("./ExpressError");

const listingSchema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().min(0).required(),
        photos: joi.string().allow("", null),
        country: joi.string().required(),
        type: joi.string().required(),
});

const validateListingSchema = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports = validateListingSchema;