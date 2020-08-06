import React,{ useState } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//react bootstrap
import { Card, Button, Accordion, Table, ButtonGroup, Modal , Row, Col } from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { EliminarProgramaExternoAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
import FormAsignaturaExterna from '../AsignaturasExternas/FormAsignaturaExterna';
import ListaAsignaturasExternas from '../AsignaturasExternas/ListaAsignaturasExternas';
import FormProgramaExterno from './FormProgramasExternos';

const VerProgramaExterno = ({indexVerProgramaExterno, programaExternoProp}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    //---------------Funciones---------------
    const eliminarProgramaExterno = (codigo) =>{
        clienteAxios.delete(`/api/ProgramaExterno/${codigo}`,{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta =>{
            dispatch(EliminarProgramaExternoAction(codigo));
            dispatch(alertaAction({mensaje:"Exito al eliminar Programa Externo", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Programa Externo", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const ModalFormProgramaExterno = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Programa Externo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormProgramaExterno
                    programaExternoProp = { programaExternoProp }
                    editar = {true}
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
    }
    const ModalFormProgramaExternoAdd = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Asignatura Externa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAsignaturaExterna
                    asignaturaExternaProp = { {
                        codigo:'',
                        nombre:'',
                        creditos:'',
                        codigo_ProgramaExterno:programaExternoProp.codigo
                    }}
                    editar = {false}
                    indexFormAsignaturaExterna = { indexVerProgramaExterno }
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
                        <Accordion.Toggle as = {Table} eventKey={indexVerProgramaExterno} striped bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Universidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{indexVerProgramaExterno+1}</td>
                                    <td>{programaExternoProp.codigo}</td>
                                    <td>{programaExternoProp.nombre}</td>
                                    <td>{programaExternoProp.universidad}</td>
                                </tr>
                            </tbody>
                        </Accordion.Toggle>
                    </Col>
                    <Col xs = {1}>
                        <ButtonGroup vertical>
                            <Button bsPrefix="btn colorBH" title="Agregar Asignatura Externa" onClick={ ()=>{setModalShow2(true)} }><i className="far fa-plus-square"></i></Button>
                            <Button bsPrefix="btn colorBH" title="Editar Programa Externo" onClick={() => {setModalShow(true)}}><i className="fas fa-edit"></i></Button>
                            <Button title="Eliminar Programa Externo" onClick={()=>{eliminarProgramaExterno(programaExternoProp.codigo)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                        </ButtonGroup>
                    </Col>
                </Card.Header>
                <Accordion.Collapse eventKey={indexVerProgramaExterno}>
                    <Card.Body>
                        <ListaAsignaturasExternas
                            indexListaAsignaturaExterna = {indexVerProgramaExterno+"1"}
                            listaAsignaturasExternas = { programaExternoProp.asignaturasExternas }
                            soloMostrar = { false }
                        />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <ModalFormProgramaExterno
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ModalFormProgramaExternoAdd
                show={modalShow2}
                onHide={() => setModalShow2(false)}
            />
        </React.Fragment>
     );
}
 
export default VerProgramaExterno;