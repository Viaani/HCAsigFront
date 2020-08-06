import React, { useEffect } from 'react';
//Redux
import { abrirMenuAction, cambiarTituloAction, desplegarDatosAction, idModuloAction } from '../../Redux/Acciones/GeneralAction';
import { useDispatch, useSelector } from 'react-redux';
//Rutas
// import {Link} from 'react-router-dom';
import Boton from '../General/Boton';
import {Image, Container, Row, Col} from 'react-bootstrap'
// import logo from '../../img/Logo-UNAB.png';

const Menu = () => {

    //---------------Atributos---------------

    //store
    const menuAbrir = useSelector((state)=> state.generalStore.menuAbrir);
    const desplegarDatos = useSelector((state)=> state.generalStore.desplegarDatos);
    const idsModulos = useSelector((state)=> state.generalStore.modulos);
    const tipoUsuario = useSelector((state)=>state.usuariosStore.dataUsuarioConectado.tipoUsuario)

    //---------------Funciones---------------
    
    //Acciones
    const dispatch = useDispatch();

    //useEffect
    useEffect(()=>{
    },[menuAbrir, desplegarDatos]);

    //---------------Retorno---------------
    return ( 
        <div>
            <div className={menuAbrir? "sidebar colorC sidebarAbierto":"sidebar colorC"}>
                <Boton
                    estilo = "BotonSidebarCerrar colorCH"
                    funcion = {()=>{dispatch(abrirMenuAction(!menuAbrir))}}
                    texto = ""
                    icono = "fa fa-times"
                />
                <Container>
                    <Row>
                        <Col>
                            <div className ="w3-section">
                                <Image src={require("../../img/cropped-LOGO-NUEVO-1.png")} rounded/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {
                    tipoUsuario === "Administrador" &&
                        <React.Fragment>
                            {
                                desplegarDatos?
                                    <Boton
                                        estilo = "BotonSidebar colorCH w3-topbar w3-bottombar w3-border-white"
                                        funcion = {()=>{dispatch(desplegarDatosAction(!desplegarDatos))}}
                                        texto = " Datos"
                                        icono = "fas fa-angle-down"
                                    />
                                :
                                    <Boton
                                        estilo = "BotonSidebar colorCH w3-topbar w3-bottombar w3-border-white"
                                        funcion = {()=>{dispatch(desplegarDatosAction(!desplegarDatos))}}
                                        texto = " Datos"
                                        icono = "fas fa-angle-right"
                                    />
                            }
                            {/* Desplegar */}
                            <div className={desplegarDatos?"w3-animate-opacity w3-show":"w3-hide"}>
                                {/* Programas */}
                                <div 
                                    className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                    onClick={
                                        ()=>{
                                            dispatch(idModuloAction(idsModulos.programas))
                                            dispatch(cambiarTituloAction("Programas"))
                                        }
                                    }
                                >
                                    Programas
                                </div>
                                {/* Programas Externos */}
                                <div 
                                    className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                    onClick={
                                        ()=>{
                                            dispatch(cambiarTituloAction("Programas Externos"))
                                            dispatch(idModuloAction(idsModulos.programasExternos))
                                        }
                                    }
                                >
                                    Programas Externos
                                </div>
                                {/* Decretos */}
                                <div 
                                    className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                    onClick={
                                        ()=>{
                                            dispatch(cambiarTituloAction("Decretos"))
                                            dispatch(idModuloAction(idsModulos.decretos))
                                        }
                                    }
                                >
                                    Decretos
                                </div>
                                <hr></hr>
                            </div>
                            {/* Comparar */}
                            <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("Comparar"))
                                        dispatch(idModuloAction(idsModulos.comparar))
                                    }
                                }
                            >
                                Comparar
                            </div>
                            {/* Usuarios */}
                            <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("Usuarios"))
                                        dispatch(idModuloAction(idsModulos.usuarios))
                                    }
                                }
                            >
                                Usuarios
                            </div>
                            {/* Destinatarios */}
                            <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("Destinatarios"))
                                        dispatch(idModuloAction(idsModulos.destinatario))
                                    }
                                }
                            >
                                Destinatarios
                            </div>

                             {/* Indicadores */}
                             <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("HCAsignaturas"))
                                        dispatch(idModuloAction(idsModulos.indicadores))
                                    }
                                }
                            >
                                Indicadores
                            </div>
                        </React.Fragment>
                }
                {
                    tipoUsuario === "SecretarioAcademico" &&
                        <React.Fragment>
                            {
                                desplegarDatos?
                                    <Boton
                                        estilo = "BotonSidebar colorCH w3-topbar w3-bottombar w3-border-white"
                                        funcion = {()=>{dispatch(desplegarDatosAction(!desplegarDatos))}}
                                        texto = " Datos"
                                        icono = "fas fa-angle-down"
                                    />
                                :
                                    <Boton
                                        estilo = "BotonSidebar colorCH w3-topbar w3-bottombar w3-border-white"
                                        funcion = {()=>{dispatch(desplegarDatosAction(!desplegarDatos))}}
                                        texto = " Datos"
                                        icono = "fas fa-angle-right"
                                    />
                            }
                            {/* Desplegar */}
                            <div className={desplegarDatos?"w3-animate-opacity w3-show":"w3-hide"}>
                                {/* Programas */}
                                <div 
                                    className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                    onClick={
                                        ()=>{
                                            dispatch(idModuloAction(idsModulos.programas))
                                            dispatch(cambiarTituloAction("Programas"))
                                        }
                                    }
                                >
                                    Programas
                                </div>

                                {/* Programas Externos */}
                                <div 
                                    className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                    onClick={
                                        ()=>{
                                            dispatch(cambiarTituloAction("Programas Externos"))
                                            dispatch(idModuloAction(idsModulos.programasExternos))
                                        }
                                    }
                                >
                                    Programas Externos
                                </div>

                                {/* Decretos */}
                                <div 
                                    className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                    onClick={
                                        ()=>{
                                            dispatch(cambiarTituloAction("Decretos"))
                                            dispatch(idModuloAction(idsModulos.decretos))
                                        }
                                    }
                                >
                                    Decretos
                                </div>
                                <hr></hr>

                            </div>
                            {/* Comparar */}
                            <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("Comparar"))
                                        dispatch(idModuloAction(idsModulos.comparar))
                                    }
                                }
                            >
                                Comparar
                            </div>
                           {/* Destinatarios */}
                           <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("Destinatarios"))
                                        dispatch(idModuloAction(idsModulos.destinatario))
                                    }
                                }
                            >
                                Destinatarios
                            </div>

                             {/* Indicadores */}
                             <div 
                                className="w3-round subBotonSidebar colorCH normLink w3-leftbar w3-border-white" 
                                onClick={
                                    ()=>{
                                        dispatch(cambiarTituloAction("HCAsignaturas"))
                                        dispatch(idModuloAction(idsModulos.indicadores))
                                    }
                                }
                            >
                                Indicadores
                            </div>
                        </React.Fragment>
                }
            </div>
        </div>
     );
}
 
export default Menu;