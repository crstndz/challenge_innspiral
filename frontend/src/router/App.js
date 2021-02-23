import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation";
import CrearReparacion from "../components/CrearReparacion";
import ReparacionesList from "../components/ReparacionesList";
import ClientesList from "../components/ClientesList";
import AutosList from "../components/AutosList";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />
        <Route path="/" exact component={ReparacionesList} />
        <Route path="/reparaciones" exact component={ReparacionesList} />
        <Route path="/nuevareparacion" exact component={CrearReparacion} />
        <Route path="/clientes" exact component={ClientesList} />
        <Route path="/autos" exact component={AutosList} />
      </div>
    </BrowserRouter>
  );
}

export default App;
