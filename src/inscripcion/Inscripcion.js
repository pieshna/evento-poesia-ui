import {React, Component} from 'react';
import {Link} from 'react-router-dom';

class Inscripcion extends Component {
    constructor(){
        super();
        this.state = {
            "carnet": "",
            "nombre": "",
            "direccion": "",
            "fechaNacimiento": Date,
            "genero": "",
            "telefono": "",
            "carrera": "",
            "generoPoesia": "",
        }
    }

    render(){
        const handleSubmit= (e) => {
            e.preventDefault();
            fetch(`${process.env.REACT_APP_API_URL}/estudiante`, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Estudiante registrado");
            })
            .catch(err => console.error(err));
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
            if(respuesta===""&&carnet.length===6){
                this.setState({carnet: carnet})
            }else{
                this.setState({carnet: ""})
            }
                return respuesta
        }

        const validarFecha=(fecha)=>{
            let respuesta = ""
            let fechaActual = new Date();
            let fechaNacimiento = new Date(fecha);
            let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
            if(mes<0 || (mes===0 && fechaActual.getDate()<=fechaNacimiento.getDate())){
                edad--;
            }
            if(edad<18){
                respuesta = "Debe ser mayor de edad"
            }
            console.log(respuesta);
            if(respuesta===""&&edad>=18){
                this.setState({fechaNacimiento: fecha})
            }else{
                this.setState({fechaNacimiento: ""})
            }
            return respuesta
        }

        return(
            <>
                <form onSubmit={ handleSubmit }>
                    <input type="text" placeholder="Carnet" onChange={ (e) => validarCarnet(e.target.value) }/>
                    <input type="text" placeholder="Nombre" onChange={ (e) => this.setState({nombre: e.target.value}) }/>
                    <input type="text" placeholder="Direccion" onChange={ (e) => this.setState({direccion: e.target.value}) }/>
                    <input type="date" placeholder="Fecha de Nacimiento" onChange={ (e) => validarFecha(e.target.value) }/>
                    <input type="text" placeholder="Genero" onChange={ (e) => this.setState({genero: e.target.value}) }/>
                    <input type="text" placeholder="Telefono" onChange={ (e) => this.setState({telefono: e.target.value}) }/>
                    <input type="text" placeholder="Carrera" onChange={ (e) => this.setState({carrera: e.target.value}) }/>
                    <select onChange={ (e) => this.setState({generoPoesia: e.target.value}) }>
                        <option value="0" >Seleccione un genero</option>
                        <option value="lirica">Lirica</option>
                        <option value="epica">Epica</option>
                        <option value="dramatica">Dramatica</option>
                    </select>
                    <button type="submit">Enviar</button>
                </form>
                <p>Ya te inscribiste y quieres participar en otro genero? <Link to="/inscripcion">Haz click aca</Link></p>
                
            </>
        );
    }


}

export default Inscripcion;