const List = require('./../models/listing.model');
const fs = require('fs')
const path = require('path')
const { default: mongoose } = require("mongoose")


const addListing = async (req, res) => {
    try {
      let listing = req.body;
      if (!req.file) throw new Error("Image file is required");
  
      let fileName = req.file.filename;
      listing.imageName = fileName;
      listing.ownerId = req.user.id;
  
      const newListing = await List.create(listing);
      res.status(201).send(newListing);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  

const allListing = async (req, res) => {
    try {
        let listings = await List.find().populate("ownerId", "-password");  
        let modListings = listings.map(list => ({
            ...list.toObject(),
            imageName: process.env.IMAGE_URL + list.imageName
        }));
        res.status(200).send(modListings);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


const getListById = async (req, res) => {
    try {
        const { id } = req.params;

        const list = await List.findOne({ _id: id }).populate("ownerId", "-password");

        const modList = {
            ...list.toObject(),
            imageName: process.env.IMAGE_URL + list.imageName
        };

        res.status(200).send(modList);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


const updateListing = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = new mongoose.Types.ObjectId(req.user.id);
      const updateData = req.body;
  
      const existingListing = await List.findOne({ _id: id, ownerId: userId });
      if (!existingListing) {
        return res.status(400).send({ message: "Invalid request or unauthorized access" });
      }
  
      let imageName = existingListing.imageName; 
      if (req.file) {
        imageName = req.file.filename;
      }
  
      const updatedListing = await List.findByIdAndUpdate(
        id,
        { ...updateData, imageName },
        { new: true }
      ).populate("ownerId", "-password");
  
      const modListing = {
        ...updatedListing.toObject(),
        imageUrl: process.env.IMAGE_URL + updatedListing.imageName,
      };
  
      res.status(200).send(modListing);
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  };
  

const updateListingImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const updateData = req.body;

    const existingListing = await List.findOne({ _id: id, ownerId: userId });
    if (!existingListing) {
      return res.status(400).send({ message: "Invalid request or unauthorized access" });
    }

    let imageName = existingListing.imageName; 
    if (req.file) {
      imageName = req.file.filename;
    }

    const updatedListing = await List.findByIdAndUpdate(
      id,
      { ...updateData, imageName },
      { new: true }
    ).populate("ownerId", "-password");

    const modListing = {
      ...updatedListing.toObject(),
      imageUrl: process.env.IMAGE_URL + updatedListing.imageName,
    };

    res.status(200).send(modListing);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};


const deleteListing = async (req, res) => {
    try {
        let { id } = req.params;
        let userId = new mongoose.Types.ObjectId(req.user.id);

        let existingListing = await List.findOne({ _id: id, ownerId: userId });
        if (!existingListing) {
            return res.status(400).send({ message: "Invalid Request or Unauthorized access" });
        }

        let deletedListing = await List.findByIdAndDelete({ _id: id });

        let filePath = `./uploads/${deletedListing.imageName}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(200).send(deletedListing);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};


const searchProduct = async(req,res) =>{
    try{
        let {search} = req.params
        const results = await List.find({
            itemName: { $regex:search, $options: "i" },
          }).populate("ownerId");

          let modEvents = results.map(res =>({
            ...res.toObject(),
            eventImage: "http://localhost:5000/uploads/" + res.imageName
        }));

        res.status(200).send(modEvents);
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }
}




module.exports = {
    addListing,
    allListing,
    getListById,
    updateListing,
    updateListingImage,
    deleteListing,
    searchProduct,
};
