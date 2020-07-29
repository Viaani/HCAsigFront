import React from 'react';
//react bootstrap
import { Button } from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { eliminarAsignaturaEncontradaAction, eliminarAsignaturaGuardadaAction} from '../../Redux/Acciones/AsignaturasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes

const MostrarEquivalencia = ({TconvalidacionFhomologacion, equiparando, equivalencia, programaOrigen, programaObjetivo, index}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    //---------------Funciones---------------
    const eliminarEquivalenciaConvalidacion = (equivalente) => {
        clienteAxios.post(`/api/Equivalente/Convalidacion/${programaOrigen.toString()},${programaObjetivo.toString()}/`, equivalente,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            dispatch(eliminarAsignaturaEncontradaAction(equivalente))
            console.log(respuesta);
            dispatch(alertaAction({mensaje:"Exito al eliminar Equivalencia", segundos:2, color:"verde"}))

        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Equivalencia", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const eliminarEquivalenciaHomologacion = (equivalente) => {
        clienteAxios.post(`/api/Equivalente/Homologacion/${programaOrigen.toString()},${programaObjetivo.toString()}/`, equivalente,{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta =>{
            dispatch(eliminarAsignaturaEncontradaAction(equivalente))
            console.log(respuesta);
            dispatch(alertaAction({mensaje:"Exito al eliminar Equivalencia", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al eliminar Equivalencia", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const eliminarEquivalenciaDeComparacion = (equivalente) => {
        dispatch(eliminarAsignaturaGuardadaAction(equivalencia))
        dispatch(alertaAction({mensaje:"Se elimino la equivalencia de la comparacion actual", segundos:2, color:"verde"}))
    }
    //---------------Retorno----------------
    return ( 
        <tr>
            <td>{index+1}</td>
            <td>
                {
                    <ul className="w3-ul">
                        {
                            equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                                <li key ={index} >{asignatura.nombre}</li>
                            ))
                        }
                    </ul>
                }
            </td>
            <td>
                {
                    <ul className="w3-ul">
                        {
                            equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                                <li key ={index}>{asignatura.codigo}</li>
                            ))
                        }
                    </ul>
                }
            </td>
            <td>
                {
                    <ul className="w3-ul">
                        {
                            equivalencia.asignaturasObjetivo.map((asignatura, index)=>(
                                <li key ={index}>{asignatura.nombre}</li>
                            ))
                        }
                    </ul>
                }
            </td>
            <td>
                {
                    <ul className="w3-ul">
                        {
                            equivalencia.asignaturasObjetivo.map((asignatura, index)=>(
                                <li key ={index}>{asignatura.codigo}</li>
                            ))
                        }
                    </ul>
                }
            </td>
            <td>
            {
                !(TconvalidacionFhomologacion === undefined)&&
                    <div className = "w3-col">
                        <Button className = "colorBH" onClick = {
                            equiparando ? 
                                ()=>{eliminarEquivalenciaDeComparacion(equivalencia)}
                            :
                                TconvalidacionFhomologacion ?
                                    ()=>{eliminarEquivalenciaConvalidacion(equivalencia)}
                                :
                                    ()=>{eliminarEquivalenciaHomologacion(equivalencia)}
                                
                        }>
                            {equiparando ? "Eliminar Equivalencia de Comparación": "Eliminar Equivalencia"}
                        </Button>
                    </div>
            }
            </td>
        </tr>
    );

}
 
export default MostrarEquivalencia;