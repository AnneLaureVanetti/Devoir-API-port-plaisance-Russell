const express = require("express");
const router = express.Router();
const { checkJWT } = require("../middlewares/authenticate");
const Reservation = require("../models/reservations");
const reservationService = require("../services/reservationservice");

router.get("/", checkJWT, async (req, res) => {
  try {
    let reservations = await Reservation.find();
    res.render("reservation-list", {
      reservations: reservations,
      user: req.decoded.user,
    });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/", checkJWT, reservationService.createForm);

router.get("/:id", checkJWT, async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    res.render("reservation-detail", {
      reservation: reservation,
      user: req.decoded.user,
    });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/:id", checkJWT, reservationService.updateForm);

router.post("/:id/delete", checkJWT, reservationService.deleteForm);

module.exports = router;
