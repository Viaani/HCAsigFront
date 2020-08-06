import React,{ useEffect } from 'react';
//Redux
import { useSelector } from 'react-redux';
//Rutas
// import {Route, Switch} from 'react-router-dom';
//Componentes
import Programas from '../Modulos/Programas';
import Decretos from '../Modulos/Decretos';
import Comparar from '../Modulos/Comparar';
import ProgramasExternos from '../Modulos/ProgramasExternos';
import Usuarios from '../Modulos/Usuarios';
import Destinatarios from '../Modulos/Destinatarios';
import Indicadores from '../Modulos/Indicadores';
import FormUsuarios from '../Usuarios/FormUsuarios';

const Contenido = () => {
    //---------------Atributos---------------
    //store
    const menuAbrir = useSelector((state)=> state.generalStore.menuAbrir);
    const idModulo = useSelector((state)=> state.generalStore.idModulo);
    const idsModulos = useSelector((state)=> state.generalStore.modulos);
    //---------------Funciones---------------
    
    //useEffect
    useEffect(()=>{},[menuAbrir]);

    //---------------Retorno---------------
    return (
        <div className={menuAbrir? "contenido contenidoAbierto":"contenido"}>
            {idModulo===idsModulos.indicadores && <Indicadores/>}

            {idModulo===idsModulos.programas && <Programas/>}

            {idModulo===idsModulos.decretos && <Decretos/>}

            {idModulo===idsModulos.comparar && <Comparar/>}

            {idModulo===idsModulos.programasExternos && <ProgramasExternos/>}

            {idModulo===idsModulos.usuarios && <Usuarios/>}

            {idModulo===idsModulos.destinatario && <Destinatarios/>}

            {idModulo===idsModulos.editarUsuario && <FormUsuarios editar = {true}/>}
        </div>
     );
}
 
export default Contenido;