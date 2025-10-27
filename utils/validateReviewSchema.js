const joi = require("joi");
const ExpressError = require("./ExpressError");

const reviewSchema = joi.object({
    name: joi.string(),
    rating: joi.number().min(1).max(5).required(),
    comment: joi.string().required(),
});

const validateReviewSchema = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports = validateReviewSchema;