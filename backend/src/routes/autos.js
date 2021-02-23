const { Router } = require("express");
const router = Router();

const {
  getAuto
} = require("../controllers/autos.controller");

router.route("/:id").get(getAuto);

module.exports = router;
