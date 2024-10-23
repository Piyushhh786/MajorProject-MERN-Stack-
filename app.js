const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");//for includes 
const expressError = require("./error/ExpressError.js");
const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");
// ----------x---------



app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
// const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().then(() => {
    console.log("successfully connected with mongodb");
}).catch((err) => {
    console.log(err.message);
    next(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.listen(port, () => {
    console.log("Our server is listening on 8080 port.");
});
app.get("/", (req, res) => {
    res.send("Hiii i am the root route");
});
app.use("/listings", listings);
app.use("/listings/:id/review", reviews);
app.all("*", (req, res, next) => {
    let status = 404;
    let message = "Page not Found!!";
    throw new expressError(status, message);
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    console.log(status, message);
    res.status(status).render("listings/error.ejs", { message });
});

