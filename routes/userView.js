var express = require("express");
var router = express.Router();
const userService = require("../services/userservice");
const { checkJWT } = require("../middlewares/authenticate");
const User = require("../models/user");

router.get("/", checkJWT, async (req, res) => {
  try {
    let users = await User.find();
    res.render("user-list", { users: users, user: req.decoded.user });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/", checkJWT, userService.createForm);

router.get("/:id", checkJWT, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.render("user-detail", { targetUser: user, user: req.decoded.user });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/:id", checkJWT, userService.updateForm);

router.post("/:id/delete", checkJWT, userService.deleteForm);

module.exports = router;
