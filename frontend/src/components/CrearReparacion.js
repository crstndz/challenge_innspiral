import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class CrearReparacion extends Component {
  state = {
    form: {
      nombre: "",
      id: "",
      contacto: "",
      placa: "",
      marca: "",
      modelo: "",
      responsable: "",
      fecha: new Date(),
      detalle: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://challenge-innspiral.herokuapp.com/api/reparaciones", {
      form: this.state.form,
    });
  };

  handleOnChangeDate = (fecha) => {
    this.setState({ form: { fecha } });
  };

  render() {
    return (
      <div className="container p-4">
        <div className="row">
          <form className="col-md-12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <h5> Datos del Cliente </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="inputNombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNombre"
                  onChange={this.handleChange}
                  name="nombre"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputIden" className="form-label">
                  Identificación
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputIden"
                  onChange={this.handleChange}
                  name="id"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputContact" className="form-label">
                  Contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputContact"
                  onChange={this.handleChange}
                  name="contacto"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-4">
                <h5> Datos del Auto </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="inputPlaca" className="form-label">
                  Placa Patente
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPlaca"
                  onChange={this.handleChange}
                  name="placa"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputMarca" className="form-label">
                  Marca
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputMarca"
                  onChange={this.handleChange}
                  name="marca"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputModelo" className="form-label">
                  Modelo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputModelo"
                  onChange={this.handleChange}
                  name="modelo"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-4">
                <h5> Datos de la Reparación </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="inputResponsable" className="form-label">
                  Responsable
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputResponsable"
                  onChange={this.handleChange}
                  name="responsable"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputFecha" className="form-label">
                  Fecha
                </label>
                <DatePicker
                  id="inputFecha"
                  name="fecha"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  selected={this.state.form.fecha}
                  onChange={this.handleOnChangeDate}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputDetalle" className="form-label">
                  Detalle u Observaciones
                </label>
                <textarea
                  className="form-control"
                  id="inputDetalle"
                  onChange={this.handleChange}
                  name="reparacion.detalle"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 p-4 ml-auto ">
                <button type="submit" className="btn btn-primary">
                  Agendar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
