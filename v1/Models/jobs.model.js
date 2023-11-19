const mongoose = require("mongoose");
const validator = require("validator");


const serviceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "Name is required"],
        },
        category: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        image: {
            required: true,
            type: String,
            validate: [validator.isURL, "Please provide Product Image URL"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        sku: {
            type: String,
            required: [false, "SKU is required"],
        },

    },
    {
        timestamps: true,
    }

);


const Services = mongoose.model("services", serviceSchema);

module.exports = Services;