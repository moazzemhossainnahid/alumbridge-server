const mongoose = require("mongoose");
const validator = require("validator");


const jobsSchema = mongoose.Schema(
    {
        jobTitle: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "jobTitle is required"],
        },
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
            type: Number,
            required: [true, "Vacancy is required"],
            trim: true,
        },
        skills: {
            type: String,
            trim: true,
            required: [false, "skills is not required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
    },
    {
        timestamps: true,
    }

);


const Jobs = mongoose.model("jobs", jobsSchema);

module.exports = Jobs;