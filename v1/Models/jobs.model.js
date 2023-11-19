const mongoose = require("mongoose");
const validator = require("validator");


const jobsSchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "companyName is required"],
        },
        positionName: {
            type: String,
            trim: true,
            required: [true, "positionName is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        vacancy: {
            required: true,
            type: String,
            validate: [validator.isURL, "Please provide Vacancy"],
        },
        skills: {
            type: String,
            trim: true,
            required: [false, "skills is not required"],
        },

    },
    {
        timestamps: true,
    }

);


const Jobs = mongoose.model("jobs", jobsSchema);

module.exports = Jobs;