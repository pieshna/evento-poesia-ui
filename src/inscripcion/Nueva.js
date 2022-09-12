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
        if(datos.carnet!=="" && datos.generoPoesia!==""&&datos.carnet.length===6){
            //alert("Datos enviados");
             fetch(`${process.env.REACT_APP_API_URL}/inscripcion`, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Inscripcion registrada");
            }
            )
            .catch(err => console.error(err));
        }
        //console.log(datos);

    }

    const validarCarnet=(carnet)=>{
        let respuesta =""
        for (let i = 0; i < carnet.length; i++) {
            if(carnet[i] === "0"){
                respuesta = "El carnet no debe llebar ceros";
                break
            }
            if(carnet[0]!=="A"){
                respuesta="El carnet debe empezar con A"
                break
            }
            if(carnet.length>=3&&carnet[2]!=="5"){
                respuesta="El carnet debe tener 5 en la tercera posicion"
                break
            }
            if(carnet.length===6&&carnet[5]!=="1"&&carnet[5]!=='3'&&carnet[5]!=='9'){
                respuesta="El carnet debe tener 1,3 o 9 en la sexta posicion"
                break
            }
            if(carnet.length>6){
                respuesta="El carnet debe tener 6 caracteres"
                break
            }
        }
        
        //console.log(respuesta);
            return respuesta
    }

  return (
    <>
        <form onSubmit={enviarDatos}>
            <input type="text" placeholder="Carnet" name="carnet" onChange={ (e)=>{
                if(validarCarnet(e.target.value)===""){
                    handleInputChange(e)
                }else{
                    alert(validarCarnet(e.target.value))
                }
            } }/>
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
