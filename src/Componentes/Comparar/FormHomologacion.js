import React,{ useState, useEffect } from 'react';
//Bootstrap react
import { Button, Form, Row, Col, Container, Table } from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios'
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
import { AgregarHomologacionAction } from '../../Redux/Acciones/HomologacionAction';

const FormHomologacion = ({editar, programaOrigen, programaObjetivo}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const usuario =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado)
    const [validated, setValidated] = useState(false);
    var listaAsignaturasEquivalentes = useSelector((state)=>state.asignaturasStore.listaAsignaturasGuardadas)
    const [homologacion, setHomologacion] = useState({
        run:'',
        nombre:'',
        apellido:'',
        programaOrigen:programaOrigen.codigo,
        programaObjetivo:programaObjetivo.codigo,
        listaAsignaturasEquivalentes:listaAsignaturasEquivalentes,
        emailSecretario:usuario.email
    })

    //---------------Funciones---------------
    const agregarHomologacion = () => {
        clienteAxios.post('/api/Homologacion', homologacion,{
            headers: {
                'Authorization': usuario.token
              }
        })
        .then(respuesta => {
            dispatch(AgregarHomologacionAction({
                ...homologacion,
                programaOrigen:programaOrigen,
                programaObjetivo:programaObjetivo
            }))
            setValidated(false)
            dispatch(alertaAction({mensaje:"Exito al agregar Convalidación", segundos:2, color:"verde"}))
        })
        .catch(error=>{
            console.log(error);
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Esta Convalidación ya existe", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al agregar Convalidación", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitNuevaHomologacion = e =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        if (validarRut(homologacion.run) === false){
            dispatch(alertaAction({mensaje:"Rut invalido", segundos:2, color:"rojo"}))
            return
        }
        if (form.checkValidity() === true){
            agregarHomologacion()
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
    const handleChangeNota = (equivalenciaNumero, programaOrigenNumero)=> e => {
        console.log(e.target.value.substr(-1,1))
        if(e.target.value.substr(-1,1)==="." || e.target.value===''){
            setHomologacion({
                ...homologacion,
                listaAsignaturasEquivalentes: homologacion.listaAsignaturasEquivalentes.map((equivalencia, indexx)=>{
                    return indexx === equivalenciaNumero?
                        {...equivalencia,
                        asignaturasOrigen:equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                            index === programaOrigenNumero?
                                {
                                    ...asignatura,
                                    nota: e.target.value
                                }
                            :
                                {...asignatura}
                        ))}
                    :
                        {...equivalencia}
                })
            })
        }else{
            setHomologacion({
                //     ...convalidacion,
                //     listaAsignaturasEquivalentes: convalidacion.listaAsignaturasEquivalentes.map((equivalencia, indexx)=>{
                //         var contador = 0
                //         indexx === equivalenciaNumero?
                //             {...equivalencia,
                //             asignaturasOrigen:equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                //                 index === programaOrigenNumero?
                //                     {
                //                         ...asignatura,
                //                         nota: parseInt(e.target.value)
                //                     }
                //                 :
                //                     {...asignatura}
                //             ))}
                //         :
                //             {...equivalencia}
                //     })
                // })
                // console.log("despues de hchangeORi")
                // console.log(convalidacion)
                
                ...homologacion,
                listaAsignaturasEquivalentes: homologacion.listaAsignaturasEquivalentes.map((equivalencia, indexx)=>{
                    var notas = 0
                    if(indexx === equivalenciaNumero){
                        return {...equivalencia,
                            asignaturasOrigen:equivalencia.asignaturasOrigen.map((asignatura, index)=>{
                                if(index === programaOrigenNumero){
                                    notas = notas + parseFloat(e.target.value)
                                    return {
                                        ...asignatura,
                                        nota: e.target.value.length ===1 ? parseFloat(e.target.value):parseFloat(e.target.value).toFixed(1)
                                    }
                                }
                                else {
                                    notas = notas + parseFloat(asignatura.nota)
                                    return {...asignatura}
                                }
                            }),
                            nota:(notas/equivalencia.asignaturasOrigen.length).toFixed(1)
                        }
                    }
                    else{
                        return {
                            ...equivalencia,
                            // asignaturasOrigen:equivalencia.asignaturasOrigen.map((asignatura, index)=>{
                            //     notas = notas + parseInt(asignatura.nota)
                            //     return {...asignatura}
                            // }),
                            // nota:(notas/equivalencia.asignaturasOrigen.length).toFixed(1)
                        }
                    }
                })
            })
        }
        
    }
    const handleChange = e => {
        setHomologacion({
            ...homologacion,
            [e.target.name]: e.target.value.toUpperCase()
        })
    }
    const compararEquivalentes = (equivalente, equivalente2) => {
        if ((equivalente.asignaturasOrigen.length !== equivalente2.asignaturasOrigen.length) || (equivalente.asignaturasObjetivo.length !== equivalente2.asignaturasObjetivo.length)){
            return true
        }
        for(var cont = 0; cont < equivalente.asignaturasOrigen.length ; cont++){
            if(equivalente.asignaturasOrigen[cont] !== equivalente2.asignaturasOrigen[cont]){
                return true
            }
        }
        for(var cont2 = 0; cont2 < equivalente.asignaturasObjetivo.length ; cont2++){
            if(equivalente.asignaturasObjetivo[cont2] !== equivalente2.asignaturasObjetivo[cont2]){
                return true
            }
        }
        return false
    }
    const eliminarEquivalenciaDeComparacion = (equivalencia) => {
        setHomologacion({
            ...homologacion,
            listaAsignaturasEquivalentes:homologacion.listaAsignaturasEquivalentes.filter(equivalenciaTemp=> compararEquivalentes(equivalenciaTemp,equivalencia))
        })
        dispatch(alertaAction({mensaje:"Se elimino la equivalencia de la comparacion actual", segundos:2, color:"verde"}))
    }
    useEffect(()=>{
    //eslint-disable-next-line react-hooks/exhaustive-deps
    });

    //---------------Retorno---------------
    return ( 
        <Container> 
            <Row className="justify-content-md-center">
                <Col>
                    <h4> {editar?"LLene el formulario para editar una Convalidación":"LLene el formulario para agregar una Convalidación"}</h4>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col>
                    <br/>
                    <Form noValidate validated={validated} onSubmit={ submitNuevaHomologacion } >
                        <Form.Group controlId="FormHomologacionRun">
                            <Form.Label>Rut</Form.Label>
                            <Form.Control
                                name = "run"
                                type="text"
                                placeholder = "Rut Convalidación"
                                value = {homologacion.run}
                                onChange = {handleChange}
                                pattern = "^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$"
                                maxLength = {12}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Ejemplo: 11.111.111-1</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="FormHomologacionNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name = "nombre"
                                type="text"
                                placeholder = "Nombre Convalidación"
                                value = {homologacion.nombre}
                                onChange = {handleChange}
                                pattern = "^[ÑA-Zña-zÀ-ÿ]{1,20}$"
                                maxLength = {20}
                                required
                            />
                            <Form.Control.Feedback type="invalid">solo letras</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="FormHomologacionApellido">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                name = "apellido"
                                type="text"
                                placeholder = "Apellido Convalidación"
                                value = {homologacion.apellido}
                                onChange = {handleChange}
                                pattern = "^[ÑA-Zña-zÀ-ÿ ]{1,50}$"
                                maxLength = {50}
                                required
                            />
                            <Form.Control.Feedback type="invalid">solo letras y espacio</Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <h4>Equivalentes:</h4>
                        <br/>
                        <Table striped bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Asignaturas Origen</th>
                                    <th>Codigo Origen</th>
                                    <th>Nota</th>
                                    <th>Asignaturas Objetivo</th>
                                    <th>Codigo Objetivo</th>
                                    <th>Nota</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    (homologacion.listaAsignaturasEquivalentes !== null && programaOrigen.codigo !== null && programaObjetivo.codigo !== null && programaOrigen.codigo !== programaObjetivo) &&
                                    homologacion.listaAsignaturasEquivalentes.map((equivalencia, index) =>(
                                        <tr key={"listaAsignaturaEquivalente"+index}>
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
                                                            equivalencia.asignaturasOrigen.map((asignatura, indexx)=>(
                                                                <li key ={indexx+index+"input"}>
                                                                    <Form.Group controlId={"FormNotaOri"+indexx+index}>
                                                                        <Form.Control
                                                                            name = "nota"
                                                                            type="text"
                                                                            value = {homologacion.listaAsignaturasEquivalentes[index].asignaturasOrigen[indexx].nota}
                                                                            onChange = {(e)=>{handleChangeNota(index, indexx)(e)}}
                                                                            pattern = "^[0-9]{1}[.]{1}[0-9]{1}$"
                                                                            maxLength = {3}
                                                                            required
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">{"numero desimal con '.'(Ejemplo: 0.0)"}</Form.Control.Feedback>
                                                                    </Form.Group>
                                                                </li>
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
                                                <ul className="w3-ul">
                                                    {
                                                        homologacion.listaAsignaturasEquivalentes[index].nota
                                                    }
                                                </ul>
                                                }
                                            </td>
                                            <td>
                                                <div className = "w3-col">
                                                    <Button className = "colorBH" onClick = {
                                                            ()=>{eliminarEquivalenciaDeComparacion(equivalencia)}
                                                    }>
                                                        Eliminar Equivalencia de Comparación
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <Button type="submit" bsPrefix="btn colorBH">{editar?"Editar":"Agregar"}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
 
export default FormHomologacion;