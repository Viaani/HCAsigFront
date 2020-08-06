import React,{useEffect} from 'react';
//react bootstrap
import { Table } from 'react-bootstrap';
//Redux
import { useDispatch } from 'react-redux';
import { eliminarAsignaturasSeleccionadasErroneasAction } from '../../Redux/Acciones/AsignaturasAction';
//Componentes
import VerAsignatura from './VerAsignatura';
import VerAsignaturaComparar from './VerAsignaturaComparar';

const ListaAsignaturas = ({indexListaAsignatura, listaAsignaturas, soloMostrar, desabilitar}) => {
    //---------------Atributos---------------
    const dispatch = useDispatch();
    //---------------Funciones---------------
    useEffect(()=>{
        return function limpiar() {
            if(listaAsignaturas !== undefined){
                if(listaAsignaturas.length > 0 && !desabilitar){
                    return dispatch(eliminarAsignaturasSeleccionadasErroneasAction(listaAsignaturas[0].numeroDecreto))
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
                    listaAsignaturas !== null &&
                        listaAsignaturas.map((asignatura, index)=>(
                            soloMostrar?
                                <VerAsignaturaComparar
                                    indexVerAsignaturaComparar = {indexListaAsignatura+index+"1"}
                                    indexSolo = {index}
                                    asignatura = {asignatura}
                                    key = {index}
                                    conAsigExterna = {false}
                                    desabilitar = {desabilitar}
                                />
                            :
                                <VerAsignatura
                                    indexVerAsignatura = {indexListaAsignatura+index+"2"}
                                    indexSolo = {index}
                                    asignatura = {asignatura}
                                    key = {index}
                                />
                        ))
                }
            </tbody>
        </Table>
     );
}
 
export default ListaAsignaturas;