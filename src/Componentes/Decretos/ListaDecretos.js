import React from 'react';
//Redux
import { useSelector } from 'react-redux';
//react-Bootstrap
import { Accordion } from 'react-bootstrap';
import VerDecreto from './VerDecreto';

const ListaDecretos = () => {
    //---------------Atributos---------------
    const decretos = useSelector((state)=>state.decretosStore.decretos)

    //---------------Retorno---------------
    return ( 
        <Accordion>
        {   
            decretos !== undefined &&
            decretos.map( (decreto, index) =>(
                <VerDecreto
                    decretoProp = {decreto}
                    key = {index}
                    indexDecreto = {index}
                />
            ))
        }
        </Accordion>
     );
}
 
export default ListaDecretos;