const express = require("express");
const router = express.Router();

const catwayService = require("../services/catwayservice");
const reservationsRouter = require("./reservations");
const { checkJWT } = require("../middlewares/authenticate");

router.use(checkJWT);

router.use("/:id/reservations", reservationsRouter);

(router.get("/", catwayService.getAll),
  router.get("/:id", catwayService.getById),
  router.post("/", catwayService.add),
  router.put("/:id", catwayService.update),
  router.delete("/:id", catwayService.delete));

module.exports = router;
