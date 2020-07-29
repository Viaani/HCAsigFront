import React,{ useEffect } from 'react';
//Redux
import { abrirMenuAction, idModuloAction, cambiarTituloAction } from '../../Redux/Acciones/GeneralAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
import { useDispatch, useSelector } from 'react-redux';
// import {Image} from 'react-bootstrap';
//Componentes
import Boton from '../General/Boton';



const NavBar = () => {
    //---------------Atributos---------------
    //store
    const idsModulos = useSelector((state)=> state.generalStore.modulos);
    const menuAbrir = useSelector((state)=> state.generalStore.menuAbrir);
    const tituloPagina = useSelector((state)=> state.generalStore.tituloPagina);
    const usuario =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado)
    //Acciones
    const dispatch = useDispatch();

    //---------------Funciones---------------

    const cerrarSesion = () => {
        dispatch(DataUsuarioConectadoAction({}))
        dispatch(alertaAction({mensaje:"Sesión Cerrada", segundos:2}))
        dispatch(UsuarioConectadoAction(false))
    }
    //useEffect
    useEffect(()=>{

    },[tituloPagina, menuAbrir]);

    //---------------Retorno---------------
    return ( 
        <div className="w3-bar colorB">
            <Boton 
                estilo = "BotonSidebarOpen colorBH"
                funcion = {()=>{dispatch(abrirMenuAction(!menuAbrir))}}
                texto = ""
                icono = "fas fa-bars"
            />
            {/* <Image className="w3-left padding10" src={require("../../img/cropped-LOGO-NUEVO-2.png")} fluid rounded/> */}
            
            <div className={menuAbrir? "tituloPagina tituloPaginaAbierto w3-left":"tituloPagina w3-left"}> {tituloPagina} </div>

            
            <Boton
                estilo="BotonCerrarSesion colorBH"
                texto="Cerrar sesión"
                funcion = {()=>{cerrarSesion()}}
            />
            <Boton
                estilo="BotonConfigUsuario colorBH"
                icono={"fas fa-user"}
                funcion = {()=>{dispatch(idModuloAction(idsModulos.editarUsuario));dispatch(cambiarTituloAction("Editar Usuario"))}}
                title = {"Editar Usuario"}
            />
            <div className="nombreUsuario">{usuario.nombre+" "+usuario.apellido}</div>
            <div className="clearboth"/>
        </div>
     );
}
 
export default NavBar;