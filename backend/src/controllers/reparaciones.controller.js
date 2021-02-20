const reparacionesCtrl = {};
const Auto = require("../models/Auto");
const Cliente = require("../models/Cliente");
const Reparacion = require("../models/Reparacion");

reparacionesCtrl.getReparaciones = async (req, res) => {
  const reparaciones = await Reparacion.find();
  res.json(reparaciones);
};

reparacionesCtrl.getReparacionesxAuto = async (req, res) => {
  const placa = req.params.id;
  const reparaciones = await Reparacion.find({ placa });
  res.json(reparaciones);
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
  console.log(req.body);

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
  await autoNuevo.save();

  const reparacionNueva = new Reparacion({
    placa,
    fecha,
    responsable,
    detalle,
    cliente: nombre
  });
  await reparacionNueva.save();

  res.json({ message: "Reparación Agendada" });
};

module.exports = reparacionesCtrl;
