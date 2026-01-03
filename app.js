const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require ("./Models/listing.js");
const path = require ("path");

app.set ("view engine", "ejs");
app.set ("views", path.join (__dirname, "Views"));
app.set (express.urlencoded({extended: true}));

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

// show Route 
app.get ("/listings/:id", async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    res.render ("listings/show.ejs", {listing: listing});
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