import React,{ useEffect } from 'react';
//react Bootstrap
import { ButtonGroup, Button, Form } from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { agregarAsignaturaSeleccionadaAction, eliminarAsignaturaSeleccionadaAction} from '../../Redux/Acciones/AsignaturasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes

const VerAsignaturaComparar = ({indexVerAsignaturaComparar, conAsigExterna, asignatura, asignaturaExterna, indexSolo, desabilitar}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    var asignatiraSeleccionada = ({})
    var asignatiraSeleccionadaExtra = ({})
    if(conAsigExterna){
        asignatiraSeleccionadaExtra = ({
            codigo: asignaturaExterna.codigo,
            nombre: asignaturaExterna.nombre,
            creditos: asignaturaExterna.creditos,
            codigo_ProgramaExterno: asignaturaExterna.codigo_ProgramaExterno,
            idcheck:indexVerAsignaturaComparar
        });
    }else{
        asignatiraSeleccionada = ({
            codigo: asignatura.codigo,
            nombre: asignatura.nombre,
            creditos: asignatura.creditos,
            numeroDecreto: asignatura.numeroDecreto,
            idcheck:indexVerAsignaturaComparar
        });
    }
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
    const handleChange = e => {
        if(e.target.checked){
            if(conAsigExterna){
                dispatch(agregarAsignaturaSeleccionadaAction(asignatiraSeleccionadaExtra))
            }else{
                dispatch(agregarAsignaturaSeleccionadaAction(asignatiraSeleccionada))
            }
        } else {
            if(conAsigExterna){
                dispatch(eliminarAsignaturaSeleccionadaAction(asignatiraSeleccionadaExtra.codigo))
            }else{
                dispatch(eliminarAsignaturaSeleccionadaAction(asignatiraSeleccionada.codigo))
            }
        }
        console.log(indexVerAsignaturaComparar)
    }
    useEffect(()=>{
    },[]);
    //---------------Retorno---------------
    return (    
        <React.Fragment>
            <tr>
                <td>{indexSolo+1}</td>
                <td>{conAsigExterna?asignaturaExterna.nombre:asignatura.nombre}</td>
                <td>{conAsigExterna?asignaturaExterna.codigo:asignatura.codigo}</td>
                <td>{conAsigExterna?asignaturaExterna.creditos:asignatura.creditos}</td>
                <td>
                    <ButtonGroup>
                        <Form.Check id = {indexVerAsignaturaComparar} key={indexVerAsignaturaComparar} onChange={handleChange} value={conAsigExterna?asignaturaExterna.codigo:asignatura.codigo} disabled = {desabilitar} />
                        <Button className="colorBH" title="Ver Programa Académico" onClick={()=>{obtenerProgramaAcademico(conAsigExterna?asignaturaExterna.codigo:asignatura.codigo)}}><i className="fas fa-file-pdf"></i></Button>
                    </ButtonGroup>
                </td>
            </tr>
        </React.Fragment>
    );
}
 
export default VerAsignaturaComparar;