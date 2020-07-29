import React ,{ useState } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { EliminarDestinatarioAction } from '../../Redux/Acciones/DestinatariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Bootstrap
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
//Componentes
import FormDestinatario from './FromDestinatario';

const VerDestinatario = ({indexVerDestinatario, destinatario}) => {
    //---------------Atributos---------------
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    //---------------Funciones---------------
    const eliminarDestinatario = (mail) =>{
        clienteAxios.delete(`/api/Destinatario/${mail}`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            console.log(respuesta);
            dispatch(EliminarDestinatarioAction(mail));
            dispatch(alertaAction({ mensaje:"Exito al eliminar Destinatario", segundos: 2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Destinatario", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
            
        })
    }
    const ModalFormDestinatario = (props)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Destinatario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormDestinatario 
                    destinatarioProp = { destinatario }
                    editar = {true}
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
    }
    return ( 
        <React.Fragment>
            <tr>
                <td>{indexVerDestinatario}</td>
                <td>{destinatario.nombre+" "+destinatario.apellido}</td>
                <td>{destinatario.email}</td>
                <td>{destinatario.tipoUsuario}</td>
                <td>{destinatario.area}</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button onClick={() => {setModalShow(true)}} bsPrefix="btn colorBH"><i className="fas fa-edit"></i></Button>
                        <Button onClick={()=>{eliminarDestinatario(destinatario.email)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
            <ModalFormDestinatario
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </React.Fragment>
    );
}
 
export default VerDestinatario;