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
  } else {
    res.status(400).json({
      message: "Auto ya existe",
    });
  }

  res.json({ message: "Autos de Cliente Guardado" });
};

autosCtrl.getAuto = async (req, res) => {
  await Auto.find({ placa: req.params.id })
    .then((auto) => res.json(auto))
    .catch((err) => console.log(err));
};

autosCtrl.getAutosxCliente = async (req, res) => {
  await Auto.find({ cliente: req.params.id })
    .then((autos) => res.json(autos))
    .catch((err) => console.log(err));
};

module.exports = autosCtrl;
