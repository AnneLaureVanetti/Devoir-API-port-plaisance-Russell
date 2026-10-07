var express = require("express");
var router = express.Router();
const userService = require("../services/userservice");
const { checkJWT } = require("../middlewares/authenticate");

router.get("/", checkJWT, userService.getAll);
router.get("/:id", checkJWT, userService.getById);
router.put("/:id", checkJWT, userService.update);
router.delete("/:id", checkJWT, userService.delete);
router.post("/", userService.add);

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

module.exports = router;
