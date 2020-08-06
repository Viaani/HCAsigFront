import React from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Bootstrap
import { ButtonGroup, Button } from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { EliminarUsuarioAction, DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
// import Boton from '../General/Boton';

const VerUsuario = ({usuario}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    //---------------Funciones---------------
    const eliminarUsuario = (codigo) =>{
        clienteAxios.delete(`/api/Usuario/${codigo}`,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            dispatch(EliminarUsuarioAction(codigo));
            dispatch(alertaAction({ mensaje:"Exito al eliminar Usuario", segundos: 2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Usuario", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
            
        })
    }

    //---------------Retorno---------------
    return (
        <React.Fragment>
            <tr>
                <td>{usuario.nombre+" "+usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.tipoUsuario}</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button onClick={()=>{eliminarUsuario(usuario.email)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
        </React.Fragment>
        
     );
}
 
export default VerUsuario;