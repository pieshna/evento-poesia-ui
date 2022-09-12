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
            console.log(this.state);
        }
        return(
            <>
                <form onSubmit={ handleSubmit }>
                    <input type="text" placeholder="Carnet" onChange={ (e) => this.setState({carnet: e.target.value}) }/>
                    <input type="text" placeholder="Nombre" onChange={ (e) => this.setState({nombre: e.target.value}) }/>
                    <input type="text" placeholder="Direccion" onChange={ (e) => this.setState({direccion: e.target.value}) }/>
                    <input type="date" placeholder="Fecha de Nacimiento" onChange={ (e) => this.setState({fechaNacimiento: e.target.value}) }/>
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