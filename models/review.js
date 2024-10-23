const { required, date } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;