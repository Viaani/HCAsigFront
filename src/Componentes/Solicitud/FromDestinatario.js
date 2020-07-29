import React,{ useState, useEffect } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { UsuarioConectadoAction, DataUsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { AgregarDestinatarioAction, EditarDestinatarioAction } from '../../Redux/Acciones/DestinatariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//React-Bootstrap
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
// jQuery
import $ from 'jquery';
//Axios
import clienteAxios from '../../Config/Axios'

const FormDestinatario = ({editar, destinatarioProp}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [validated, setValidated] = useState(false);
    var editando = destinatarioProp.email
    const [destinatario, setDestinatario] = useState({
        nombre: destinatarioProp.nombre,
        apellido:destinatarioProp.apellido,
        email:destinatarioProp.email,
        tipoUsuario:destinatarioProp.tipoUsuario,
        area:destinatarioProp.area
    });
    //---------------Funciones---------------
    const agregarDestinatario = (destinatario) => {
        clienteAxios.post('/api/Destinatario', destinatario,{
            headers: {
                'Authorization': token
            }
        })
        .then(respuesta => {
            console.log(respuesta);
            //si se inserta correctamente
            dispatch(AgregarDestinatarioAction(destinatario))
            setDestinatario({
                nombre:'',
                apellido:'',
                email:'',
                tipoUsuario:'',
                area:''
            })
            setValidated(false)
            $('#FormDestinatarioTipoUsuario').prop('selectedIndex', 0);
            dispatch(alertaAction({mensaje:"Exito al agregar Destinatario", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(destinatario.tipoUsuario !== "SecretarioAcademico"){
                setDestinatario({
                    ...destinatario,
                    area:''
                })
            }
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Destinatario ya existe", segundos:4, color:"rojo"}))
                }
                else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({mensaje:"Error al agregar Destinatario", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitNuevoDestinaratio = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            agregarDestinatario(destinatario)
            return
        }
        setValidated(true);
    }
    const editarDestinatario = (destinatario, editando) =>
    {
        clienteAxios.put(`/api/Destinatario/${editando}`, destinatario,{
            headers: {
                'Authorization': token
            }
        })
        .then(respuesta => {
            console.log(respuesta);
            //si se inserta correctamente
            dispatch(EditarDestinatarioAction(editando, destinatario))
            setDestinatario({
                nombre: destinatario.nombre,
                apellido:destinatario.apellido,
                email:destinatario.email,
                tipoUsuario:destinatario.tipoUsuario,
                area:destinatario.area
            })
            setValidated(false)
            // $('#FormDestinatarioTipoUsuario').prop('selectedIndex', 0);
            dispatch(alertaAction({mensaje:"Exito al editar Destinatario", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(destinatario.tipoUsuario !== "SecretarioAcademico"){
                setDestinatario({
                    ...destinatario,
                    area:''
                })
            }
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Destinatario ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({mensaje:"Error al editar Destinatario", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitDestinatarioEditado = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            editarDestinatario(destinatario, editando)
            return
        }
        setValidated(true);
    }
    const handleChange = e => {
        setDestinatario({
            ...destinatario,
            [e.target.name]: e.target.value
        })
    }
    //--------------- useEffect---------------
    useEffect(()=>{
    },[editar, destinatario.tipoUsuario]);
    //---------------Retorno--------------- 
    return ( 
        <React.Fragment>
            <Container> 
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <h4>{editar?"Llene formulario para editar un Destinatario":"Llene formulario para agregar un Destinatario" }</h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <br/>
                        <Form noValidate validated={validated} onSubmit={editar?submitDestinatarioEditado:submitNuevoDestinaratio}>
                            <Form.Group controlId="FormDestinatarioNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name = "nombre"
                                    type="text"
                                    placeholder = "Nombre Destinatario"
                                    value = {destinatario.nombre}
                                    onChange = {handleChange}
                                    pattern = "^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]+$"
                                    maxLength = {20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{"Solo letras (empezar con mayuscula)"}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormDestinatarioApellido">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    name = "apellido"
                                    type="text"
                                    placeholder = "Apellido Destinatario"
                                    value = {destinatario.apellido}
                                    pattern = "^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]+(( [A-ZÑÁÉÍÓÚa-zñáéíóú][a-zñáéíóú]+)+)?$"
                                    onChange = {handleChange}
                                    maxLength = {50}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras y espacio, Ej: Lopez de las Riveras</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormDestinatarioEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name = "email"
                                    type="text"
                                    placeholder = "Email Destinatario"
                                    value = {destinatario.email}
                                    pattern = "^(([ña-zÑA-Z0-9_\-\.]+)@([ña-zÑA-Z0-9_\-\.]+)\.([ña-zÑA-Z]{2,5})){1,50}$"
                                    onChange = {handleChange}
                                    maxLength = {50}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Ejemplo: ejemplo@ejemplo.ej</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormDestinatarioTipoUsuario">
                                <Form.Label>Tipo de Usuario</Form.Label>
                                <Form.Control 
                                    name = "tipoUsuario"
                                    value = {destinatario.tipoUsuario}
                                    onChange = {handleChange}
                                    as = "select"
                                    required
                                >
                                    <option value="" disabled>Seleccione un tipo de Destinatario</option>
                                    <option value="SecretarioAcademico">Secretario Academico</option>
                                    <option value="SecretarioAdministrativo">Secretario Administrativo</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Seleccione una opción</Form.Control.Feedback>
                            </Form.Group>
                            {
                                destinatario.tipoUsuario === "SecretarioAcademico" &&
                                <Form.Group controlId="FormDestinatarioArea">
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control
                                        name = "area"
                                        type="text"
                                        placeholder = "Area Destinatario"
                                        value = {destinatario.area}
                                        pattern = "^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]+(( [A-ZÑÁÉÍÓÚa-zñáéíóú][a-zñáéíóú]+)+)?$"
                                        onChange = {handleChange}
                                        maxLength = {50}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Solo letras y espacio</Form.Control.Feedback>
                                </Form.Group>
                            }
                            <Button type="submit" bsPrefix="btn colorBH">Aceptar</Button>
                            <br/>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
export default FormDestinatario;