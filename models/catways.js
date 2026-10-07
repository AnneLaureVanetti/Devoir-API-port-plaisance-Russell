const mongoose = require("mongoose");

const catwaySchema = mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, "Le numéro est requis"],
    unique: true,
  },

  catwayType: {
    type: String,
    required: true,
    enum: ["long", "short"],
  },

  catwayState: {
    type: String,
    required: [true, "Létat est requis"],
  },
});

module.exports = mongoose.model("catway", catwaySchema);
