import React,{ useState } from 'react';
//react Bootstrap
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { EliminarAsignaturaAction } from '../../Redux/Acciones/DecretosAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
import FormAsignatura from './FormAsignatura';

const VerAsignatura = ({indexVerAsignatura, asignatura, indexSolo}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    //---------------Funciones---------------
    const eliminarAsignatura = (codigo) =>{
        clienteAxios.delete(`/api/Asignatura/${codigo}`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            console.log(respuesta);
            dispatch(EliminarAsignaturaAction(asignatura.numeroDecreto, codigo));
            dispatch(alertaAction({ mensaje:"Exito al eliminar Asignatura", segundos: 2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
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
    const obtenerProgramaAcademico = (codigo) =>{
        // window.open(`https://localhost:44387/api/Asignatura/DescargarProgramaAcademico/${codigo}`,'_blank')
        clienteAxios.get(`/api/Asignatura/DescargarProgramaAcademico/${codigo}`,{
            headers: {
                'Authorization': token
              },
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(respuesta =>{
            console.log(respuesta);
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
            console.log(error);
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
    const ModalFormAsignatura = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Asignatura
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAsignatura
                    asignaturaProp = { asignatura }
                    indexFormAsignatura = {indexVerAsignatura+"1"}
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
                <td>{asignatura.nombre}</td>
                <td>{asignatura.codigo}</td>
                <td>{asignatura.creditos}</td>
                <td>
                    <ButtonGroup>
                        <Button title="Ver Programa Académico" onClick={()=>{obtenerProgramaAcademico(asignatura.codigo)}} bsPrefix="btn colorBH"><i className="fas fa-file-pdf"></i></Button>
                        <Button title="Editar Asignatura" onClick={() => {setModalShow(true)}} bsPrefix="btn colorBH"><i className="fas fa-edit"></i></Button>
                        <Button title="Eliminar Asignatura" onClick={()=>{eliminarAsignatura(asignatura.codigo)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
            <ModalFormAsignatura
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </React.Fragment>
    );
}
 
export default VerAsignatura;