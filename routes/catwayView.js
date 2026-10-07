const express = require("express");
const router = express.Router();
const { checkJWT } = require("../middlewares/authenticate");
const catwayService = require("../services/catwayservice");
const Catway = require("../models/catways");

router.get("/", checkJWT, async (req, res) => {
  try {
    let catways = await Catway.find();
    res.render("catways-list", { catways: catways, user: req.decoded.user });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/", checkJWT, catwayService.createForm);

router.get("/:id", checkJWT, async (req, res) => {
  try {
    let catway = await Catway.findOne({ catwayNumber: req.params.id });
    res.render("catway-detail", { catway: catway, user: req.decoded.user });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/:id", checkJWT, catwayService.updateForm);

router.post("/:id/delete", checkJWT, catwayService.deleteForm);

module.exports = router;
