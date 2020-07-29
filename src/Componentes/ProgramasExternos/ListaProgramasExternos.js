import React from 'react';
// //Axios
// import clienteAxios from '../../Config/Axios';
//Redux
import { useSelector } from 'react-redux';
//react-Bootstrap
import { Accordion } from 'react-bootstrap';
// import { ObtenerProgramasExternosAction } from '../../Redux/Acciones/ProgramasAction';
// import { DataUsuarioConectadoAction, UsuarioConectadoAction } from '../../Redux/Acciones/UsuariosAction';
// import { alertaAction } from '../../Redux/Acciones/GeneralAction';
//Componentes
import VerProgramaExterno from './VerProgramaExterno';

const ListaProgramasExternos = () => {
    //---------------Atributos---------------
    const programasExternos = useSelector((state)=>state.programasStore.programasExternos)
    //---------------Retorno---------------
    return (
        <Accordion>
        {   
            programasExternos !== undefined &&
            programasExternos.map( (programaExterno, index) =>(
                <VerProgramaExterno
                    programaExternoProp = {programaExterno}
                    key = {index}
                    indexVerProgramaExterno = {index}
                />
            ))
        }
        </Accordion>
     );
}
 
export default ListaProgramasExternos;