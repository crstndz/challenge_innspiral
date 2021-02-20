const { Schema, model } = require("mongoose");
const Auto = require("./Auto");

const reparacionSchema = new Schema(
  {
    placa: String,
    fecha: {
      type: Date,
      default: Date.now,
    },
    detalle: String,
    responsable: String,
    cliente: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Reparacion", reparacionSchema);
