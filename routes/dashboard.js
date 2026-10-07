const express = require("express");
const router = express.Router();
const { checkJWT } = require("../middlewares/authenticate");
const Reservation = require("../models/reservations");

router.get("/", checkJWT, async (req, res) => {
  try {
    let reservations = await Reservation.find();

    res.render("dashboard", {
      user: req.decoded.user,
      date: new Date().toLocaleDateString("fr-FR"),
      reservations: reservations,
    });
  } catch (error) {
    res.status(501).json(error);
  }
});

module.exports = router;
