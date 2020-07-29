import React,{ useState, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { ObtenerUsuariosAction, DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction }from '../../Redux/Acciones/GeneralAction';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap' // grid
import { Tabs, Tab } from "react-bootstrap" // tabs
//Componentes
// import Boton from '../General/Boton';
import ListaUsuarios from '../Usuarios/ListaUsuarios';
import FormUsuarios from '../Usuarios/FormUsuarios';

const Usuarios = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [key, setKey] = useState('ListaUsuarios');
    //---------------Funciones---------------
    // const verPagina = (pagina) => {
    //     switch(pagina){
    //         case 'ListaUsuarios':
    //             return <ListaUsuarios/>
    //         case 'FormUsuarios':
    //             return <FormUsuarios editar = {false}/>
    //         default:
    //             return null;
    //     }
    // }
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
        obtenerUsuarios()
    }
    // useEffect
    useEffect(()=>{
        obtenerDatos()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    //---------------Retorno---------------
    return ( 
        <Container fluid="md">
            <Row>
                <Col>
                    <h4>Administrar Usuarios</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs className="tabColor" activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="ListaUsuarios" title="Lista Usuarios">
                            <ListaUsuarios/>
                        </Tab>
                        <Tab eventKey="FormUsuario" title="Agregar Usuario">
                            <FormUsuarios editar = {false}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
     );
}
 
export default Usuarios;