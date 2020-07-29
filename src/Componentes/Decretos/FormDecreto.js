import React,{ useState, useEffect } from 'react';
//React-Bootstrap
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { agregarDecretoAction , EditarDecretoAction } from '../../Redux/Acciones/DecretosAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Axios
import clienteAxios from '../../Config/Axios'
//Componentes

const FormDecreto = ({editar, decretoProp}) => {
    //---------------Atributos---------------
    const [decreto, setDecreto] = useState({
        numero:decretoProp.numero,
        fecha:decretoProp.fecha,
        asignaturas:decretoProp.asignaturas
    });
    var editando = decretoProp.numero;
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    //---------------Funciones---------------
    const agregarDecreto = (decreto) => {
        console.log(decreto);
        clienteAxios.post('/api/Decreto',decreto,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta => {
            console.log(respuesta);
            //si se inserta correctamente
            dispatch(agregarDecretoAction(decreto))
            setValidated(false)
            setDecreto({
                numero:'',
                fecha:'',
                asignaturas:[]
            })
            dispatch(alertaAction({mensaje:"Exito al agregar Decreto", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Decreto ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al agregar Decreto", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const editarDecreto = (id, decreto) => {
        console.log(decreto);
        clienteAxios.put(`/api/Decreto/${id}`, decreto,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            console.log(respuesta);
            //si se edita correctamente
            dispatch(EditarDecretoAction(id, decreto))
            setValidated(false)
            dispatch(alertaAction({mensaje:"Exito al editar Decreto", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Este Decreto ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al editar Decreto", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitNuevoDecreto = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            agregarDecreto(decreto)
            return
        }
        setValidated(true)
    }
    const submitDecretoEditado = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            editarDecreto(editando, decreto)
            return
        }
        setValidated(true)
    }
    const handleChange = e => {
        setDecreto({
            ...decreto,
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
                        <h4> {editar?"LLene el formulario para editar Decreto":"LLene el formulario para agregar un Decreto"}</h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <br/>
                        <Form noValidate validated={validated} onSubmit={editar?submitDecretoEditado:submitNuevoDecreto}>
                            <Form.Group controlId="FormDecretoNumero">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control
                                    name = "numero"
                                    type="number"
                                    placeholder = "Numero Decreto"
                                    value = {decreto.numero}
                                    onChange = {handleChange}
                                    pattern = "^[0-9]$"
                                    maxLength = {10}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo numeros</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormDestinatarioApellido">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    name = "fecha"
                                    type="date"
                                    placeholder = "Fecha Decreto"
                                    value = {decreto.fecha}
                                    pattern = "^((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})$"
                                    onChange = {handleChange}
                                    maxLength = {20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo numeros y '-'</Form.Control.Feedback>
                            </Form.Group>
                            <Button className="colorBH" type="submit">{editar?"Editar":"Agregar"}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
     );
}
 
export default FormDecreto;