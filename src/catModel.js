const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  catId: { type: String, unique: true, required: true },
  name: String,
  imageUrl: String,
  hits: { type: Number, default: 1 },
});

/**
 * Model for Cats
 */
const Cat = (module.exports = mongoose.model("cat", catSchema));

module.exports.add()
