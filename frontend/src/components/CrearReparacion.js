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

  async componentDidMount() {
    const placa = this.props.location.autoProps.placa;
    const cliente = this.props.location.autoProps.cliente;
    console.log("placa", placa);
    console.log("cliente", cliente);

    if ("" == placa && "" == cliente) {
      const res = await axios.get(`/api/reparaciones/autos`);
      this.setState({ reparaciones: res.data });
    } else {
      const resCliente = await axios.get(`/api/clientes/${cliente}`);
      const resAuto = await axios.get(`/api/autos/${placa}`);

      this.setState({
        form: {
          nombre: resCliente.data[0].nombre,
          id: resCliente.data[0].id,
          contacto: resCliente.data[0].contacto,
          placa: resAuto.data[0].placa,
          marca: resAuto.data[0].marca,
          modelo: resAuto.data[0].modelo,
        },
      });
    }
  }

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
    const res = await axios.post("/api/reparaciones/", {
      form: this.state.form,
    });
    window.location.href = "/";
  };

  handleOnChangeDate = (fecha) => {
    this.setState({ form: { ...this.state.form, fecha } });
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
                  value={this.state.form.nombre}
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
                  value={this.state.form.id}
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
                  value={this.state.form.contacto}
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
                  value={this.state.form.placa}
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
                  value={this.state.form.marca}
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
                  value={this.state.form.modelo}
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
                  name="detalle"
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
