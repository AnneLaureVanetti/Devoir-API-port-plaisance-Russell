const express = require("express");
const router = express.Router();
const userService = require("../services/userservice");

router.post("/", userService.login);

module.exports = router;
