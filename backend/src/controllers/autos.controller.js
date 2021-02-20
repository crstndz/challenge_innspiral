const autosCtrl = {};
const Auto = require("../models/Auto");

autosCtrl.crearAuto = async (req, res) => {
  const { placa, marca, modelo, cliente } = req.body.form;
  const autoNuevo = new Auto({
    placa,
    marca,
    modelo,
    cliente,
  });
  const auto = await Auto.find({ placa });
  if (auto.length == 0) {
    await autoNuevo.save();
  }

  res.json({ message: "Autos de Cliente Guardado" });
};

autosCtrl.getAutosxCliente = async (req, res) => {
  const autos = await Auto.find({ cliente: req.params.id });
  res.json(autos);
};

module.exports = autosCtrl;
