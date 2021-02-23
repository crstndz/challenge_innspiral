import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default class ReparacionesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reparaciones: [],
      placa: "",
      cliente: {},
    };
  }

  async componentDidMount() {
    if (this.props.location.autoProps != undefined) {
      const placa = this.props.location.autoProps.placa;
      const res = await axios.get(`/api/reparaciones/auto/${placa}`);
      this.setState({ reparaciones: res.data, placa });
      this.getCliente();
    } else {
      const res = await axios.get(`/api/reparaciones/autos`);
      this.setState({ reparaciones: res.data });
    }
  }

  getCliente = async () => {
    const id = this.props.location.autoProps.cliente;
    const res = await axios.get(`/api/clientes/${id}`);
    this.setState({ cliente: res.data[0] });
  };

  render() {
    return (
      <>
        <div className="row p-4">
          <table className="table table-sm">
            <caption>Lista de Reparaciones</caption>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Responsable</th>
                <th>Fecha</th>
                <th>Nombre Cliente</th>
                <th>Placa Auto</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reparaciones.length > 0 ? (
                this.state.reparaciones.map((reparacion) => {
                  return (
                    <tr key={reparacion._id}>
                      <td>{reparacion._id}</td>
                      <td>{reparacion.responsable}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">{reparacion.fecha}</Moment>
                      </td>
                      <td>{this.state.cliente.nombre}</td>
                      <td>{reparacion.placa}</td>
                      <td>{reparacion.detalle}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No hay datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="row">
          <Link
            to={{
              pathname: "/nuevareparacion",
              autoProps: {
                placa: this.state.placa,
                cliente: this.state.cliente.id,
              },
            }}
            className="btn btn-primary"
          >
            Nueva Reparación
          </Link>
        </div>
      </>
    );
  }
}
