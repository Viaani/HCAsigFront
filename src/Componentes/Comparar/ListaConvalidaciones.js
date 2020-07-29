import React from 'react';
//react-Bootstrap
import { Accordion } from 'react-bootstrap';
//Axios
// import clienteAxios from '../../Config/Axios';
//Redux
import { useSelector } from 'react-redux';
// import { obtenerConvalidacionesAction } from '../../Redux/Acciones/ConvalidacionAction';
// import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
// import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
import VerConvalidacion from './VerConvalidacion';


const ListaConvalidaciones = () => {
    //---------------Atributos---------------
    const convalidaciones = useSelector((state)=>state.convalidacionesStore.convalidaciones)
    //Retorno
    return ( 
        <Accordion>
            {   
                convalidaciones !== undefined &&
                    convalidaciones.map( (convalidacion, index) =>(
                        <VerConvalidacion
                            convalidacion = {convalidacion}
                            indexVerConvalidacion = {index}
                            key = {index}
                        />
                    ))
            }
        </Accordion>
    );
}
 
export default ListaConvalidaciones;