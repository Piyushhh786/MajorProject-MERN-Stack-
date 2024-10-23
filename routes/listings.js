const express = require("express");
const router = express.Router();
const { listingSchema } = require("../joiSchema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../error/wrapAsync.js");
const expressError = require("../error/ExpressError.js");


//validate middleware by joi


const validateListing = (req, res, next) => {
    console.log(req.body);
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsgs = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsgs);
    }
    else next();
}



router.get("/", wrapAsync(
    async (req, res) => {
        const allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
    })
);
router.get("/addList", (req, res) => {
    res.render("./listings/add.ejs");
});
router.post("/addList", validateListing, wrapAsync(async (req, res) => {
    let list = req.body.list;
    console.log(list);
    listingSchema.validate(list);

    let listing = new Listing(list);
    await listing.save();
    res.redirect("/listings");
}));
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate("reviews");
    res.render("./listings/individual.ejs", { list });
}));
router.put("/:id/edit", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = req.body.list;
    await Listing.findByIdAndUpdate(id, { ...list });
    res.redirect(`/listings/${id}`);
}));
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;

    let list = await Listing.findById(id);
    res.render("./listings/edit.ejs", { list });

}));
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const temp = await Listing.findByIdAndDelete(id).populate("reviews");
    console.log(temp);
    res.redirect("/listings");
}));


module.exports = router;