import React, { Fragment, useEffect } from 'react';
//Axios
import clienteAxios from '../../Config/Axios';
// redux 
import { useSelector, useDispatch } from 'react-redux';
import { obtenerIndicadoresAction } from '../../Redux/Acciones/IndicadoresAction'
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Canvas js
import CanvasJSReact from '../../Styles/CanvasJS/canvasjs.react';
// react bootstrap
import { Container, Row, Col } from 'react-bootstrap';

const Indicadores = () => {
    //Atributos
    const dispatch = useDispatch();
    const token =  useSelector((state)=>state.usuariosStore.dataUsuarioConectado.token)
    const indicadores = useSelector((state)=>state.indicadoresStore.indicadores)

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    CanvasJS.addColorSet("unabColor1",[
        "#1a2a5f","#9d1515","#192d36"
    ]);
    
    const options = {
        colorSet:"unabColor1",
        animationEnabled: true,
			theme: "light1",
			title: {
                text:"Cantidad de elementos en el sistema",
                fontFamily:"arial",
                fontSize: 25,
            },
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  indicadores.cantidadProgramas, label: "Programas" },
					{ y:  indicadores.cantidadProgramasExternos, label: "Programas Externos " },
					{ y:  indicadores.cantidadDecretos, label: "Decretos" },
					{ y:  indicadores.cantidadHomologaciones, label: "Convalidaciones" },
					{ y:  indicadores.cantidadConvalidaciones, label: "Homologaciones" }
				]
			}]
    }

    const chart = {
        animationEnabled: true,
        title: {
            text:"Convalidaciones/Homologaciones por usuario",
            fontFamily:"arial",
            fontSize: 25,
        },
        data: [{
            type: "bar",
            showInLegend: true,
            name: "Total",
            color: "#1a2a5f",
            dataPoints:indicadores.cantidadEquivalenciasUsuario !== undefined && indicadores.cantidadEquivalenciasUsuario.map( ceu =>(
                { y:ceu.cantidadConvalidaciones+ceu.cantidadHomologaciones, label:ceu.secretarioAcademico }
            ) )
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Homologaciones",
            color: "#9d1515",
            dataPoints:indicadores.cantidadEquivalenciasUsuario !== undefined && indicadores.cantidadEquivalenciasUsuario.map( ceu =>(
                { y:ceu.cantidadConvalidaciones, label:ceu.secretarioAcademico }
            ) )
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Convalidacion",
            color: "#192d36",
            dataPoints:indicadores.cantidadEquivalenciasUsuario !== undefined && indicadores.cantidadEquivalenciasUsuario.map( ceu =>(
                { y:ceu.cantidadHomologaciones, label:ceu.secretarioAcademico }
            ) )
        }]
    }

    const obtenerIndicadores = () => {
        clienteAxios.get('api/Indicadores',{
            headers: {
                'Authorization': token
            }
        })
        .then(respuesta => {
            //si se obtiene correctamente
            dispatch(obtenerIndicadoresAction(respuesta.data));            
        })
        .catch(error=>{
            if(error.response !== undefined){
                if(error.response.data === "TokenNoValido"){
                    dispatch(alertaAction({mensaje:"La sesión actual ha expirado", segundos:4, color:"rojo"}))
                    dispatch(DataUsuarioConectadoAction({}))
                    dispatch(UsuarioConectadoAction(false))
                }else {
                    dispatch(alertaAction({mensaje:"Error al obtener Decretos", segundos:4, color:"rojo" }))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }

    const obtenerDatos = () =>{
        obtenerIndicadores()
    }
    // useEffect
    useEffect(()=>{
        obtenerDatos()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return ( 
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <h2>Indicadores</h2>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CanvasJSChart options = {options}/>
                    </Col>
                    <Col>
                        <CanvasJSChart options = {chart}/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
 
export default Indicadores;