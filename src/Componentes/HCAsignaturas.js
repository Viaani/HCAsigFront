import React from 'react';
//Rutas
// import {BrowserRouter as Router} from 'react-router-dom';np,
//W3
import '../Styles/W3/w3.css'
//Css
import '../Styles/Css/Alertas.css'
import '../Styles/Css/General.css'
import '../Styles/Css/NavBar.css'
import '../Styles/Css/Menu.css'
import '../Styles/Css/Programas.css'
//Redux
import { useSelector } from 'react-redux';
//Componentes
import NavBar from './Sistema/NavBar';
import Menu from './Sistema/Menu';
import Contenido from './Sistema/Contenido';
import Alerta from './General/Alerta';
import LoginUsuario from './Usuarios/LoginUsuario';

const HCAsignaturas = () => {
    //---------------Atributos---------------
    const usuarioConectado = useSelector((state)=>state.usuariosStore.usuarioConectado)
    
    //---------------Funciones---------------

    //--------------- Retorno ---------------
    return (
        <React.Fragment>
            {
                usuarioConectado?
                    <React.Fragment>
                        <NavBar/>
                        <Menu/>
                        <Contenido/>
                        <Alerta/>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <LoginUsuario/>
                        <Alerta/>
                    </React.Fragment>
            }
            
        </React.Fragment>
     );
}
 
export default HCAsignaturas;