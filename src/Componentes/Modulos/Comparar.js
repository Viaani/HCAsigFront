import React,{ useState, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap' // grid
import { Tabs, Tab } from "react-bootstrap" // tabs
//React-Redux
import { useDispatch, useSelector } from 'react-redux';
import { ObtenerDecretosAction } from '../../Redux/Acciones/DecretosAction';
import { ObtenerDestinatariosAction } from '../../Redux/Acciones/DestinatariosAction';
import { ObtenerProgramasAction, ObtenerProgramasExternosAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { obtenerConvalidacionesAction } from '../../Redux/Acciones/ConvalidacionAction';
import { obtenerHomologacionesAction } from '../../Redux/Acciones/HomologacionAction';
import { ObtenerUsuariosAction } from './../../Redux/Acciones/UsuariosAction'
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
// import Boton from '../General/Boton';
import Convalidar from '../Comparar/Convalidar';
import Homologar from '../Comparar/Homologar';
import ListaConvalidaciones from '../Comparar/ListaConvalidaciones';
import ListaHomologaciones from '../Comparar/ListaHomologaciones'

const Comparar = () => {
    //---------------Atributos---------------
    // const [pagina, setPagina] = useState("Homologar");
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [key, setKey] = useState('Homologar');
    //---------------Funciones---------------
    const obtenerProgramas = () =>{
        clienteAxios.get('api/Programa',{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerProgramasAction(respuesta.data));     
        })
        .catch(error=>{
            console.log(error)
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Programas", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerProgramasExternos = () =>{
        clienteAxios.get('api/ProgramaExterno',{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerProgramasExternosAction(respuesta.data));     
        })
        .catch(error=>{
            console.log(error)
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Programas Externos", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerDestinatarios = () =>{
        clienteAxios.get('api/Destinatario/',{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerDestinatariosAction(respuesta.data));
        })
        .catch(error=>{
            console.log(error)
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({mensaje:"Error al obtener Destinatarios", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerHomologaciones = () =>{
        clienteAxios.get(`/api/Homologacion/`,{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta =>{
            dispatch(obtenerHomologacionesAction(respuesta.data))
            console.log(respuesta.data);
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Homologaciones", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerConvalidaciones = () =>{
        clienteAxios.get(`/api/Convalidacion/`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            dispatch(obtenerConvalidacionesAction(respuesta.data))
            console.log(respuesta.data);
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Convalidaciones", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerDecretos = () =>{
        clienteAxios.get('api/Decreto',{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerDecretosAction(respuesta.data));   
        })
        .catch(error=>{
            console.log(error)
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Decretos", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerUsuarios = () =>{
        clienteAxios.get('api/Usuario/',{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerUsuariosAction(respuesta.data));
        })
        .catch(error=>{
            console.log(error)
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({mensaje:"Error al obtener Usuarios", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const obtenerDatos = () =>{
        obtenerProgramas()
        obtenerProgramasExternos()
        obtenerDestinatarios()
        obtenerHomologaciones()
        obtenerConvalidaciones()
        obtenerDecretos()
        obtenerUsuarios()
    }
    useEffect(()=>{
        obtenerDatos()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    //---------------Retorno---------------
    return ( 
        <Container fluid="md">
            <Row>
                <Col>
                    <h4>Comparar dos Programas</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs className="tabColor" unmountOnExit={true} activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="Homologar" title="Convalidar">
                            <Homologar/>
                        </Tab>
                        <Tab eventKey="Convalidar" title="Homologar">
                            <Convalidar/>
                        </Tab>
                        <Tab eventKey="ListaConvalidaciones" title="Lista Homologaciones">
                            <ListaConvalidaciones/>
                        </Tab>
                        <Tab eventKey="ListaHomologaciones" title="Lista Convalidaciones">
                            <ListaHomologaciones/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
     );
}
export default Comparar;