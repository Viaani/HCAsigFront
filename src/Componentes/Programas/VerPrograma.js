import React,{ useState } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Bootstrap
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { EliminarProgramaAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction }from '../../Redux/Acciones/GeneralAction';
import FormPrograma from './FormPrograma';
//Componentes


const VerPrograma = ({ programa }) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [modalShow, setModalShow] = useState(false);
    //---------------Funciones---------------
    const eliminarPrograma = (codigo) =>{
        clienteAxios.delete(`/api/programa/${codigo}`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            dispatch(EliminarProgramaAction(codigo));
            dispatch(alertaAction({ mensaje:"Exito al eliminar Programa", segundos: 2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Programa", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const ModalFormPrograma = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Programa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPrograma
                    programaProp = { programa }
                    editar = {true}
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
                <td>{ programa.nombre }</td>
                <td>{ programa.codigo }</td>
                <td>{ programa.numero_Decreto }</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button bsPrefix="btn colorBH" onClick={() => {setModalShow(true)}} variant="secondary"><i className="fas fa-edit"></i></Button>
                        <Button onClick={()=>{eliminarPrograma(programa.codigo)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
            <ModalFormPrograma
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </React.Fragment>
     );
}
 
export default VerPrograma;