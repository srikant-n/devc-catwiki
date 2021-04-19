const express = require("express");

const apiController = require("./apiController");

const router = express.Router();

// Get breed names based on search
router.get("/search/:query", apiController.getBreedNames);
router.get("/search/", apiController.getBreedNames);
// Get data for a breed
router.get("/:id", apiController.getBreedData);

module.exports = router;
