const { Router } = require("express");
const router = Router();

const {
  crearCliente,
  getClientes,
  getCliente,
} = require("../controllers/clientes.controller");

const {
  crearAuto,
  getAutosxCliente,
} = require("../controllers/autos.controller");

router.route("/").get(getClientes).post(crearCliente);

router.route("/:id").get(getCliente);

router.route("/:id/autos").get(getAutosxCliente).post(crearAuto);

module.exports = router;
