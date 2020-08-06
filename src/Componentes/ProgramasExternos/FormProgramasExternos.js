import React,{ useState, useEffect } from 'react';
//React-Bootstrap
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { agregarProgramaExternoAction, EditarProgramaExternoAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Axios
import clienteAxios from '../../Config/Axios'

const FormProgramaExterno = ({editar, programaExternoProp}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [programaExterno, setProgramaExterno] = useState({
        codigo:programaExternoProp.codigo,
        nombre:programaExternoProp.nombre,
        universidad:programaExternoProp.universidad,
        asignaturasExternas:programaExternoProp.asignaturasExternas
    });
    var editando = programaExternoProp.codigo;
    const [validated, setValidated] = useState(false);
    //---------------Funciones---------------
    const agregarProgramaExterno = (programaExterno) => {
        clienteAxios.post('/api/ProgramaExterno/',programaExterno,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta => {
            //si se inserta correctamente
            dispatch(agregarProgramaExternoAction(programaExterno))
            setValidated(false)
            setProgramaExterno({
                codigo:'',
                nombre:'',
                universidad:'',
                asignaturasExternas:[]
            })
            dispatch(alertaAction({mensaje:"Exito al agregar Programa Externo", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Programa Externo ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al agregar Programa Externo", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const editarProgramaExterno = (id, programaExterno) => {
        clienteAxios.put(`/api/ProgramaExterno/${id}`, programaExterno,{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta =>{
            //si se edita correctamente
            dispatch(EditarProgramaExternoAction(id, programaExterno))
            setValidated(false)
            // setProgramaExterno({
            //     nombre:'',
            //     codigo:'',
            //     universidad:'',
            //     asignaturasExternas:[]
            // })
            dispatch(alertaAction({mensaje:"Exito al editar Programa Externo", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Programa Externo ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al editar Programa Externo", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitNuevoProgramaExterno = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            agregarProgramaExterno(programaExterno)
            return
        }
        setValidated(true)
    }
    const submitProgramaExternoEditado = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            editarProgramaExterno(editando, programaExterno)
            return
        }
        setValidated(true)
    }
    const handleChange = e => {
        setProgramaExterno({
            ...programaExterno,
            [e.target.name]: e.target.value.toUpperCase()
        })
    }
    //--------------- useEffect---------------
    useEffect(()=>{
    },[editar]);

    //---------------Retorno---------------
    return ( 
        <React.Fragment>
            <Container> 
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <h4> {editar?"LLene el formulario para editar Programa Externo":"LLene el formulario para agregar un Programa Externo"}</h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <br/>
                        <Form noValidate validated={validated} onSubmit={editar?submitProgramaExternoEditado:submitNuevoProgramaExterno}>
                            <Form.Group controlId="FormProgramaExternoCodigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    name = "codigo"
                                    type="text"
                                    placeholder = "Códico Programa Externo"
                                    value = {programaExterno.codigo}
                                    onChange = {handleChange}
                                    pattern = "^[ÑA-Zña-z-.0-9]{1,20}$"
                                    maxLength = {20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras, '-' y '.'</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormProgramaExternoNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name = "nombre"
                                    type="text"
                                    placeholder = "Nombre Programa Externo"
                                    value = {programaExterno.nombre}
                                    pattern = "^[ÑA-Zña-zÀ-ÿ\s]{2,100}$"
                                    onChange = {handleChange}
                                    maxLength = {100}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras y espacio</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormProgramaExternoUniversidad">
                                <Form.Label>Universidad</Form.Label>
                                <Form.Control
                                    name = "universidad"
                                    type="text"
                                    placeholder = "Universidad Programa Externo"
                                    value = {programaExterno.universidad}
                                    pattern = "^[ÑA-Zña-zÀ-ÿ\s]{1,50}$"
                                    onChange = {handleChange}
                                    maxLength = {50}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras y espacio</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">{editar?"Editar":"Agregar"}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
     );
}
 
export default FormProgramaExterno;