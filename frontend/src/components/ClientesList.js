import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CrearCliente extends Component {
  state = {
    clientes: [],
    form: {
      id: "",
      nombre: "",
      contacto: "",
    },
  };

  async componentDidMount() {
    this.getClientes();
  }

  getClientes = async () => {
    const res = await axios.get(`http://localhost:4000/api/clientes`);
    this.setState({ clientes: res.data });
    console.log("get", this.state.clientes);
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
    console.log("send", this.state.form);
    const res = await axios.post("http://localhost:4000/api/clientes", {
      form: this.state.form,
    });
    this.setState({
      form: {
        id: "",
        nombre: "",
        contacto: "",
      },
    });
    this.getClientes();
  };

  render() {
    return (
      <div className="row p-4">
        <div className="col-md-5">
          <div className="mx-auto">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Información del Cliente</h4>
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
                      Identificador
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleChange}
                        name="id"
                        value={this.state.form.id}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label form-control-label">
                      Nombre
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        name="nombre"
                        onChange={this.handleChange}
                        value={this.state.form.nombre}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label form-control-label">
                      Número de Contacto
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        name="contacto"
                        onChange={this.handleChange}
                        value={this.state.form.contacto}
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
            <caption>Lista de Clientes</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.clientes.length > 0 ? (
                this.state.clientes.map((cliente) => {
                  return (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.contacto}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/autos",
                            autoProps: {
                              id: cliente.id,
                              nombre: cliente.nombre,
                            },
                          }}
                        >
                          Ver Autos
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
