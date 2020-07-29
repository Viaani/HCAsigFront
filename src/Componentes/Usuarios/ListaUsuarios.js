import React from 'react';
//react-Bootstrap
import { Table } from 'react-bootstrap';
//Redux
import { useSelector } from 'react-redux';
//Componentes
import VerUsuario from './VerUsuario';

const ListaUsuarios = () => {
    //---------------Atributos---------------
    const usuarios = useSelector((state)=>state.usuariosStore.usuarios)
    //---------------Retorno---------------
    return ( 
        <Table striped borderless responsive hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Tipo Usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(usuario =>(
                    <VerUsuario
                        usuario = {usuario}
                        key = {usuarios.indexOf(usuario)}
                    />
                ))}
            </tbody>
        </Table>
    );
}
 
export default ListaUsuarios;