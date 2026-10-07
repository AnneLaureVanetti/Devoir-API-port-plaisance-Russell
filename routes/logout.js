const express = require("express");
const router = express.Router();
const userService = require("../services/userservice");

router.get("/", userService.logout);

module.exports = router;
