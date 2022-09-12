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
            this.setState({estudiante: data});
        })
        .catch((err) => console.log(err));
  }

  render() {
    return (
        <>
        <h1>Lista de Estudiantes</h1>
        
                {this.state.estudiante.map((estudiante) => (
                    <div key={estudiante.carnet}>
                        <p>{estudiante.carnet}</p>
                        <p>{estudiante.nombre}</p>
                        <p>{estudiante.direccion}</p>
                        <p>{mostrarFecha(estudiante.fechaNacimiento)}</p>
                        <p>{estudiante.genero}</p>
                        <p>{estudiante.telefono}</p>
                        <p>{estudiante.carrera}</p>
                        <Hijo data={estudiante.carnet}/>
                    </div>
                ))}
        <Link to="/">Volver</Link>

        </>
    )
  }
}

const Hijo = ({data}) => {
    const [genero, setGenero] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/inscripcion/${data}`)
            .then((res) => res.json())
            .then((data) => {
                setGenero(data);
            })
            .catch((err) => console.log(err));
    },[data]);
    
    return (
        <>
                {genero.map((genero,index) => (
                    <div key={index}>
                        <p>{genero.generoPoesia}</p>
                        <p>{mostrarFecha(genero.fechaAParticipar)}</p>
                        <p>{mostrarFecha(genero.fechaInscripcion)}</p>
                    </div>
                ))}
        </>
    )
}
const mostrarFecha = (fecha) => {
    const fechaDate=fecha.split("T")[0];
    const fechaSplit=fechaDate.split("-");
    return fechaSplit[2]+"/"+fechaSplit[1]+"/"+fechaSplit[0];
}

export default List;
