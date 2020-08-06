import React,{ useEffect } from 'react';
//react bootstrap
import { Table } from 'react-bootstrap';
//Redux
import { useDispatch } from 'react-redux';
import { eliminarAsignaturasSeleccionadasErroneasExtraAction } from '../../Redux/Acciones/AsignaturasAction';
//Componentes
import VerAsignaturaComparar from '../Asignaturas/VerAsignaturaComparar'
import VerAsignaturaExterna from './VerAsignaturaExterna';

const ListaAsignaturasExternas = ({indexListaAsignaturasExternas, listaAsignaturasExternas, soloMostrar, desabilitar}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    //---------------Funciones---------------
    useEffect(()=>{
        return function limpiar() {
            if(listaAsignaturasExternas !== undefined){
                if(listaAsignaturasExternas.length > 0 && !desabilitar){
                    return dispatch(eliminarAsignaturasSeleccionadasErroneasExtraAction(listaAsignaturasExternas[0].codigo_ProgramaExterno))
                }
            }
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    //---------------Retorno---------------
    return ( 
        <Table striped bordered responsive hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Codigo</th>
                    <th>Creditos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    listaAsignaturasExternas !== null &&
                    listaAsignaturasExternas.map((asignaturaExterna, index)=>(
                        soloMostrar?
                            <VerAsignaturaComparar
                                indexVerAsignaturaComparar = {indexListaAsignaturasExternas+index+"1"}
                                indexSolo = {index}
                                asignaturaExterna = {asignaturaExterna}
                                key = {index}
                                conAsigExterna = {true}
                                desabilitar = {desabilitar}
                            />
                        :
                            <VerAsignaturaExterna
                                indexVerAsignaturaExterna = {indexListaAsignaturasExternas+index+"2"}
                                indexSolo = {index}
                                asignaturaExterna = {asignaturaExterna}
                                key = {index}
                            />
                    ))
                }
            </tbody>
        </Table>
     );
}
 
export default ListaAsignaturasExternas;