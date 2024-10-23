const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../joiSchema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../error/wrapAsync.js");
const Review = require("../models/review.js")
const expressError = require("../error/ExpressError.js");


const validateReview = (req, res, next) => {
    let { review } = req.body;
    console.log(review);
    let { error } = reviewSchema.validate(req.body);
    console.log("review validation working properly");
    if (error) {
        const errMsgs = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsgs);
    }
    else next();
}


router.post("/", validateReview, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let { review } = req.body;
    console.log(req.body);
    reviewSchema.validate(review);
    const tempReview = new Review(review);
    let list = await Listing.findById(id);
    list.reviews.push(tempReview);
    await tempReview.save();
    await list.save();
    console.log("review successfully added");
    res.redirect(`/listings/${id}`);
}));
router.delete("/:r_id", wrapAsync(async (req, res, next) => {
    let { r_id, id } = req.params;
    await Review.findByIdAndDelete(r_id);
    res.redirect(`/listings/${id}`);
}));//working properly now handle the deletion when a list is deleted 
module.exports = router;