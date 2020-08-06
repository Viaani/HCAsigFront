//-------------------Convalidaciones----------------------
export const obtenerHomologacionesAction = (Homologaciones) => {
    return {
        type:'obtenerHomologaciones',
        payload: Homologaciones
    }
}
export const eliminarHomologacionAction = (id) => {
    return {
        type:'eliminarHomologacion',
        payload: id
    }
}
export const AgregarHomologacionAction = (Homologacion) => {
    return {
        type:'AgregarHomologacion',
        payload: Homologacion
    }
}