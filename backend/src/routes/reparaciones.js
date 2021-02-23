const { Router } = require("express");
const router = Router();

const {
  crearReparacion,
  getReparaciones,
  getReparacionesxAuto,
} = require("../controllers/reparaciones.controller");

router.route("/").post(crearReparacion);

router.route("/auto/:id").get(getReparacionesxAuto);
router.route("/autos").get(getReparaciones);

module.exports = router;
