const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
  cart: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
