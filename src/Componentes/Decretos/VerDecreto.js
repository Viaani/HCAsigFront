import React,{ useState } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//react bootstrap
import { Card, Button, Accordion, Table, ButtonGroup, Modal , Row, Col } from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { EliminarDecretoAction } from '../../Redux/Acciones/DecretosAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
import FormAsignatura from '../Asignaturas/FormAsignatura';
import ListaAsignaturas from '../Asignaturas/ListaAsignaturas';
import FormDecreto from './FormDecreto';

const VerDecreto = ({decretoProp, indexDecreto}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    //---------------Funciones---------------
    const eliminarDecreto = (numero) =>{
        clienteAxios.delete(`/api/decreto/${numero}`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            console.log(respuesta);
            dispatch(EliminarDecretoAction(numero));
            dispatch(alertaAction({mensaje:"Exito al eliminar Decreto", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Decreto", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const ModalFormDecreto = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Decreto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormDecreto
                    decretoProp = { decretoProp }
                    editar = {true}
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
    }
    const ModalFormDecretoAdd = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Asignatura
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAsignatura
                    asignaturaProp = { {
                        codigo:'',
                        nombre:'',
                        creditos:'',
                        numeroDecreto:decretoProp.numero
                    }}
                    editar = {false}
                    indexFormAsignatura = { indexDecreto }
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
    }
    //---------------Retorno---------------
    return (    
        <React.Fragment>
            <Card>
                <Card.Header as ={Row}>
                    <Col>
                        <Accordion.Toggle as = {Table} eventKey={indexDecreto} striped bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Numero</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{indexDecreto+1}</td>
                                    <td>{decretoProp.numero}</td>
                                    <td>{decretoProp.fecha}</td>
                                </tr>
                            </tbody>
                        </Accordion.Toggle>
                    </Col>
                    <Col xs = {1}>
                        <ButtonGroup vertical>
                            <Button title="Agregar Asignatura" onClick={ ()=>{setModalShow2(true)} } bsPrefix="btn colorBH"><i className="far fa-plus-square"></i></Button>
                            <Button title="Editar Decreto" onClick={() => {setModalShow(true)}} bsPrefix="btn colorBH"><i className="fas fa-edit"></i></Button>
                            <Button title="Eliminar Decreto" onClick={()=>{eliminarDecreto(decretoProp.numero)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                        </ButtonGroup>
                    </Col>
                </Card.Header>
                <Accordion.Collapse eventKey={indexDecreto}>
                    <Card.Body>
                        <ListaAsignaturas
                            indexListaAsignatura = {indexDecreto+"1"}
                            listaAsignaturas = { decretoProp.asignaturas }
                            soloMostrar = { false }
                        />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <ModalFormDecreto
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ModalFormDecretoAdd
                show={modalShow2}
                onHide={() => setModalShow2(false)}
            />
        </React.Fragment>
     );
}
 
export default VerDecreto;