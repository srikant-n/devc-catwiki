const express = require("express");
const apiController = require("./apiController");
const router = express.Router();

// Get breed names based on search
router.get("/breeds/search/:query", apiController.getBreedNames);
router.get("/breeds/search/", apiController.getBreedNames);
// Get data for a breed
router.get("/breeds/:id", apiController.getBreedData);

module.exports = router;