import React,{ useState } from 'react';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap' // grid
import { Tabs, Tab } from "react-bootstrap" // tabs
import { Table } from 'react-bootstrap' // table
//Componentes
import ListaDestinatarios from '../Solicitud/ListaDestinatario';
import FromDestinatario from '../Solicitud/FromDestinatario';


import { useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { ObtenerDestinatariosAction } from '../../Redux/Acciones/DestinatariosAction';
import { alertaAction }from '../../Redux/Acciones/GeneralAction';

const Destinatarios = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)


    const [key, setKey] = useState('ListaDestinatarios');
    //---------------Funciones---------------
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
    const obtenerDatos = () =>{
        obtenerDestinatarios()
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
                    <h4>Destinatarios disponibles al enviar Documento de Homologaciones y Convalidaciones</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs className="tabColor" activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="ListaDestinatarios" title="Lista Destinatarios">
                            <Table striped borderless responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Tipo Usuario</th>
                                        <th>Area</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ListaDestinatarios/>
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="AgregarDestinatario" title="Agregar Destinatario">
                            <FromDestinatario 
                                editar = {false} 
                                destinatarioProp={
                                    {
                                        nombre: '',
                                        apellido:'',
                                        email:'',
                                        tipoUsuario:'',
                                        area:'' 
                                    }
                                }
                            />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
     );
}
 
export default Destinatarios;