const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, "Le numéro est requis"],
    },

    clientName: {
      type: String,
      trim: true,
      required: [true, "Le nom est requis"],
    },

    boatName: {
      type: String,
      trim: true,
      required: [true, "Le nom est requis"],
    },

    startDate: {
      type: Date,
      required: [true, "La date de début est requise"],
    },

    endDate: {
      type: Date,
      required: [true, "La date de fin est requise"],
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("reservations", reservationSchema);
