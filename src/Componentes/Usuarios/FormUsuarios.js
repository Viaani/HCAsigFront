import React,{ useState, useEffect } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AgregarUsuarioAction, UsuarioConectadoAction, DataUsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//React-Bootstrap
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios'
//JQuery
import $ from 'jquery';
const FormUsuarios = ({editar}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const datosUsuario =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado)
    const [validated, setValidated] = useState(false);
    // var editando = destinatarioProp.email  // Editar
    const [usuario, setUsuario] = useState(!editar?{
        nombre:'',
        apellido:'',
        run:'',
        email:'',
        area:'',
        password:'',
        tipoUsuario:''
    }:
    {
        nombre:datosUsuario.nombre,
        apellido:datosUsuario.apellido,
        run:datosUsuario.run,
        email:datosUsuario.email,
        area:datosUsuario.area,
        password:'',
        tipoUsuario:datosUsuario.tipoUsuario
    }
    );

    //---------------Funciones---------------
    const agregarUsuario = (usuario) => {
        console.log(usuario);
        clienteAxios.post('/api/Usuario', usuario,{
            headers: {
                'Authorization': datosUsuario.token
              }
        })
        .then(respuesta => {
            console.log(respuesta);
            //si se inserta correctamente
            dispatch(AgregarUsuarioAction(usuario))
            setUsuario({
                nombre:'',
                apellido:'',
                run:'',
                email:'',
                area:'',
                password:'',
                tipoUsuario:''
            })
            setValidated(false)
            $('#TipoUsuarioSelect').prop('selectedIndex',0);
            dispatch(alertaAction({mensaje:"Exito al agregar Usuario", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(usuario.tipoUsuario !== "SecretarioAcademico"){
                setUsuario({
                    ...usuario,
                    area:''
                })
            }
            console.log(error.response)
            console.log(error.response.data)
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"El email ingresado ya existe", segundos:4, color:"rojo"}))
                }
                else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({mensaje:"Error al agregar Usuario", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
            
        })
    }
    const editarUsuario = (usuario) => {
        console.log(usuario);
        clienteAxios.put(`/api/Usuario/${datosUsuario.email}`, usuario,{
            headers: {
                'Authorization': datosUsuario.token
              }
        })
        .then(respuesta => {
            console.log(respuesta);
            //si se inserta correctamente
            dispatch(DataUsuarioConectadoAction({
                token:datosUsuario.token,
                nombre:usuario.nombre,
                apellido:usuario.apellido,
                run:usuario.run,
                email:usuario.email,
                area:usuario.area,
                tipoUsuario:usuario.tipoUsuario
            }))
            setUsuario({
                ...usuario,
                password:''
            })
            dispatch(alertaAction({mensaje:"Exito al editar Usuario", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            // if(usuario.tipoUsuario !== "SecretarioAcademico"){
            //     setUsuario({
            //         ...usuario,
            //         area:''
            //     })
            // }
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"El email ingresado ya existe", segundos:4, color:"rojo"}))
                }
                else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else{
                    dispatch(alertaAction({mensaje:"Error al editar Usuario", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
            
        })
    }
    const submitNuevoUsuario = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (validarRut(usuario.run) === false){
            dispatch(alertaAction({mensaje:"Rut invalido", segundos:2, color:"rojo"}))
            return
        }
        if (form.checkValidity() === true){
            agregarUsuario(usuario)
            return
        }
        setValidated(true);
    }
    const validarRut = (rutCompleto)=>{
        rutCompleto = rutCompleto.replace(/\./g,'')
		var tmp     = rutCompleto.split('-')
		var digv    = tmp[1];
		var rut 	= tmp[0]
        if ( digv === 'K' ) digv = 'k';
        
        var M=0,S=1;
		for(;rut;rut=Math.floor(rut/10))
            S=(S+rut%10*(9-M++%6))%11;
        // eslint-disable-next-line
		return (S?S-1:'k') == digv;
    }
    const submitEditarUsuario = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (validarRut(usuario.run) === false){
            dispatch(alertaAction({mensaje:"Rut invalido", segundos:2, color:"rojo"}))
            return
        }
        if (form.checkValidity() === true){
            editarUsuario(usuario)
            return
        }
        setValidated(true);
    }
    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    //--------------- useEffect---------------
    useEffect(()=>{
    },[editar, usuario.tipoUsuario]);
    //---------------Retorno---------------
    return ( 
        <React.Fragment>
            <Container> 
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <h4>{editar?"Llene formulario para editar usuario":"Llene formulario para agregar un Usuario"}</h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <br/>
                        <Form noValidate validated={validated} onSubmit={editar?submitEditarUsuario:submitNuevoUsuario}>
                            <Form.Group controlId="FormUsuarioNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name = "nombre"
                                    type="text"
                                    placeholder = "Nombre Usuario"
                                    value = {usuario.nombre}
                                    onChange = {handleChange}
                                    pattern = "^[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1,19}$"
                                    maxLength = {20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras, primera letra mayuscula</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormUsuarioApellido">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    name = "apellido"
                                    type="text"
                                    placeholder = "Apellido Usuario"
                                    value = {usuario.apellido}
                                    pattern = "^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]+(( [A-ZÑÁÉÍÓÚa-zñáéíóú][a-zñáéíóú]+)+)?$"
                                    maxLength = {50}
                                    onChange = {handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{"Solo letras y espacio, (Los apellidos se escribiran de la misma forma en los documentos incluyendo mayusculas)"}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormUsuarioRun">
                                <Form.Label>Rut</Form.Label>
                                <Form.Control
                                    name = "run"
                                    type="text"
                                    placeholder = "Rut Usuario"
                                    value = {usuario.run}
                                    pattern = "^\d{1,2}\.\d{3}\.\d{3}[-][0-9K]{1}$"
                                    onChange = {handleChange}
                                    maxLength = {12}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{"Ejemplo: 11.111.111-1 (incluya '.' y '-' en caso de K use mayuscula)."}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormUsuarioEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name = "email"
                                    type="text"
                                    placeholder = "Email Usuario"
                                    value = {usuario.email}
                                    pattern = "^(([ña-zÑA-Z0-9_\-\.]+)@([ña-zÑA-Z0-9_\-\.]+)\.([ña-zÑA-Z]{2,5})){1,50}$"
                                    onChange = {handleChange}
                                    maxLength = {50}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Ejemplo: ejemplo@ejemplo.ej </Form.Control.Feedback>
                            </Form.Group>
                            {!editar &&
                            <Form.Group controlId="FormUsuarioTipoUsuario">
                                <Form.Label>Tipo de Usuario</Form.Label>
                                <Form.Control
                                    name = "tipoUsuario"
                                    value = {usuario.tipoUsuario}
                                    onChange = {handleChange}
                                    as = "select"
                                    required
                                >
                                    <option value="" disabled>Seleccione un tipo de Usuario</option>
                                    <option value="SecretarioAcademico">Secretario Academico</option>
                                    <option value="Administrador">Administrador</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Seleccione una opción</Form.Control.Feedback>
                            </Form.Group>
                            }
                            {
                                usuario.tipoUsuario === "SecretarioAcademico" &&
                                <Form.Group controlId="FormUsuarioArea">
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control
                                        name = "area"
                                        type="text"
                                        placeholder = "Area Secretario Académico"
                                        value = {usuario.area}
                                        pattern = "^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]+(( [A-ZÑÁÉÍÓÚa-zñáéíóú][a-zñáéíóú]+)+)?$"
                                        maxLength = {50}
                                        onChange = {handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{"solo letras y espacio (primera letra mayuscula luego cada palabra puede o no tener primera mayuscula) Ej: Facultad de Ingenieria"}</Form.Control.Feedback>
                                </Form.Group>
                            }
                            { editar?
                            <Form.Group controlId="FormUsuarioRun">
                                <Form.Label>{"Nueva contraseña"}</Form.Label>
                                <Form.Control
                                    name = "password"
                                    type="password"
                                    placeholder = "Contraseña Usuario"
                                    value = {usuario.password}
                                    //eslint-disable-next-line
                                    pattern = "^(?=.*[ña-z])(?=.*[ÑA-Z])(?=.*)[ÑA-Zña-z\d]{8,16}$|^$"
                                    maxLength = {16}
                                    onChange = {handleChange}
                                    required = {false}
                                />
                                <Form.Control.Feedback type="invalid">{"La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos."}</Form.Control.Feedback>
                            </Form.Group>
                            :
                            <Form.Group controlId="FormUsuarioRun">
                                <Form.Label>{"Contraseña"}</Form.Label>
                                <Form.Control
                                    name = "password"
                                    type="password"
                                    placeholder = "Contraseña Usuario"
                                    value = {usuario.password}
                                    //eslint-disable-next-line
                                    pattern = "^(?=.*[ña-z])(?=.*[ÑA-Z])(?=.*\d)[ÑA-Zña-z\d]{8,16}$"
                                    maxLength = {16}
                                    onChange = {handleChange}
                                    required = {true}
                                />
                                <Form.Control.Feedback type="invalid">{"La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos."}</Form.Control.Feedback>
                            </Form.Group>
                            }
                            <Button type="submit" bsPrefix="btn colorBH">Aceptar</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
export default FormUsuarios;