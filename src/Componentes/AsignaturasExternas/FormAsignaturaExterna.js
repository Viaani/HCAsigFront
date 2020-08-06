import React,{ useState, useEffect } from 'react';
//Bootstrap react
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { agregarAsignaturaExternaAction, EditarAsignaturaExternaAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Axios
import clienteAxios from '../../Config/Axios'
//Componentes

const FormAsignatura = ({indexFormAsignaturaExterna, editar, asignaturaExternaProp}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const [validated, setValidated] = useState(false);
    const [asignatura, setAsignatura] = useState({
        codigo:asignaturaExternaProp.codigo,
        nombre:asignaturaExternaProp.nombre,
        creditos:asignaturaExternaProp.creditos,
        codigo_ProgramaExterno: asignaturaExternaProp.codigo_ProgramaExterno
    });
    var editandoAsignatura = asignaturaExternaProp.codigo;
    //---------------Funciones---------------
    const agregarAsignatura = (asignatura) => {
        var formData = new FormData()
        formData.append("archivo", document.getElementById("inputArchivo_"+indexFormAsignaturaExterna).files[0])
        clienteAxios.post(`/api/Asignatura/ProgramaExterno_asignaturas/${asignatura.codigo},${asignatura.nombre},${asignatura.creditos},${asignatura.codigo_ProgramaExterno}`, formData,{
            headers: {
                'Authorization': token
            }
        })
        .then(respuesta => {
            //si se inserta correctamente
            dispatch(agregarAsignaturaExternaAction(asignatura))
            setValidated(false)
            // ---------------Cerrar Modal---------------
            document.getElementById("inputArchivo_"+indexFormAsignaturaExterna).value = "";
            setAsignatura({
                codigo:'',
                nombre:'',
                creditos:'',
                codigo_programaExterno:asignaturaExternaProp.codigo_programaExterno
            })
            dispatch(alertaAction({mensaje:"Exito al agregar Asignatura", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Esta Asignatura ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al agregar Asignatura", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const editarAsignaturaArchivo = (id, asignatura) => {
        var formData = new FormData()
        formData.append("archivo", document.getElementById("inputArchivo_"+indexFormAsignaturaExterna).files[0])
        clienteAxios.put(`/api/Asignatura/archivo/${asignatura.codigo},${asignatura.nombre},${asignatura.creditos},${id}`, formData,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            //si se edita correctamente
            editandoAsignatura = asignatura.codigo
            setValidated(false)
            dispatch(EditarAsignaturaExternaAction(id, asignatura))
            // ---------------Cerrar Modal---------------
            dispatch(alertaAction({mensaje:"Exito al editar Asignatura", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Esta Asignatura ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al editar Asignatura", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const editarAsignatura = (id, asignatura) => {
        clienteAxios.put(`/api/Asignatura/ProgramaExterno_asignaturas/${id}`, asignatura,{
            headers: {
                'Authorization': token
              }
        })
        .then(respuesta =>{
            //si se edita correctamente
            // dispatch(EditarAsignaturaExternaAction(id, asignatura))
            setValidated(false)
            editandoAsignatura = asignatura.codigo
            dispatch(EditarAsignaturaExternaAction(id, asignatura))
            // ---------------Cerrar Modal---------------
            dispatch(alertaAction({mensaje:"Exito al editar Asignatura", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Esta Asignatura ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al editar Asignatura", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitNuevoAsignatura = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            if((document.getElementById("inputArchivo_"+indexFormAsignaturaExterna).files[0].type) !== "application/pdf")
            {
                dispatch(alertaAction({mensaje:"Archivo documento de programa debe ser tipo PDF", segundos:4, color:"rojo" }))
                return
            }
            agregarAsignatura(asignatura)
            return
        }
        setValidated(true);
    }
    const submitAsignaturaEditado = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (form.checkValidity() === true){
            if (document.getElementById("inputArchivo_"+indexFormAsignaturaExterna).files[0] === undefined){
                editarAsignatura(editandoAsignatura, asignatura)
                return
            }
            if((document.getElementById("inputArchivo_"+indexFormAsignaturaExterna).files[0].type) !== "application/pdf")
            {
                dispatch(alertaAction({mensaje:"Archivo documento de programa debe ser tipo PDF", segundos:4, color:"rojo" }))
                return
            }
            editarAsignaturaArchivo(editandoAsignatura, asignatura)
            return
        }
        setValidated(true);
    }
    const handleChange = e => {
        setAsignatura({
            ...asignatura,
            [e.target.name]: e.target.value.toUpperCase()
        })
    }
    const obtenerProgramaAcademico = (codigo) =>{
        // window.open(`https://localhost:44387/api/Asignatura/DescargarProgramaAcademico/${codigo}`,'_blank')
        clienteAxios.get(`/api/Asignatura/DescargarProgramaAcademico/${codigo}`,{
            headers: {
                'Authorization': token
              },
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(respuesta =>{
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
    //--------------- useEffect---------------
    useEffect(()=>{
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[editar]);
    //---------------Retorno---------------
    return (
        <React.Fragment>
            <Container> 
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <h4> {editar?"LLene el formulario para editar una Asignatura Externa":"LLene el formulario para agregar una Asignatura Externa"}</h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <br/>
                        <Form noValidate validated={validated} onSubmit={editar?submitAsignaturaEditado:submitNuevoAsignatura} encType="multipart/form-data" id ={"formArchivo_"+indexFormAsignaturaExterna} method="post">
                            <Form.Group controlId="FormAsignaturaCreditos">
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control
                                    name = "codigo"
                                    type="text"
                                    placeholder = "Codigo Asignatura"
                                    value = {asignatura.codigo}
                                    onChange = {handleChange}
                                    pattern = "^[ÑA-Zña-z0-9]{1,20}$"
                                    maxLength = {20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Letras y numeros</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="FormAsignaturaNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name = "nombre"
                                    type="text"
                                    placeholder = "Nombre Asignatura"
                                    value = {asignatura.nombre}
                                    onChange = {handleChange}
                                    pattern = "^[ÑA-Zña-zÀ-ÿ\s]{1,100}$"
                                    maxLength = {100}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo letras</Form.Control.Feedback>
                            </Form.Group>
                            {
                                editar?
                                    <Form.Group id="formcheck-api-regular">
                                        <Form.Label>Programa Academico</Form.Label>
                                        <Form.Control
                                            id = {"inputArchivo_"+indexFormAsignaturaExterna}
                                            name = "programaAcademico"
                                            type="file"
                                            placeholder = "Programa Academico"
                                        />
                                        <Form.Control.Feedback type="invalid">Archvo tipo .pdf</Form.Control.Feedback>
                                    </Form.Group>
                                :
                                    <Form.Group id="formcheck-api-regular">
                                        <Form.Label>Programa Academico</Form.Label>
                                        <Form.Control
                                            id = {"inputArchivo_"+indexFormAsignaturaExterna}
                                            name = "programaAcademico"
                                            type="file"
                                            placeholder = "Programa Academico"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Archvo tipo .pdf</Form.Control.Feedback>
                                    </Form.Group>
                            }
                            {
                                editar&&
                            <Button title="Ver Programa Académico Actual" onClick={()=>{obtenerProgramaAcademico(asignatura.codigo)}} variant="secondary"><i className="fas fa-file-pdf"></i>{" P.A. Actual"}</Button>
                            }
                            <Form.Group controlId="FormAsignaturaCreditos">
                                <Form.Label>Creditos</Form.Label>
                                <Form.Control
                                    name = "creditos"
                                    type="number"
                                    placeholder = "Creditos Asignatura"
                                    value = {asignatura.creditos}
                                    onChange = {handleChange}
                                    pattern = "^[0-9]$"
                                    maxLength = {10}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Solo numeros</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" bsPrefix="btn colorBH">{editar?"Editar":"Agregar"}</Button>
                            <br/>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
 
export default FormAsignatura;