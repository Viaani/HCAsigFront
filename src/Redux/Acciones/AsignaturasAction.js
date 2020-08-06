
// ---------------- Asignaturas ----------------
export const agregarAsignaturaAction = (Asignatura) => {
    return {
        type:'AgregarAsignatura',
        payload: Asignatura
    }
}

export const ObtenerAsignaturasAction = (Asignaturas) =>{
    return {
        type:'ObtenerAsignaturas',
        payload: Asignaturas
    }
}
export const EliminarAsignaturaAction = (codigo) =>{
    return{
        type:'EliminarAsignatura',
        payload: codigo
    }
}
export const EditarAsignaturaAction = (id, Asignatura)=>{
    return{
        type:'EditarAsignatura',
        payload:{
            id:id,
            Asignatura:Asignatura
        }
    }
}
 // ---------------- Asignaturas Seleccionadas----------------
// Seleccion de asignaturas de Modulo Comparación
export const agregarAsignaturaSeleccionadaAction = (AsignaturaSeleccionada) => {
    return {
        type:'AgregarAsignaturaSeleccionada',
        payload: AsignaturaSeleccionada
    }
}

export const ObtenerAsignaturaSeleccionadaAction = (AsignaturaSeleccionadas) =>{
    return {
        type:'ObtenerAsignaturaSeleccionadas',
        payload: AsignaturaSeleccionadas
    }
}
export const eliminarAsignaturaSeleccionadaAction = (codigo) =>{
    return{
        type:'eliminarAsignaturaSeleccionada',
        payload: codigo
    }
}
export const eliminarAsignaturasSeleccionadasErroneasAction = (numeroDecreto) =>{
    return{
        type:'eliminarAsignaturasSeleccionadasErroneas',
        payload: numeroDecreto
    }
}
export const eliminarAsignaturasSeleccionadasErroneasExtraAction = (codigo_ProgramaExterno) =>{
    return{
        type:'eliminarAsignaturasSeleccionadasErroneasExtra',
        payload: codigo_ProgramaExterno
    }
}

// ---------------- ASignaturas Encontradas / Guardadas ----------------
export const ObtenerAsignaturasEncontradasAction = (listaAsignaturasEncontradas) => {
    return {
        type:'ObtenerAsignaturasEncontradas',
        payload: listaAsignaturasEncontradas
    }
}
export const eliminarAsignaturaEncontradaAction = (codigoAsignatura) =>{
    return{
        type:'eliminarAsignaturaEncontrada',
        payload: codigoAsignatura
    }
}
export const eliminarAsignaturaGuardadaAction = (codigoAsignatura) =>{
    return{
        type:'eliminarAsignaturaGuardada',
        payload: codigoAsignatura
    }
}
export const recuperarAsignaturasGuardadasAction = () =>{
    return{
        type:'recuperarAsignaturasGuardadas'
    }
}