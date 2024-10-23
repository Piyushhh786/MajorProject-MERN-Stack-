const mongoose = require("mongoose");
const Review = require("./review");
const defaultImg = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
let listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: {
            type: String,
            default: defaultImg,
            // set: (v) => v === "" ? defaultImg : v
        },

    },
    price: {
        type: Number
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
});
listingSchema.post("findOneAndDelete", async (list) => {
    if (list) {
        await Review.deleteMany({
            _id: { $in: list.reviews }
        });
    }
});
const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;