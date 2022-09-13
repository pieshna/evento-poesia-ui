import { React, useState } from "react";
import { Link } from "react-router-dom";
import { styleInput, styleLabel } from "../Styles/Styles";

export default function Nueva() {
  const [datos, setDatos] = useState({
    carnet: "",
    generoPoesia: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    if (
      datos.carnet !== "" &&
      datos.generoPoesia !== "" &&
      datos.carnet.length === 6
    ) {
      alert("Datos enviados");
       fetch(`${process.env.REACT_APP_API_URL}/inscripcion`, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("Inscripcion registrada");
        })
        .catch((err) => console.error(err)); 
    }
    //console.log(datos);
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

    //console.log(carnet);
    return respuesta;
  };
  const styleInputError = (e) => {
    if (
      datos.carnet !== "" &&
      datos.carnet.length === 6) {
        e.target.className = styleInput;
      } else {
      e.target.className = styleInput + "border-red-500";
    }
  };

  return (
    <div className="container m-auto max-w-4 p-4 bg-CoolGray shadow-md flex flex-col rounded-md">
      <form onSubmit={enviarDatos}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="col-auto m-5">
            <label className={styleLabel} htmlFor="carnet">
              Carnet
            </label>
            <input
              type="text"
              className={styleInput}
              placeholder="Carnet"
              name="carnet"
              onChange={(e) => {
                if (validarCarnet(e.target.value) === "") {
                  handleInputChange(e);
                } else {
                  alert(validarCarnet(e.target.value));
                }
              }}
              onBlur={(e) => {
                styleInputError(e);
              }}
            />
          </div>
          <div className="col-auto m-5">
            <label className={styleLabel} htmlFor="generoPoesia">
              Genero de poesia
            </label>
            <select
              defaultValue={"0"}
              className={styleInput}
              name="generoPoesia"
              onChange={handleInputChange}
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
        <div className="flex p-5">
          <button className="mr-auto">
            <Link className=" mt-1 border border-gray-900 rounded-md p-2 hover:bg-Ebony hover:text-white" to="/">Volver</Link>
          </button>
          <div className="ml-auto">
            <button className=" border border-gray-900 rounded-md p-2 hover:bg-Ebony hover:text-white" type="submit">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
