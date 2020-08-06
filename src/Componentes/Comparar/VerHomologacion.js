import React,{ useState } from 'react';
//react bootstrap
import { Card, Button, Accordion, Table, ButtonGroup, Form , Row, Col } from 'react-bootstrap';
//Axios
import clienteAxios from '../../Config/Axios';
//Redux
import { useDispatch , useSelector} from 'react-redux';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
import { eliminarHomologacionAction } from '../../Redux/Acciones/HomologacionAction';
// pdf
import { Page, Text, View, Document, StyleSheet, Image, Font, pdf } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';//Componentes
// import Boton from '../General/Boton';
// import MostrarEquivalencia from './MostrarEquivalencia';

const VerHomologacion = ({homologacion, indexVerHomologacion}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const usuario = useSelector((state)=>state.usuariosStore.dataUsuarioConectado)
    const [isLoading, setLoading] = useState(false);
    const [destinatarioSeleccionado, setDestinatarioSeleccionado] = useState("")
    const ListaDestinatarios = useSelector((state)=>state.destinatariosStore.destinatarios)
    //---------------Funciones---------------
    const eliminarHomologacion = (id) => {
        clienteAxios.delete(`/api/Homologacion/${id}`,{
            headers: {
                'Authorization': token
              }
        })
            .then(respuesta => {
                dispatch(eliminarHomologacionAction(id))
                dispatch(alertaAction({mensaje:"Exito al eliminar Convalidación", segundos:2, color:"verde"}))
            })
            .catch(error=>{
                if(error.response !== undefined){
                    if(error.response.data === "TokenNoValido"){
                        dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                        dispatch(DataUsuarioConectadoAction({}))
                        dispatch(UsuarioConectadoAction(false))
                    }else {
                        dispatch(alertaAction({mensaje:"Error al eliminar Convalidación", segundos:4, color:"rojo" }))
                    }
                }else{
                    dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
                }
            })
    }
    const handleChangeDestinatario = e => {
        setDestinatarioSeleccionado(
            e.target.value
        )
    }
    const EnviarHomologacion = (destinatarioSeleccionado) =>{
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
        
        const PDFHomologacion = (
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
                                    Nombre:
                                </Text>
                                <Text style={styles.encabezadoCuadro}>
                                    RUT:
                                </Text>
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
                                    {homologacion.nombre+" "+homologacion.apellido}
                                </Text>
                                <Text style={styles.textCuadro}>
                                    {homologacion.run}
                                </Text>
                                <Text style={styles.textCuadro}>
                                    {homologacion.programaOrigen.universidad}
                                </Text>
                                <Text style={styles.textCuadro}>
                                    {homologacion.programaOrigen.nombre}
                                </Text>
                                <Text style={styles.textCuadro}>
                                    {homologacion.programaObjetivo.nombre}
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
                            homologacion.listaAsignaturasEquivalentes.map((equivalencia, index)=>(
                                <TR key={index}>
                                    <COL50>
                                    {
                                        equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                                            index+1 === equivalencia.asignaturasOrigen.length?
                                                <TR3 key = {index}>
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
                                                            {parseFloat(asignatura.nota).toFixed(1)}
                                                        </TTabla>
                                                    </TD18>
                                                </TR3>
                                            :
                                                <TR2 key={index+"2"}>
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
                                                            {parseFloat(asignatura.nota).toFixed(1)}
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
                                                <TR3 key = {index+"3"}>
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
                                                            {parseFloat(equivalencia.nota).toFixed(1)}
                                                        </TTabla>
                                                    </TD10>
                                                </TR3>
                                            :
                                                <TR2 key = {index+"4"}>
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
                                                            {parseFloat(equivalencia.nota).toFixed(1)}
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
        pdf(PDFHomologacion).toBlob()
        .then(respuesta=>{
            formData.append("archivo", respuesta, "Convalidación.pdf")
            clienteAxios.post(`/api/Solicitud/OficiarHomologacion/${destinatarioSeleccionado}/${usuario.email}`, formData,{
            headers: {
                'Authorization': token
              }
            })
            .then(respuesta => {
                // ---------------Cerrar Modal---------------
                dispatch(alertaAction({mensaje:"Exito al Enviar Convalidación", segundos:2, color:"verde"}))
                setLoading(false)
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
    const HandleEnviarHomologacion = e => {
        e.preventDefault();
        setLoading(true);
        EnviarHomologacion(destinatarioSeleccionado)
    }
    //---------------Retorno---------------
    return (
        <Card>
            <Card.Header as ={Row}>
                <Col>
                    <Accordion.Toggle as = {Table} eventKey={indexVerHomologacion} striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Rut</th>
                                <th>Nombre</th>
                                <th>Programa Origen</th>
                                <th>Universidad</th>
                                <th>Programa Objetivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{homologacion.run}</td>
                                <td>{homologacion.nombre+" "+homologacion.apellido}</td>
                                <td>{homologacion.programaOrigen.nombre}</td>
                                <td>{homologacion.programaOrigen.universidad}</td>
                                <td>{homologacion.programaObjetivo.nombre}</td>
                            </tr>
                        </tbody>
                    </Accordion.Toggle>
                </Col>
                <Col xs = {2}>
                    <ButtonGroup as ={Form} onSubmit = {HandleEnviarHomologacion} vertical>
                        <ButtonGroup vertical>
                            <Form.Control as="select" value="" onChange={handleChangeDestinatario} required>
                                <option value={destinatarioSeleccionado} disabled> Seleccionar Destinatario </option>
                                {   
                                    ListaDestinatarios.map( (destinatario, index) =>(
                                        //hace con value = index si necesita el destinatario como objetio y obtener en handelchange
                                        destinatario.tipoUsuario ==="SecretarioAdministrativo" &&<option key={index} value ={destinatario.email}>{destinatario.nombre+" "+destinatario.apellido+" "+destinatario.area}</option>
                                    ))
                                }
                            </Form.Control>
                            <Button
                                title = "Enviar Convalidación a Secretario Administrativo"
                                type = "submit"
                                className="colorBH"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando…' : <i className="fas fa-share-square"></i>}
                            </Button>
                        </ButtonGroup>
                        <Button title="Eliminar Convalidación" onClick={()=>{eliminarHomologacion(homologacion.run)}} variant="danger"><i className="fas fa-trash-alt"></i></Button>
                    </ButtonGroup>
                </Col>
            </Card.Header>
            <Accordion.Collapse eventKey={indexVerHomologacion}>
                <Card.Body>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            homologacion.listaAsignaturasEquivalentes !== null &&
                                homologacion.listaAsignaturasEquivalentes.map((equivalencia, index)=>(
                                    <tr key = {index}>
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
                                                            equivalencia.asignaturasOrigen.map((asignatura, index)=>(
                                                                <li key ={index}>{parseFloat(asignatura.nota).toFixed(1)}</li>
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
                                                    { parseFloat(equivalencia.nota).toFixed(1) }
                                                </ul>
                                            }
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
     );
}
 
export default VerHomologacion;