import React from 'react';
//react-Bootstrap
import { Table } from 'react-bootstrap';
//Redux
import { useSelector } from 'react-redux';
//Componentes
import VerPrograma from './VerPrograma';

const ListaProgramas = () => {
    //---------------Atributos---------------
    const programas = useSelector((state)=>state.programasStore.programas)

    //---------------Funciones---------------
    
    //---------------Retorno---------------
    return ( 
        <Table striped borderless hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Decreto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    programas.map(programa =>(
                        <VerPrograma
                            programa = { programa }
                            key = {programa.codigo}
                        />
                    ))
                }
            </tbody>
        </Table>
     );
}
 
export default ListaProgramas;