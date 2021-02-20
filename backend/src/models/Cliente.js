const { Schema, model } = require("mongoose");

const clienteSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: String,
    contacto: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cliente", clienteSchema);
