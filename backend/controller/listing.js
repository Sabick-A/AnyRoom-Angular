const Listing = require("../models/listing.js");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });


module.exports.index=async (req, res) => {
    let listings = await Listing.find({});
    res.json(listings);
}

module.exports.createListingForm=(req, res) => {
    res.render("./listings/newListing.ejs");
};

module.exports.createListing=async (req, res) => {
    let response= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      }).send();
    let url=""
    if(req.file){
        url=req.file.path;
        let filename=req.file.filename;
    }else{
        url="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        filename="default.jpg";
    }
    const newListing = new Listing(req.body.listing);
    newListing.owner = res.locals.currUser._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry
    await newListing.save();
    // req.flash("success", "New Listing Created");
    res.redirect("http://localhost:4200/listings");
};

module.exports.showListings=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate('owner').populate({
        path:"reviews",
        populate:{
            path: "author",
        }
    });
    if (!listing) {
        req.flash("error", "Listing Does Not Exist");
        res.redirect("/listings");
    }
    res.json(listing);
};

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    // req.flash("success", "Listing Updated");
    res.redirect(`http://localhost:4200/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndDelete(id);
    console.log(listing);
    console.log("done");
    // req.flash("success", "Listing Deleted");
   
    res.redirect("http://localhost:4200/listings");
};