import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default class ReparacionesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reparaciones: [],
      placa:
        this.props.location.autoProps != undefined
          ? this.props.location.autoProps.placa
          : "",
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `http://localhost:4000/api/reparaciones/auto/${this.state.placa}`
    );
    this.setState({ reparaciones: res.data });
  }

  render() {
    return (
      <>
        <div className="row">
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
                      <td>{reparacion.cliente}</td>
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
          <Link to="/reparaciones" className="btn btn-primary"> Nueva Reparación </Link>
        </div>
      </>
    );
  }
}
