import React,{ useState } from 'react';
//react Bootstrap
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { EliminarAsignaturaExternaAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
import FormAsignaturaExterna from './FormAsignaturaExterna';

const VerAsignaturaExterna = ({indexVerAsignaturaExterna, indexSolo, asignaturaExterna}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    
    //---------------Funciones---------------
    const obtenerProgramaAcademico = (codigo) =>{
        // window.open(`https://localhost:44387/api/Asignatura/DescargarProgramaAcademico/${codigo}`,'_blank')
        clienteAxios.get(`/api/Asignatura/DescargarProgramaAcademico/${codigo}`,{
            headers: {
                'Authorization': token
              },
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(respuesta =>{
            //Create a Blob from the PDF Stream
                const file = new Blob(
                [respuesta.data], 
                {type: 'application/pdf'});
            //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
                window.open(fileURL);
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({ mensaje:"Error al Obtener Programa Academico", segundos: 4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const eliminarAsignatura = (codigo) =>{
        clienteAxios.delete(`/api/Asignatura/${codigo}`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            dispatch(EliminarAsignaturaExternaAction( asignaturaExterna.codigo_ProgramaExterno ,codigo));
            dispatch(alertaAction({ mensaje:"Exito al eliminar Asignatura", segundos: 2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({ mensaje:"Error al eliminar Asignatura", segundos: 4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const ModalFormAsignaturaExterna = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Asignatura Externa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAsignaturaExterna
                    asignaturaExternaProp = { asignaturaExterna }
                    indexFormAsignaturaExterna = {indexVerAsignaturaExterna+"1"}
                    editar = { true }
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
            <tr>
                <td>{indexSolo+1}</td>
                <td>{asignaturaExterna.nombre}</td>
                <td>{asignaturaExterna.codigo}</td>
                <td>{asignaturaExterna.creditos}</td>
                <td>
                    <ButtonGroup>
                        <Button bsPrefix="btn colorBH" title="Ver Programa Académico de Asignatura Externa" onClick={()=>{obtenerProgramaAcademico(asignaturaExterna.codigo)}}><i className="fas fa-file-pdf"></i></Button>
                        <Button bsPrefix="btn colorBH" title="Editar Asignatura Externa" onClick={() => {setModalShow(true)}}><i className="fas fa-edit"></i></Button>
                        <Button title="Eliminar Asignatura Externa" onClick={()=>{eliminarAsignatura(asignaturaExterna.codigo)}} variant = "danger"><i className="fas fa-trash-alt"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
            <ModalFormAsignaturaExterna
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </React.Fragment>
    );
}
 
export default VerAsignaturaExterna;