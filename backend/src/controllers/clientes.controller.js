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
  }

  res.json({ message: "Cliente Guardado" });
};

clientesCtrl.getClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
};

clientesCtrl.getCliente = async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  res.json(cliente);
};

module.exports = clientesCtrl;
