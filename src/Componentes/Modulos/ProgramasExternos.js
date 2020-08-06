import React,{ useState, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { ObtenerProgramasExternosAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap' // grid
import { Tabs, Tab } from "react-bootstrap" // tabs
//Componentes
import ListaProgramasExternos from '../ProgramasExternos/ListaProgramasExternos';
import FormProgramaExterno from '../ProgramasExternos/FormProgramasExternos';

const ProgramasExternos = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [key, setKey] = useState('ListaProgramasExternos');
    //---------------Funciones---------------
    const obtenerProgramasExternos = () =>{
        clienteAxios.get('api/ProgramaExterno',{
            headers: {
                'Authorization': token
                }
        })
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(ObtenerProgramasExternosAction(respuesta.data));            
        })
        .catch(error=>{
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
    const obtenerDatos = () =>{
        obtenerProgramasExternos()
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
                    <h4>Administrar Programas Externos</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs className="tabColor" activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="ListaProgramasExternos" title="Lista Programas Externos">
                            <ListaProgramasExternos/>
                        </Tab>
                        <Tab eventKey="FormProgramaExterno" title="Agregar Programa Externo">
                            <FormProgramaExterno
                                programaExternoProp = {
                                    {
                                        codigo:'',
                                        nombre:'',
                                        universidad:'',
                                        asignaturasExternas:[]
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
 
export default ProgramasExternos;