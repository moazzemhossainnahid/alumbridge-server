const express = require("express");
const jobsController = require("../Controllers/jobs.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

// add a service
router.post("/", verifyToken, jobsController.AddAJob);

// update a service
router.patch("/:id", verifyToken, jobsController.updateAJob);

// get all service
router.get("/", jobsController.getAllJobs);

// get single service
router.get("/:id", verifyToken, jobsController.getSingleJob);

// delete a service
router.delete("/:id", verifyToken, jobsController.deleteAJob);

module.exports = router;
