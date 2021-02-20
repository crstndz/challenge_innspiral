const { Schema, model } = require("mongoose");

const autoSchema = new Schema(
  {
    placa: {
      type: String,
      required: true,
    },
    marca: String,
    modelo: String,
    cliente: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Auto", autoSchema);
