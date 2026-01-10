const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
    }, 
    imageUrl: {
        type: String,
        default: "https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-with-rocks-in-the-foreground-Md_-qx-b0-Q",
        set(v) {
            return v === "" 
            ? "https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-with-rocks-in-the-foreground-Md_-qx-b0-Q" : v;
        },

    },
    country: {
        type: String,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;