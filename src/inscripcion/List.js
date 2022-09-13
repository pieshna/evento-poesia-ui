const { React, Component, useState, useEffect } = require("react");
const { Link } = require("react-router-dom");

class List extends Component {
  constructor() {
    super();
    this.state = {
      estudiante: [],
      inscripciones: [],
    };
  }

  componentDidMount() {
    //console.log(`${process.env.REACT_APP_API_URL}/estudiante`);
    fetch(`${process.env.REACT_APP_API_URL}/estudiante`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ estudiante: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="m-auto container max-w-7xl p-4 bg-CoolGray shadow-md flex flex-col rounded-md">
        <h1 className="text-center text-lg font-bold">Lista de Estudiantes</h1>
        <div className="grid grid-cols-3">
          {this.state.estudiante.map((estudiante, index) => (
            <div
              className={`border border-white p-4 m-4 col-auto `}
              key={estudiante.carnet}
            >
              <Mostrar estudiante={estudiante} />
            </div>
          ))}
        </div>
        <button className="mr-auto">
            <Link className=" border border-gray-900 rounded-md p-2 hover:bg-Ebony hover:text-white" to="/">Volver</Link>
          </button>
      </div>
    );
  }
}


const Mostrar = ({ estudiante }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 md:gap-6 m-2">
        <div className="col-auto">
          <p>Carnet: {estudiante.carnet}</p>
        </div>
        <div className="col-auto">
          <p>Nombre: {estudiante.nombre}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 m-2 ">
        <div className="col-auto mt-3">
          <p>Direccion: {estudiante.direccion}</p>
        </div>
        <div className="col-auto">
          <p>Fecha de Nacimiento: {mostrarFecha(estudiante.fechaNacimiento)}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 m-2">
        <div className="col-auto">
          <p>Genero: {estudiante.genero}</p>
        </div>
        <div className="col-auto">
          <p>Telefono: {estudiante.telefono}</p>
        </div>
      </div>
      <p className="text-center m-2">Carrera: {estudiante.carrera}</p>
      <div>
        <h1 className="text-center font-semibold">Poesias Inscritas</h1>
      <table className="table-auto m-auto">
        <thead>
          <tr>
            <th className="border border-white p-2">Genero</th>
            <th className="border border-white p-2">Inscripcion</th>
            <th className="border border-white p-2">Participa</th>
          </tr>
        </thead>
        <tbody>
          <Hijo data={estudiante.carnet} />
        </tbody>
      </table>
      </div>
    </>
  );
};

const Hijo = ({ data }) => {
  const [genero, setGenero] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/inscripcion/${data}`)
      .then((res) => res.json())
      .then((data) => {
        setGenero(data);
      })
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <>
      {genero.map((genero, index) => (
        <tr key={index}>
          <td className="border border-white p-2">{genero.generoPoesia}</td>
          <td className="border border-white p-2">{mostrarFecha(genero.fechaInscripcion)}</td>
          <td className="border border-white p-2">{mostrarFecha(genero.fechaAParticipar)}</td>
        </tr>
      ))}
    </>
  );
};
const mostrarFecha = (fecha) => {
  const fechaDate = fecha.split("T")[0];
  const fechaSplit = fechaDate.split("-");
  return fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0];
};

export default List;
