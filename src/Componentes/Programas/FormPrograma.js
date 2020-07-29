import React,{ useState, useEffect } from 'react';
//React-Bootstrap
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { agregarProgramaAction, EditarProgramaAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction }from '../../Redux/Acciones/GeneralAction';
//Axios
import clienteAxios from '../../Config/Axios'

const FormPrograma = ({ editar, programaProp }) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [programa, setPrograma] = useState({
        nombre:programaProp.nombre,
        codigo:programaProp.codigo,
        numero_Decreto:programaProp.numero_Decreto
    });
    var editando = programaProp.codigo;
    const [validated, setValidated] = useState(false);
    const listaDecretos = useSelector((state)=>state.decretosStore.decretos);
    
    //---------------Funciones---------------
    const agregarPrograma = (programa) => {
        console.log(programa);
        clienteAxios.post('/api/Programa',programa,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta => {
            console.log(respuesta);
            //si se inserta correctamente
            dispatch(agregarProgramaAction(programa))
            setPrograma({
                nombre:'',
                codigo:'',
                numero_Decreto:''
            })
            dispatch(alertaAction({mensaje:"Exito al agregar Programa", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Programa ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al agregar Programa", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const editarPrograma = (id, programa) => {
        console.log(programa);
        clienteAxios.put(`/api/Programa/${id}`, programa,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            console.log(respuesta);
            //si se edita correctamente
            dispatch(EditarProgramaAction(id, programa))
            setPrograma({
                nombre:'',
                codigo:'',
                numero_Decreto:''
            })
            dispatch(alertaAction({mensaje:"Exito al editar Programa", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Programa ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al editar Programa", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitNuevoPrograma = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            agregarPrograma(programa)
            return
        }
        setValidated(true);
    }
    const submitProgramaEditado = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            editarPrograma(editando, programa)
            return
        }
        setValidated(true);
    }
    const handleChange = e => {
        setPrograma({
            ...programa,
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
                        <h4>{editar?"Llene formulario para editar un Programa":"Llene formulario para agregar un Programa"}</h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <br/>
                        <Form noValidate validated={validated} onSubmit={editar?submitProgramaEditado:submitNuevoPrograma}>
                            <Form.Group controlId="FormProgramaNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name = "nombre"
                                    type="text"
                                    placeholder = "Nombre Programa"
                                    value = {programa.nombre}
                                    onChange = {handleChange}
                                    pattern = "^[ÑA-Zña-zÀ-ÿ\s]{1,100}$"
                                    maxLength = {100}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormProgramaCodigo">
                                <Form.Label>Código</Form.Label>
                                <Form.Control
                                    name = "codigo"
                                    type="text"
                                    placeholder = "Código Programa"
                                    value = {programa.codigo}
                                    pattern = "^UNAB[0-9]{1,20}$"
                                    onChange = {handleChange}
                                    maxLength = {20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{"Ejemplo: UNAB00000 (UNAB seguido de numero)"}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormProgramaNumeroDecreto">
                                <Form.Label>Decreto</Form.Label>
                                <Form.Control 
                                    name = "numero_Decreto"
                                    value = {programa.numero_Decreto}
                                    onChange = {handleChange}
                                    as = "select"
                                    required
                                >
                                    <option value="" disabled>Seleccione un Decreto</option>
                                    {listaDecretos.map((decreto, index)=>(
                                        <option key={index} value={parseInt(decreto.numero)}>{decreto.numero}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Seleccione una opción</Form.Control.Feedback>
                            </Form.Group>
                            <Button bsPrefix="btn colorBH" type="submit">{editar?"Editar":"Agregar"}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
        // </div>
     );
}
 
export default FormPrograma;