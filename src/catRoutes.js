const express = require("express");
const catsController = require("./catController");
const router = express.Router();

// Get top 10 cats
router.get("/top", catsController.getTopCats);

module.exports = router;
