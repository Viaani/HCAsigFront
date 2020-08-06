import React from 'react';

const Boton = ({estilo, texto, icono, funcion, title}) => {
    //---------------Atributos---------------

    //---------------Funciones---------------

    //---------------Retorno---------------
    return ( 
        <div className={estilo} onClick={funcion} title={title}>
            <i className = {icono}></i>{texto}
        </div>
     );
}
 
export default Boton;