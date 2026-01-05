const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require ("./Models/listing.js");
const path = require ("path");
const methodOverride = require ("method-override");
const ejsMate = require ("ejs-mate");



app.engine ("ejs", ejsMate);
app.set ("view engine", "ejs");
app.set ("views", path.join (__dirname, "views"));
app.use (express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use (express.static (path.join (__dirname, "Public")));

const MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust';


main().then(() => {
    console.log("connected to MongoDB");
}).catch((err) => {
    console.log(err);

})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get ("/", (req, res) => {
    res.send ("Hello World");
});

// index route to display all listings
app.get ("/listings", async (req, res) => {
    let listings = await Listing.find({});
    res.render("listings/index.ejs", {listings: listings});
});

// new route to render form for creating new listing
app.get ("/listings/new", (req, res) => {
    res.render ("listings/new.ejs");
});

// create route to handle form submission and create new listing
app.post ("/listings", async (req, res) => {
    const newListing = new Listing ( req.body.listing);
    await newListing.save();
    res.redirect ("/listings");
});



// show Route 
app.get ("/listings/:id", async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    res.render ("listings/show.ejs", {listing: listing});
});

// edit route to render form for editing a listing
app.get ("/listings/:id/edit", async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    res.render ("listings/edit.ejs", {listing: listing});
});

// update route to handle form submission and update listing
app.put ("/listings/:id", async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect (`/listings/${id}`);
});

// delete route to handle deletion of a listing
app.delete ("/listings/:id", async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect ("/listings");
});


// app.get ("/testlisting", async (req, res) => {
//     let sampleListing = new Listing ({
//         title: "Beautiful Beach House",
//         description: "A lovely beach house with stunning ocean views.", 
//         price: 5250,
//         location: "Malibu, CA",
//         imageUrl: "",
//         country: "USA"
//     });

//     await sampleListing.save().then(() => {
//         res.send("Sample listing saved to database");
//     }
//     ).catch((err) => {
//         res.status(500).send("Error saving listing: " + err);
//     });

// });

app.listen(8080, () => {
    console.log ("sever is running on port 8080");
});