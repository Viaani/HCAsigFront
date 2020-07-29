import React,{ useState, useEffect } from 'react';
//Redux
import { useDispatch } from 'react-redux';
import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
import { alertaAction, idModuloAction, cambiarTituloAction } from '../../Redux/Acciones/GeneralAction';
//Axios
import clienteAxios from '../../Config/Axios'
//Componentes
import Boton from '../General/Boton';
//bootstrao
import {Image, Row, Col} from 'react-bootstrap'

const LoginUsuario = () => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    const [credenciales, setCredenciales] = useState({
        email:'',
        password:''
    });
    // const [dataUsuariosConectado, setDataUsuariosConectado] = useState({
    //     token:'',
    //     nombre:'',
    //     apellido:'',
    //     run:'',
    //     email:'',
    //     area:'',
    //     tipoUsuario:''
    // });
    //---------------Funciones---------------
    const verificarCredenciales = (credenciales)=>{
        console.log(credenciales);
        clienteAxios.post('/api/Usuario/Autentificar/',credenciales)
        .then(respuesta => {
            console.log(respuesta.data);
            //si se inserta correctamente
            dispatch(cambiarTituloAction("HCAsignaturas"))
            dispatch(idModuloAction(0))
            dispatch(DataUsuarioConectadoAction(respuesta.data))
            dispatch(alertaAction({mensaje:"Exito al Iniciar Sesión", segundos:2, color:"verde"}))
            dispatch(UsuarioConectadoAction(true))
        })
        .catch(error=>{
            console.log(error.response);

            if(error.response !== undefined){
                if(error.response.data === "NoExiste"){
                    dispatch(alertaAction({mensaje:"El correo electrónico y/o contraseña que ingresado no coincide con ninguna cuenta", segundos:4}))
                }
                if(error.response.data === "Error"){
                    dispatch(alertaAction({mensaje:"Error al Iniciar Sesión", segundos:4, color:"rojo"}))
                }
            }else{
                dispatch(alertaAction({mensaje:"Error de conección con API", segundos:4, color:"rojo"}))
            }
        })
    }
    const submitCredenciales = e =>{
        e.preventDefault();
        if(credenciales.email === '' || credenciales.password === '') {
            dispatch(alertaAction({mensaje:"Todos los campos son obligatorios", segundos: 2}))
            return
        }
        verificarCredenciales(credenciales)
    }
    const handleChange = e => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }
    //--------------- useEffect---------------
    useEffect(()=>{
    },[]);

    //---------------Retorno---------------
    return ( 
        <React.Fragment>
        <div className="imagenFondo"></div>
        
        <Row>
            <Col>
                <div className ="w3-margin">
                    <Image src={require("../../img/cropped-LOGO-NUEVO-2.png")} rounded/>
                </div>
            </Col>
        </Row>
        <div className = "w3-display-container w3-row" >
            <div className = "w3-display-topmiddle w3-col m10 l5">
                <div className="w3-bar colorA w3-round w3-section">
                    <div className = "tituloLogin w3-section"> HCAsignaturas </div>
                </div>
                <div className = "w3-display-container w3-row">
                    <div className = "w3-col w3-display-topmiddle">
                        <div className ="colorA w3-round w3-padding">
                            <div className = "w3-row w3-section">
                            <div className = "w3-col w3-large w3-center">{"Iniciar Sesión"}</div>
                            </div>
                            {/* ---------------Form Programa--------------- */}
                            <form className ="w3-row flex-container-center">
                                <div className = "w3-col s10 m9 l8">       
                                    {/* ---------------input Email--------------- */}
                                    <div className = "w3-row w3-section">
                                        <div className = "w3-col m7 l4">
                                            <div className = "textoInput">Email:</div>
                                        </div>
                                        <div className = "w3-col m5 l8">
                                            <input
                                                type = "text"
                                                className = "formPrograma"
                                                placeholder = "Email Usuario"
                                                name = "email"
                                                value = {credenciales.email}
                                                onChange = {handleChange}
                                            />
                                        </div>
                                    </div> 
                                    {/* ---------------input contraseña--------------- */}
                                    <div className = "w3-row w3-section">
                                        <div className = "w3-col m7 l4">
                                            <div className = "textoInput">Contraseña:</div>
                                        </div>
                                        <div className = "w3-col m5 l8">
                                            <input
                                                type = "password"
                                                className = "formPrograma"
                                                placeholder = "Contraseña Usuario"
                                                name = "password"
                                                value = {credenciales.password}
                                                onChange = {handleChange}
                                            />
                                        </div>
                                    </div>     
                                    <div className = "w3-row">
                                        <div className = "w3-col s1 m1 l1 w3-right">
                                            <Boton
                                                estilo = "botonAceptar w3-section colorBH"
                                                texto = {"Aceptar"}
                                                // funcion = {editar? submitUsuarioEditado : submitNuevoUsuario}
                                                funcion = {submitCredenciales}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
     );
}
 
export default LoginUsuario;