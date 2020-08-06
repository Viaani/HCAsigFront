import React,{ useState, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap' // grid
import { Tabs, Tab } from "react-bootstrap" // tabs
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { ObtenerProgramasAction } from '../../Redux/Acciones/ProgramasAction';
import { ObtenerDecretosAction } from '../../Redux/Acciones/DecretosAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction }from '../../Redux/Acciones/GeneralAction';
//Componentes
import ListaProgramas from '../Programas/ListaProgramas';
import FormPrograma from '../Programas/FormPrograma';

const Programas = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [key, setKey] = useState('ListaProgramas');
    //---------------Funciones---------------
    const obtenerProgramas = () =>{
        clienteAxios.get('api/Programa',{
            headers: {
                'Authorization': token
            }
        })
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerProgramasAction(respuesta.data)); 
        })
        .catch(error=>{
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
        obtenerProgramas()
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
                    <h4>Administrar Programas</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs className="tabColor" activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="ListaProgramas" title="Lista Programas">
                            <ListaProgramas/>
                        </Tab>
                        <Tab eventKey="FormPrograma" title="Agregar Programa">
                            <FormPrograma 
                                editar = {false}
                                programaProp = {
                                    {
                                        nombre:'',
                                        codigo:'',
                                        numero_Decreto:''
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
 
export default Programas;