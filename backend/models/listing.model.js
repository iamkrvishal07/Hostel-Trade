const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Book",
        "Engineering Equipment",
        "Stationery",
        "Electronics",
        "Sports Equipment",
        "Clothing",
        "Other",
      ],
    },

    description: {
      type: String, 
      required: true,
    },

    condition: {
      type: String, 
      required: true,
      enum: ["As New", "Good", "Poor"],
    },

    price: {
      type: Number,
      required: true,
    },

    imageName: {
      type: String,  
      required: true,
    },

    status: {
      type: String, 
      required: true,
      enum: ["Available", "Sold"],
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("Listing", ListingSchema);

module.exports = List;
