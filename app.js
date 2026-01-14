const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require ("./Models/listing.js");
const path = require ("path");
const methodOverride = require ("method-override");
const ejsMate = require ("ejs-mate");
const wrapAsync = require ("./utils/wrapAsync.js");
const ExpressError = require ("./utils/ExpressError.js");
const { listingSchema } = require ("./schema.js");



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

const validateListing = (req, res, next) => {
    const {error} = listingSchema.validate (req.body);
    if (error) {
        const msg = error.details.map (el => el.message).join (",");
        throw new ExpressError (400, msg);
    } else {
        next();
    }   
};


// index route to display all listings
app.get ("/listings", wrapAsync (async (req, res) => {
    let listings = await Listing.find({});
    res.render("listings/index.ejs", {listings: listings});
}));

// new route to render form for creating new listing (MUST come before /:id route)
app.get ("/listings/new", (req, res) => {
    res.render ("listings/new.ejs");
});

// show Route 
app.get ("/listings/:id", wrapAsync (async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    res.render ("listings/show.ejs", {listing: listing});
}));

// create route to handle form submission and create new listing
app.post ("/listings", validateListing, wrapAsync (async (req, res) => {
    const {error} = listingSchema.validate (req.body);
    if (error) {
        const msg = error.details.map (el => el.message).join (",");
        throw new ExpressError (400, msg);
    }


    const newListing = new Listing ( req.body.listing);
    await newListing.save();
    res.redirect ("/listings");
})
);

// edit route to render form for editing a listing
app.get ("/listings/:id/edit",  wrapAsync (async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    res.render ("listings/edit.ejs", {listing: listing});
}));

// update route to handle form submission and update listing
app.put ("/listings/:id", validateListing, wrapAsync (async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError (400, "Invalid Listing Data");
    }

    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect (`/listings/${id}`);
}));

// delete route to handle deletion of a listing
app.delete ("/listings/:id", wrapAsync (async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect ("/listings");
}));


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

// Catch-all route for 404 errors - must be after all other routes
app.use((req, res, next) => {
    next (new ExpressError (404, "Page Not Found"));
});

// Error handling middleware
app.use (( err, req, res, next) => {
    const {status = 500, message = "Something went wrong"} = err;
    //  res.status(status).send(message);
    res.status(status).render ("error.ejs", {err: err});
});


app.listen(8080, () => {
    console.log ("sever is running on port 8080");
});