const clientesCtrl = {};
const Cliente = require("../models/Cliente");

clientesCtrl.crearCliente = async (req, res) => {
  console.log(req.body.form);
  const { id, nombre, contacto } = req.body.form;
  const clienteNuevo = new Cliente({
    id,
    nombre,
    contacto,
  });
  const cliente = await Cliente.find({ id });
  if (cliente.length == 0) {
    await clienteNuevo.save();
  } else {
    res.status(400).json({
      message: "Cliente ya existe",
    });
  }

  res.json({ message: "Cliente Guardado" });
};

clientesCtrl.getClientes = async (req, res) => {
  await Cliente.find()
    .then((clientes) => res.json(clientes))
    .catch((err) => console.log(err));
};

clientesCtrl.getCliente = async (req, res) => {
  await Cliente.find({ id: req.params.id })
    .then((cliente) => res.json(cliente))
    .catch((err) => console.log(err));
};

module.exports = clientesCtrl;
