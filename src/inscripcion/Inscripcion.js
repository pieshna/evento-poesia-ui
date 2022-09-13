import { React, Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { styleInput, styleLabel } from "../Styles/Styles";

class Inscripcion extends Component {
  constructor() {
    super();
    this.state = {
      carnet: "",
      nombre: "",
      direccion: "",
      fechaNacimiento: Date,
      genero: "",
      telefono: "",
      carrera: "",
      generoPoesia: "",
    };
  }

  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_API_URL}/estudiante`, {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("Estudiante registrado");
          <Navigate to="/" />;
        })
        .catch((err) => console.error(err));
    };

    const validarCarnet = (carnet) => {
      let respuesta = "";
      for (let i = 0; i < carnet.length; i++) {
        if (carnet[i] === "0") {
          respuesta = "El carnet no debe llevar ceros";
          break;
        }
        if (carnet[0] !== "A") {
          respuesta = "El carnet debe empezar con A";
          break;
        }
        if (carnet.length >= 3 && carnet[2] !== "5") {
          respuesta = "El carnet debe tener 5 en la tercera posicion";
          break;
        }
        if (
          carnet.length === 6 &&
          carnet[5] !== "1" &&
          carnet[5] !== "3" &&
          carnet[5] !== "9"
        ) {
          respuesta = "El carnet debe tener 1,3 o 9 en la sexta posicion";
          break;
        }
        if (carnet.length > 6) {
          respuesta = "El carnet debe tener 6 caracteres";
          break;
        }
      }
      //console.log(respuesta);
      if (respuesta === "" && carnet.length === 6) {
        this.setState({ carnet: carnet });
      } else {
        this.setState({ carnet: "" });
      }
      return respuesta;
    };

    const validarFecha = (fecha) => {
      let respuesta = "";
      let fechaActual = new Date();
      let fechaNacimiento = new Date(fecha);
      let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
      if (
        mes < 0 ||
        (mes === 0 && fechaActual.getDate() <= fechaNacimiento.getDate())
      ) {
        edad--;
      }
      if (edad < 18) {
        respuesta = "Debe ser mayor de edad";
      }
      //console.log(respuesta);
      if (respuesta === "" && edad >= 18) {
        this.setState({ fechaNacimiento: fecha });
      } else {
        this.setState({ fechaNacimiento: "" });
      }
      return respuesta;
    };

    const styleInputError = (e, state) => {
      if (state === "") {
        e.target.className = styleInput + "border-red-500";
      } else {
        e.target.className = styleInput;
      }
    };

    return (
      <div className="container m-auto max-w-4xl p-4 bg-CoolGray shadow-md flex flex-col rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="col-auto m-5">
              <span className={styleLabel}>Carnet</span>
              <input
                className={styleInput}
                type="text"
                placeholder="Ingrese su Carnet"
                onChange={(e) => validarCarnet(e.target.value)}
                onBlur={(e) => {
                  styleInputError(e, this.state.carnet);
                }}
              />
            </div>
            <div className="col-auto m-5">
              <span className={styleLabel}>Nombre</span>
              <input
                className={styleInput}
                type="text"
                placeholder="Nombre"
                onChange={(e) => this.setState({ nombre: e.target.value })}
                onBlur={(e) => {
                  styleInputError(e, this.state.nombre);
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="col-auto m-5">
              <span className={styleLabel}>Direccion</span>
              <input
                className={styleInput}
                type="text"
                placeholder="Direccion"
                onChange={(e) => this.setState({ direccion: e.target.value })}
                onBlur={(e) => {
                  styleInputError(e, this.state.direccion);
                }}
              />
            </div>
            <div className="col-auto m-5">
              <span className={styleLabel}>Fecha de Nacimiento</span>
              <input
                className={styleInput}
                type="date"
                placeholder="Fecha de Nacimiento"
                onChange={(e) => validarFecha(e.target.value)}
                onBlur={(e) => {
                  styleInputError(e, this.state.fechaNacimiento);
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="col-auto m-5">
              <span className={styleLabel}>Genero</span>
              <input
                className={styleInput}
                type="text"
                placeholder="Genero"
                onChange={(e) => this.setState({ genero: e.target.value })}
                onBlur={(e) => {
                  styleInputError(e, this.state.genero);
                }}
              />
            </div>
            <div className="col-auto m-5">
              <span className={styleLabel}>Telefono</span>
              <input
                className={styleInput}
                type="text"
                placeholder="Telefono"
                onChange={(e) => this.setState({ telefono: e.target.value })}
                onBlur={(e) => {
                  styleInputError(e, this.state.telefono);
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="col-auto m-5">
              <span className={styleLabel}>Carrera</span>
              <input
                className={styleInput}
                type="text"
                placeholder="Carrera"
                onChange={(e) => this.setState({ carrera: e.target.value })}
                onBlur={(e) => {
                  styleInputError(e, this.state.carrera);
                }}
              />
            </div>
            <div className="col-auto m-5">
              <span className={styleLabel}>Genero de la Poesia</span>
              <select
                defaultValue={"0"}
                className={styleInput}
                onChange={(e) =>
                  this.setState({ generoPoesia: e.target.value })
                }
              >
                <option value="0" disabled>
                  Seleccione un genero
                </option>
                <option value="lirica">Lirica</option>
                <option value="epica">Epica</option>
                <option value="dramatica">Dramatica</option>
              </select>
            </div>
          </div>
          <div className="grid content-center">
            <button
              className="border border-gray-900 p-2 rounded-lg hover:bg-Ebony hover:text-white m-5"
              type="submit"
            >
              ✔️ Guardar
            </button>
          </div>
        </form>
        <p className="text-center pb-2">
          ¿Ya te inscribiste y quieres participar en otro genero?{" "}
          <Link className="text-gray-800" to="/inscripcion">
            {" "}
            ➡️ Haz click aca ⬅️
          </Link>
        </p>
      </div>
    );
  }
}

export default Inscripcion;
