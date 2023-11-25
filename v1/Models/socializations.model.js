const mongoose = require("mongoose");
const validator = require("validator");


const socializationsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "Title is required"],
        },
        category: {
            type: String,
            trim: true,
            required: [true, "Category is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        comments: [
            {
                photoURL: {
                    type: String,
                    required: false,
                },
                name: {
                    type: String,
                    required: false,
                },
                email: {
                    type: String,
                    required: false,
                },
                comment: {
                    type: String,
                    required: false,
                },
            }
        ]
    },
    {
        timestamps: true,
    }

);


const Socializations = mongoose.model("socializations", socializationsSchema);

module.exports = Socializations;