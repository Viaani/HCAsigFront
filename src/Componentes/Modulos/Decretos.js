import React,{ useState, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { ObtenerDecretosAction } from '../../Redux/Acciones/DecretosAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap' // grid
import { Tabs, Tab } from "react-bootstrap" // tabs
//Componentes
import ListaDecretos from '../Decretos/ListaDecretos';
import FormDecreto from '../Decretos/FormDecreto';


const Decretos = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [key, setKey] = useState('ListaDecretos');

    //---------------Funciones---------------
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
    const obtenerDatos = () =>{
        obtenerDecretos()
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
                    <h4>Administrar Decretos</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs className="tabColor" activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="ListaDecretos" title="Lista Decretos">
                            <ListaDecretos/>
                        </Tab>
                        <Tab eventKey="FormDecreto" title="Agregar Decreto">
                            <FormDecreto
                                decretoProp = {
                                    {
                                        numero:'',
                                        fecha:'',
                                        asignaturas:[]
                                    }
                                }
                                editar = {false}
                            />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
     );
}
 
export default Decretos;