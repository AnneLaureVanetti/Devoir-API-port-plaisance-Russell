var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ca marche!" });
});

router.get("/api-docs", function (req, res, next) {
  res.render("api-docs");
});

module.exports = router;
