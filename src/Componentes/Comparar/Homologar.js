import React,{ useState, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { cambiarTituloAction , idModuloAction } from '../../Redux/Acciones/GeneralAction';
// import { ObtenerProgramasAction, ObtenerProgramasExternosAction } from '../../Redux/Acciones/ProgramasAction';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
import { ObtenerAsignaturasEncontradasAction, recuperarAsignaturasGuardadasAction, ObtenerAsignaturaSeleccionadaAction } from '../../Redux/Acciones/AsignaturasAction';
//Bootstrap
import { Button, Form, Row, Col, Container, Modal, Table } from 'react-bootstrap';
//reacr-pdf
import { Page, Text, View, Document, StyleSheet, Image, Font, pdf } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
//reacr-select
import Select from 'react-select';
//jquery
import $ from 'jquery';
//Componentes
import ListaAsignaturas from '../Asignaturas/ListaAsignaturas';
import ListaAsignaturasExternas from '../AsignaturasExternas/ListaAsignaturasExternas'
import MostrarEquivalencia from './MostrarEquivalencia';
import FormHomologacion from './FormHomologacion';

const Homologar = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const usuario = useSelector((state)=>state.usuariosStore.dataUsuarioConectado)
    const [isLoading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    
    const [programaOrigen, setProgramaOrigen ]= useState(null);
    const [programaObjetivo, setProgramaObjetivo ]= useState(null);
    const [ListaAsignaturasOrigen, setListaAsignaturasOrigen] = useState([]);
    const [ListaAsignaturasObjetivo, setListaAsignaturasObjetivo] = useState([]);
    const [destinatarioSeleccionado, setDestinatarioSeleccionado] = useState("")
    const [listaAsigEnviarOrigen, setlistaAsigEnviarOrigen] = useState([])
    const [listaAsigEnviarObjetivo, setlistaAsigEnviarObjetivo] = useState([])
    
    const listaProgramas = useSelector((state)=>state.programasStore.programas);
    const decretos = useSelector((state)=>state.decretosStore.decretos)
    const listaProgramasExternos = useSelector((state)=>state.programasStore.programasExternos);
    const ListaAsignaturasSeleccionadas = useSelector((state)=>state.asignaturasStore.asignaturaSeleccionadas);
    const ListaAsignaturasEncontradas = useSelector((state)=>state.asignaturasStore.listaAsignaturasEncontradas);
    const ListaDestinatarios = useSelector((state)=>state.destinatariosStore.destinatarios)
    const ListaUsuarios = useSelector((state)=>state.usuariosStore.usuarios);
    const opciones = listaProgramas.map((programa)=>{
        return { value:programa, label:programa.nombre }
    })
    const opcionesExternas = listaProgramasExternos.map((programa)=>{
        return { value:programa, label:programa.nombre }
    })
    const idsModulos = useSelector((state)=> state.generalStore.modulos);
  
    //---------------Funciones---------------
    const clickEnListaEditarOrigen = e =>{
        setlistaAsigEnviarOrigen(e.value.asignaturasExternas)
        setProgramaOrigen(e.value);
    }
    const clickEnListaEditarObjetivo = e =>{
        if(decretos!==undefined){
            decretos.forEach((decreto)=>{
                if(decreto.numero.toString() === e.value.numero_Decreto.toString())
                {
                    setlistaAsigEnviarObjetivo(decreto.asignaturas)
                }
            })
        }
        setProgramaObjetivo(e.value);
    }
    const agregarEquivalencia = (listaFinalAsignaturas) => {
        clienteAxios.post('/api/Equivalente/Homologacion',listaFinalAsignaturas,{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta => {
            buscarEquivalencias()
            dispatch(alertaAction({mensaje:"Exito al agregar Equivalencia", segundos:2, color:"verde"}))
            ListaAsignaturasSeleccionadas.forEach(asignaturaseleccionada => {
                $("#"+asignaturaseleccionada.idcheck).prop("checked", false);
            });
            dispatch(ObtenerAsignaturaSeleccionadaAction([]))

        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "duplicado"){
                    dispatch(alertaAction({mensaje:"Esta Equivalencia contiene asignaturas ya equiparadas", segundos:4, color:"rojo"}))
                }else if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al agregar Equivalencia", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const establecerEquivalencia = () =>{
        setListaAsignaturasOrigen([]);
        setListaAsignaturasObjetivo([]);
        
        var hayAsigEnProgramaOrigen = false;
        var hayAsigEnProgramaObjetivo = false;

        ListaAsignaturasSeleccionadas.forEach(asignatura=>{
            if(asignatura.hasOwnProperty('numeroDecreto')){
                var asignaturaTemp = {
                    codigo: asignatura.codigo,
                    nombre: asignatura.nombre,
                    creditos: asignatura.creditos
                }
                ListaAsignaturasObjetivo.push(asignaturaTemp)
                hayAsigEnProgramaObjetivo = true;
            }
            if(asignatura.hasOwnProperty('codigo_ProgramaExterno')){
                asignaturaTemp = {
                    codigo: asignatura.codigo,
                    nombre: asignatura.nombre,
                    creditos: asignatura.creditos
                }
                ListaAsignaturasOrigen.push(asignaturaTemp)
                hayAsigEnProgramaOrigen = true;
            }
        })

        if(hayAsigEnProgramaObjetivo && hayAsigEnProgramaOrigen){
            
            var listaFinalAsignaturas = {
                ListaEquivalente:[]
            }
            ListaAsignaturasOrigen.forEach(asignatura =>{
                ListaAsignaturasObjetivo.forEach(asignatura2 =>{
                    var equivalencia = {
                        programaOrigen: programaOrigen.codigo,
                        programaObjetivo: programaObjetivo.codigo,
                        codigoAsignaturaOrigen: asignatura.codigo,
                        codigoAsignaturaObjetivo: asignatura2.codigo
                    }
                    listaFinalAsignaturas = {
                        ...listaFinalAsignaturas,
                        ListaEquivalente: [...listaFinalAsignaturas.ListaEquivalente, equivalencia ]
                    }
                });
                
            });
            agregarEquivalencia(listaFinalAsignaturas);

        }else{
            dispatch(alertaAction({mensaje:"Seleccione al menos una asignatura de cada Programa", segundos:2}))
        }
    }
    const buscarEquivalencias = () =>{
        clienteAxios.get(`api/Equivalente/Homologacion/${programaOrigen.codigo},${programaObjetivo.codigo}`,{
            headers: {
                'Authorization': token
              }
        }
        )
        .then(respuesta => {
            dispatch(ObtenerAsignaturasEncontradasAction(respuesta.data))
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                // }else if(error.response.data === "Vacio"){
                //     dispatch(ObtenerAsignaturasEncontradasAction([]))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Equivalencias", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const HandleEnviarHomologacion = e => {
        e.preventDefault();
        setLoading(true)
        EnviarHomologacion(destinatarioSeleccionado,programaOrigen ,programaObjetivo)
    }
    const EnviarHomologacion = (email, programaOrigen, programaObjetivo) =>{
        Font.register({ family: 'Arial', src:require("../../img/ARI.ttf")});
        Font.register({ family: 'BookAntiqua-Bold', src:require("../../img/BookAntiquaBold.ttf")});
        Font.register({ family: 'BookAntiqua', src:require("../../img/book-antiqua.ttf")});

        const AltoTable = styled.View`height:189px;
        `;
        const Table = styled.View`display: table; width:auto; borderStyle: solid; borderWidth: 1.5; borderBottomWidth: 0;
        `;
        const TRB = styled.View`
        flexDirection: row; backgroundColor:#f2f2f2; borderStyle: solid; borderWidth: 1.5; borderLeftWidth: 0; borderTopWidth: 0; borderRightWidth: 0;
        `;
        const TRB2 = styled.View`
        flexDirection: row; backgroundColor:#f2f2f2; borderStyle: solid; borderWidth: 0;
        `;
        const TR = styled.View`
        flexDirection: row; borderStyle: solid; borderWidth: 1.5; borderLeftWidth: 0; borderTopWidth: 0; borderRightWidth: 0;
        `;
        const TR2 = styled.View`
        flexDirection: row; borderStyle: dashed; borderWidth: 1.5; borderLeftWidth: 0; borderTopWidth: 0; borderRightWidth: 0; borderColor: grey;
        `;
        const TR3 = styled.View`
        flexDirection: row; borderStyle: solid; borderWidth: 0;
        `;
        const COL50 = styled.View`
        width: 50%; height:auto; marginVertical:auto;
        `;
        const TD100 = styled.View`
        width: 100%; height:auto;'
        `;
        const TD18 = styled.View`
        width: 18%; height:auto;'
        `;
        const TD54 = styled.View`
        width: 54%; height:auto;'
        `;
        const TD10 = styled.View`
        width: 10%; height:auto;'
        `;
        const TD64 = styled.View`
        width: 64%; height:auto;'
        `;
        const TTabla = styled.Text`
        fontSize: 8; fontFamily: Arial; text-transform: uppercase; margin-vertical:auto; margin-horizontal:auto; padding:5px;
        `;
        const TTablaAsig = styled.Text`
        margin-vertical:auto; margin-horizontal:5px; fontSize: 8; fontFamily: Arial; text-transform: uppercase;
        `;
        const TEncabezado = styled.Text`
        margin-horizontal: auto; margin-vertical:4px; fontSize: 10; fontFamily: BookAntiqua-Bold;
        `;
        const TEncabezadoAsig = styled.Text`
        margin-vertical:auto; margin-horizontal:4px; fontSize: 10; fontFamily: BookAntiqua-Bold;
        `;
        const styles = StyleSheet.create({
            pie:{
                borderTop:1.5,
                borderColor: "#4a7ebb",
                textAlign: 'center',
            },
            image: {
                marginVertical: 0,
                marginHorizontal: "auto",
                width:90,
                height:75,
            },
            espacio:{
                marginBottom:25
            },
            body: {
                paddingTop: 35,
                paddingBottom: 35,
                paddingHorizontal: 45,
                height:3295.28
            },
            title: {
                fontSize: 12,
                textAlign: 'center',
                fontFamily: 'BookAntiqua-Bold',
                paddingBottom: 3,
                borderBottom:2,
                marginBottom:25
            },
            encabezadoCuadro: {
                margin:4,
                fontSize: 10,
                fontFamily: 'BookAntiqua-Bold'
            },
            encabezadoPie: {
                marginTop:1,
                margin: 0.5,
                fontSize: 10,
                fontFamily: 'BookAntiqua-Bold'
            },
            textCuadro: {
                margin: 5,
                fontSize: 9,
                fontFamily: 'Arial',
                textTransform: "uppercase",
            },
            textPie: {
                margin: 0.5,
                fontSize: 10,
                fontFamily: 'BookAntiqua'
            },
            linea:{
                flexDirection: 'row'
            },
            cuadro:{
                border:1.5,
                backgroundColor:"#f2f2f2",
                paddingHorizontal:5
            },
            col3:{
            width: "25%"
            },
            col4 :{
            width: "33.3%"
            },
            col6: {
            width: "50%"
            },
            col8 :{
            width: "66.6%"
            },
        });

        var PDFConvalidacion = (
            <Document>
            <Page style={styles.body} size="Letter" orientation={"landscape"}>
                <Image
                    style={styles.image}
                    src={require("../../img/LogoGrande.jpg")}
                />
                <View style={styles.espacio}/>	
                <Text style={styles.title}>
                    Convalidación de Asignaturas
                </Text>
                <View style={styles.cuadro}>
                    <View style={styles.linea}>
                        <View style={styles.col4}>
                            <Text style={styles.encabezadoCuadro}>
                                Institución origen:
                            </Text>
                            <Text style={styles.encabezadoCuadro}>
                                Carrera de origen:
                            </Text>
                            <Text style={styles.encabezadoCuadro}>
                                Carrera de destino:
                            </Text>
                        </View>
                        <View style={styles.col8}>
                            <Text style={styles.textCuadro}>
                                {programaOrigen.universidad}
                            </Text>
                            <Text style={styles.textCuadro}>
                                {programaOrigen.nombre}
                            </Text>
                            <Text style={styles.textCuadro}>
                                {programaObjetivo.nombre}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.espacio}/>
                <AltoTable>
                    <Table> 
                        <TRB>
                            <COL50>
                                <TD100> 
                                    <TEncabezado>
                                        Asignatura Origen
                                    </TEncabezado>
                                </TD100> 
                            </COL50>
                            <COL50>
                                <TD100> 
                                    <TEncabezado>
                                        Asignatura Convalidada
                                    </TEncabezado> 
                                </TD100> 
                            </COL50>
                        </TRB>
                        <TRB2>
                            <COL50>
                                <TR>
                                    <TD18>
                                        <TEncabezado>
                                            Código
                                        </TEncabezado> 
                                    </TD18>
                                    <TD64>
                                        <TEncabezadoAsig>
                                            Asignatura
                                        </TEncabezadoAsig> 
                                    </TD64>
                                    <TD18>
                                        <TEncabezado>
                                            Nota
                                        </TEncabezado> 
                                    </TD18>
                                </TR>
                            </COL50>
                            <COL50>
                                <TR>
                                    <TD18>
                                        <TEncabezado>
                                            Código
                                        </TEncabezado> 
                                    </TD18>
                                    <TD54>
                                        <TEncabezadoAsig>
                                            Asignatura
                                        </TEncabezadoAsig> 
                                    </TD54>
                                    <TD18>
                                        <TEncabezado>
                                            Créditos
                                        </TEncabezado>  
                                    </TD18>
                                    <TD10>
                                        <TEncabezado>
                                            Nota
                                        </TEncabezado> 
                                    </TD10>
                                </TR>
                            </COL50>
                        </TRB2>
                        { 
                            ListaAsignaturasEncontradas.map((equivalencia, index)=>(
                                <TR>
                                    <COL50>
                                    {
                                        equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                                            index+1 === equivalencia.asignaturasOrigen.length?
                                                <TR3>
                                                    <TD18>
                                                        <TTabla>
                                                            {asignatura.codigo}
                                                        </TTabla>
                                                    </TD18>
                                                    <TD64>
                                                        <TTablaAsig>
                                                            {asignatura.nombre}
                                                        </TTablaAsig>
                                                    </TD64>
                                                    <TD18>
                                                        <TTabla>
                                                            0.0
                                                        </TTabla>
                                                    </TD18>
                                                </TR3>
                                            :
                                                <TR2>
                                                    <TD18>
                                                        <TTabla>
                                                            {asignatura.codigo}
                                                        </TTabla>
                                                    </TD18>
                                                    <TD64>
                                                        <TTablaAsig>
                                                            {asignatura.nombre}
                                                        </TTablaAsig>
                                                    </TD64>
                                                    <TD18>
                                                        <TTabla>
                                                            0.0
                                                        </TTabla>
                                                    </TD18>
                                                </TR2>
                                        ))
                                    }
                                    </COL50>
                                    <COL50>
                                    {
                                        equivalencia.asignaturasObjetivo.map((asignatura, index)=>(
                                            index+1 === equivalencia.asignaturasObjetivo.length?
                                                <TR3>
                                                    <TD18>
                                                        <TTabla>
                                                            {asignatura.codigo}
                                                        </TTabla>
                                                    </TD18>
                                                    <TD54>
                                                        <TTablaAsig>
                                                            {asignatura.nombre}
                                                        </TTablaAsig>
                                                    </TD54>
                                                    <TD18>
                                                        <TTabla>
                                                            {asignatura.creditos}
                                                        </TTabla>
                                                    </TD18>
                                                    <TD10>
                                                        <TTabla>
                                                            0.0
                                                        </TTabla>
                                                    </TD10>
                                                </TR3>
                                            :
                                                <TR2>
                                                    <TD18>
                                                        <TTabla>
                                                            {asignatura.codigo}
                                                        </TTabla>
                                                    </TD18>
                                                    <TD54>
                                                        <TTablaAsig>
                                                            {asignatura.nombre}
                                                        </TTablaAsig>
                                                    </TD54>
                                                    <TD18>
                                                        <TTabla>
                                                            {asignatura.creditos}
                                                        </TTabla>
                                                    </TD18>
                                                    <TD10>
                                                        <TTabla>
                                                            0.0
                                                        </TTabla>
                                                    </TD10>
                                                </TR2>
                                        ))
                                    }
                                    </COL50>
                                </TR>
                            ))
                        }
                    </Table>
                </AltoTable>
                <View style={styles.espacio}/>
                    <View style={styles.linea}>
                        <View style={styles.col3}></View>
                        <View style={styles.col6}>
                            <View style={styles.pie}>
                                <Text style={styles.encabezadoPie}>
                                    {usuario.nombre+" "+usuario.apellido}
                                </Text>
                                <Text style={styles.textPie}>
                                    Secretario Académico
                                </Text>
                                <Text style={styles.textPie}>
                                    Facultad de Ingenieria
                                </Text>
                                <Text style={styles.textPie}>
                                    Universidad Andrés Bello
                                </Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        );
        
        var formData = new FormData()
        pdf(PDFConvalidacion).toBlob()
        .then(respuesta=>{
            formData.append("archivo", respuesta, "Convalidación.pdf")
            clienteAxios.post(`/api/Solicitud/RevicionHomologacion/${email}/${usuario.email}`, formData,{
                headers: {
                    'Authorization': token
                  }
            })
            .then(respuesta => {
                // ---------------Cerrar Modal---------------
                setLoading(false)
                dispatch(alertaAction({mensaje:"Exito al Enviar Convalidación", segundos:2, color:"verde"}))
            })
            .catch(error=>{
                setLoading(false)
                if(error.response !== undefined){
                    if(error.response.data === "TokenNoValido"){
                        dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                        dispatch(DataUsuarioConectadoAction({}))
                        dispatch(UsuarioConectadoAction(false))
                    }else {
                        dispatch(alertaAction({mensaje:"Error al Enviar Convalidación", segundos:4, color:"rojo" }))
                    }
                }else{
                    dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
                }
            })
        })
    }
    const handleChangeDestinatario = e => {
        setDestinatarioSeleccionado(
            e.target.value
        )
    }
    const obtenerDatos = () =>{
        if((programaOrigen !== null) && (programaObjetivo !== null) && (programaOrigen !== programaObjetivo)){
            buscarEquivalencias()
        }
    }
    const ModalFormHomologacion = (props)=> {
        return (
          <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Convalidación
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (ListaAsignaturasEncontradas !== null && programaOrigen !== null && programaObjetivo !== null && programaOrigen !== programaObjetivo)&&
                    <FormHomologacion
                        editar = {false}
                        programaOrigen = {programaOrigen}
                        programaObjetivo = {programaObjetivo}
                    />
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        );
    }
    // useEffect
    useEffect(()=>{
        obtenerDatos()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[programaOrigen, programaObjetivo]);
    //---------------Retorno---------------
    return (
        <React.Fragment>
            <Container>
                    {/* Contenido */}
                <Row>
                    <Col>
                        <h4>Convalidar</h4>
                    </Col>
                </Row>
                <Row>
                    {/* Programa 1 */}
                    <Col>
                        <Row>
                        <Col>
                            <Form.Label>Seleccionar Programa Externo Origen</Form.Label>
                            <Select options={opcionesExternas} onChange={clickEnListaEditarOrigen} placeholder="Seleccionar..."/>
                            <br/>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            {   
                                programaOrigen !== null&&
                                <ListaAsignaturasExternas
                                    key={"1"+programaOrigen.codigo}
                                    indexListaAsignaturasExternas = {"1"+programaOrigen.codigo}
                                    listaAsignaturasExternas = {listaAsigEnviarOrigen}
                                    soloMostrar = {true}
                                    desabilitar = { programaOrigen !== null && programaObjetivo !== null && programaOrigen === programaObjetivo }
                                />
                            }
                        </Col>
                        </Row>
                    </Col>
                    {/* Programa 2 */}
                    <Col>
                    <Row>
                        <Col>
                        <Form.Label>Seleccionar Programa Objetivo</Form.Label>
                            <Select options={opciones} onChange={clickEnListaEditarObjetivo} placeholder="Seleccionar..."/>
                            <br/>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            {   
                                programaObjetivo !== null&&
                                <ListaAsignaturas 
                                    key = {"2"+programaObjetivo.codigo}
                                    indexListaAsignatura = {"2"+programaObjetivo.codigo}
                                    listaAsignaturas = {listaAsigEnviarObjetivo}
                                    soloMostrar = {true}
                                    desabilitar = { programaOrigen !== null && programaObjetivo !== null && programaOrigen === programaObjetivo }
                                />
                            }
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        {
                            (programaOrigen == null)&&
                            <Button
                                type="button" 
                                bsPrefix="btn colorBH" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("Programas Externos"))
                                        dispatch(idModuloAction(idsModulos.programasExternos))
                                    }
                                }
                            > 
                                Agregar nuevo programa externo
                            </Button>
                        }
                    </Col>

                    <Col md="auto">
                    {/* Establecer Equivalencia */}
                        {
                            (ListaAsignaturasSeleccionadas.length > 0 && programaOrigen !== null && programaObjetivo !== null && programaOrigen !== programaObjetivo)&&
                            <Button className="colorBH" onClick={()=>{establecerEquivalencia()}}>Establecer Equivalencia</Button>
                        }
                    </Col>
                    <Col md="auto">
                    {/* GenerarConvalidacion */}
                        {
                            (ListaAsignaturasEncontradas !== null && programaOrigen !== null && programaObjetivo !== null && programaOrigen !== programaObjetivo)&&
                            <Button className="colorBH" onClick={() => {setModalShow(true)}}>Agregar Convalidación</Button>
                        }
                        <ModalFormHomologacion
                            show={modalShow}
                            onHide={() => {setModalShow(false);dispatch(recuperarAsignaturasGuardadasAction())}}
                        />
                    </Col>
                    <Col md="auto">
                    {
                        (ListaAsignaturasEncontradas !== null && programaOrigen !== null && programaObjetivo !== null && programaOrigen !== programaObjetivo)&&
                        <Form onSubmit = {HandleEnviarHomologacion}>
                            <Row>
                                <Col>
                                    <Form.Control as="select" value="" required onChange={handleChangeDestinatario}>
                                        <option value={destinatarioSeleccionado} disabled> Seleccionar Destinatario </option>
                                        {   
                                            ListaDestinatarios.map( (destinatario, index) =>(
                                                //hace con value = index si necesita el destinatario como objetio y obtener en handelchange
                                                destinatario.tipoUsuario ==="SecretarioAcademico" && <option key={index} value ={destinatario.email}>{destinatario.nombre+" "+destinatario.apellido+" "+destinatario.area}</option>
                                            ))
                                        }
                                        {
                                            ListaUsuarios.map((usuario, index) =>(
                                                //hace con value = index si necesita el destinatario como objetio y obtener en handelchange
                                                usuario.tipoUsuario ==="SecretarioAcademico" && <option key={index} value ={usuario.email}>{usuario.nombre+" "+usuario.apellido+" "+usuario.area}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Button
                                        className="colorBH"
                                        title = "Solicitar revisión de Convalidación"
                                        type = "submit"
                                        variant="primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Enviando…' : <React.Fragment><i className="fas fa-share-square"/>{" Solicitar revición de Convalidación"}</React.Fragment> }
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    }
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <br/>
                        <h4>Equivalentes:</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Asignaturas Origen</th>
                                    <th>Codigo Origen</th>
                                    <th>Asignaturas Objetivo</th>
                                    <th>Codigo Objetivo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (ListaAsignaturasEncontradas !== null && programaOrigen !== null && programaObjetivo !== null && programaOrigen !== programaObjetivo)&&
                                    ListaAsignaturasEncontradas.map((equivalencia, index) =>(
                                        <MostrarEquivalencia
                                            equiparando = {false}
                                            TconvalidacionFhomologacion = {false}
                                            programaOrigen = {programaOrigen.codigo}
                                            programaObjetivo = {programaObjetivo.codigo}
                                            equivalencia = {equivalencia}
                                            index = {index}
                                            key = {ListaAsignaturasEncontradas.indexOf(equivalencia)}
                                        />
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
 
export default Homologar;