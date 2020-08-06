import React from 'react';
//Redux
import { useSelector } from 'react-redux';
//Componentes
import VerDestinatario from './VerDestinatario';

const ListaDestinatario = () => {
    //---------------Atributos---------------
    const destinatarios = useSelector((state)=>state.destinatariosStore.destinatarios)
    //---------------Retorno---------------
    return ( 
        <React.Fragment>
            {
                destinatarios.map((destinatario, index)=>(
                    <VerDestinatario
                        destinatario = {destinatario}
                        indexVerDestinatario = {index+1}
                        key = {index}
                    />
                ))
                
            }
        </React.Fragment>
     );
}
 
export default ListaDestinatario;