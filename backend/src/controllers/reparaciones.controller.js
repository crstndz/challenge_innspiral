const reparacionesCtrl = {};
const Auto = require("../models/Auto");
const Cliente = require("../models/Cliente");
const Reparacion = require("../models/Reparacion");

reparacionesCtrl.getReparaciones = async (req, res) => {
  await Reparacion.find()
    .sort({ fecha: "desc" })
    .then((reparaciones) => res.json(reparaciones))
    .catch((err) => console.log(err));
};

reparacionesCtrl.getReparacionesxAuto = async (req, res) => {
  const placa = req.params.id;
  await Reparacion.find({ placa })
    .then((reparaciones) => res.json(reparaciones))
    .catch((err) => console.log(err));
};

reparacionesCtrl.crearReparacion = async (req, res) => {
  const {
    nombre,
    id,
    contacto,
    placa,
    marca,
    modelo,
    responsable,
    fecha,
    detalle,
  } = req.body.form;

  const clienteNuevo = new Cliente({
    id,
    nombre,
    contacto,
  });

  const cliente = await Cliente.find({ id });
  if (cliente.length == 0) {
    await clienteNuevo.save();
  }

  const autoNuevo = new Auto({
    placa,
    marca,
    modelo,
    cliente: id,
  });

  const auto = await Auto.find({ placa: placa });
  if (auto.length == 0) {
    await autoNuevo.save();
  }

  const reparacionNueva = new Reparacion({
    placa,
    fecha,
    responsable,
    detalle,
    cliente: nombre,
  });
  await reparacionNueva.save();

  res.json({ message: "Reparación Agendada" });
};

module.exports = reparacionesCtrl;
