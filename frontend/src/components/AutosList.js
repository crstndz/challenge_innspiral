import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AutosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autos: [],
      id: this.props.location.autoProps.id,
      nombre: this.props.location.autoProps.nombre,
      form: {
        placa: "",
        marca: "",
        modelo: "",
        cliente: this.props.location.autoProps.id,
      },
    };
  }

  async componentDidMount() {
    this.getAutosxCliente();
  }

  getAutosxCliente = async () => {
    const res = await axios.get(
      `https://challenge-innspiral.herokuapp.com/api/clientes/${this.state.id}/autos`
    );
    this.setState({ autos: res.data });
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
    const res = await axios.post(
      `https://challenge-innspiral.herokuapp.com/api/clientes/${this.state.id}/autos`,
      {
        form: this.state.form,
      }
    );
    this.setState({
      form: {
        placa: "",
        marca: "",
        modelo: "",
        cliente: this.props.location.autoProps.id,
      },
    });
    this.getAutosxCliente();
  };

  render() {
    return (
      <div className="row p-4">
        <div className="col-md-5">
          <div className="mx-auto">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Información del Auto</h4>
              </div>
              <div className="card-body">
                <form
                  className="form"
                  role="form"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label form-control-label">
                      Cliente
                    </label>
                    <div className="col-lg-8">
                      <label className="col-form-label form-control-label">
                        {this.state.nombre}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label form-control-label">
                      Placa Patente
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleChange}
                        name="placa"
                        value={this.state.form.placa}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label form-control-label">
                      Marca{" "}
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        name="marca"
                        onChange={this.handleChange}
                        value={this.state.form.marca}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label form-control-label">
                      Modelo
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        name="modelo"
                        onChange={this.handleChange}
                        value={this.state.form.modelo}
                      />
                    </div>
                  </div>
                  <div className="form-group row ml-auto">
                    <label className="col-lg-4 col-form-label form-control-label"></label>
                    <div className="col-lg-8">
                      <button type="submit" className="btn btn-primary">
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <table className="table table-sm">
            <caption>Lista de Autos por Cliente</caption>
            <thead>
              <tr>
                <th>Placa Patente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.autos.length > 0 ? (
                this.state.autos.map((auto) => {
                  return (
                    <tr key={auto.placa}>
                      <td>{auto.placa}</td>
                      <td>{auto.marca}</td>
                      <td>{auto.modelo}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/",
                            autoProps: {
                              placa: auto.placa,
                            },
                          }}
                        >
                          Ver Reparaciones
                        </Link>
                      </td>
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
      </div>
    );
  }
}
