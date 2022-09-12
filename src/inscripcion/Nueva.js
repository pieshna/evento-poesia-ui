import {React, useState} from 'react'
import { Link } from 'react-router-dom';

export default function Nueva() {

    const [datos, setDatos] = useState({
        carnet: "",
        generoPoesia: "",
    });

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(datos);
    }

  return (
    <>
        <form onSubmit={enviarDatos}>
            <input type="text" placeholder="Carnet" name="carnet" onChange={handleInputChange}/>
            <select name="generoPoesia" onChange={handleInputChange}>
                <option value="0" >Seleccione un genero</option>
                <option value="lirica">Lirica</option>
                <option value="epica">Epica</option>
                <option value="dramatica">Dramatica</option>
            </select>
            <button type="submit">Enviar</button>
        </form>

        <Link to="/">Volver</Link>
    
    </>
  )
}
