import React from 'react';
//react-Bootstrap
import { Accordion } from 'react-bootstrap';
//Redux
import { useSelector } from 'react-redux';
//Componentes
import VerHomologacion from './VerHomologacion';

const ListaHomologaciones = () => {
    //---------------Atributos---------------
    const homologaciones = useSelector((state)=>state.homologacionesStore.homologaciones)
    //Retorno
    return (
        <Accordion>
            {   
                homologaciones !== undefined &&
                    homologaciones.map( (homologacion, index) =>(
                        <VerHomologacion
                            homologacion = {homologacion}
                            indexVerHomologacion = {index}
                            key = {index}
                        />
                    ))
            }
        </Accordion>
    );
}
 
export default ListaHomologaciones;