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
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        banner: {
            required: false,
            type: String,
            validate: [validator.isURL, "Please provide Product Image URL"],
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