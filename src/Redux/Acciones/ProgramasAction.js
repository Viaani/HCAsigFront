//Acciones que son llamadas en el reducer
export const agregarProgramaAction = (Programa) => {
    return {
        type:'AgregarPrograma',
        payload: Programa
    }
}
export const ObtenerProgramasAction = (Programas) =>{
    return {
        type:'ObtenerProgramas',
        payload: Programas
    }
}
export const EliminarProgramaAction = (codigo) =>{
    return{
        type:'EliminarPrograma',
        payload: codigo
    }
}
export const EditarProgramaAction = (id, programa)=>{
    return{
        type:'EditarPrograma',
        payload:{
            id:id,
            programa:programa
        }
    }
}

// --------------------Programas Externos-------------------------
export const agregarProgramaExternoAction = (ProgramaExterno) => {
    return {
        type:'AgregarProgramaExterno',
        payload: ProgramaExterno
    }
}
export const ObtenerProgramasExternosAction = (ProgramasExternos) =>{
    return {
        type:'ObtenerProgramasExternos',
        payload: ProgramasExternos
    }
}
export const EliminarProgramaExternoAction = (codigo) =>{
    return{
        type:'EliminarProgramaExterno',
        payload: codigo
    }
}
export const EditarProgramaExternoAction = (id, programaExterno)=>{
    return{
        type:'EditarProgramaExterno',
        payload:{
            id:id,
            programa:programaExterno
        }
    }
}
// ---------------- Asignaturas Externas----------------
export const agregarAsignaturaExternaAction = (AsignaturaExterna) => {
    return {
        type:'AgregarAsignaturaExterna',
        payload: {
            codigoPrograma:AsignaturaExterna.codigo_ProgramaExterno,
            asignaturaExterna:AsignaturaExterna
        }
    }
}
export const EliminarAsignaturaExternaAction = ( codigoPrograma, codigo ) =>{
    return{
        type:'EliminarAsignaturaExterna',
        payload: {
            codigoPrograma:codigoPrograma,
            codigo:codigo
        }
    }
}
export const EditarAsignaturaExternaAction = (id, AsignaturaExterna)=>{
    return{
        type:'EditarAsignaturaExterna',
        payload:{
            codigoPrograma:AsignaturaExterna.codigo_ProgramaExterno,
            codigo:id,
            asignaturaExterna:AsignaturaExterna
        }
    }
}