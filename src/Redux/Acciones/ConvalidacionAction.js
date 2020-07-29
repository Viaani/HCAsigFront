//-------------------Convalidaciones----------------------
export const AgregarConvalidacionAction = (convalidacion) => {
    return {
        type:'AgregarConvalidacion',
        payload: convalidacion
    }
}
export const obtenerConvalidacionesAction = (Convalidaciones) => {
    return {
        type:'obtenerConvalidaciones',
        payload: Convalidaciones
    }
}
export const eliminarConvalidacionAction = (id) => {
    return {
        type:'eliminarConvalidacion',
        payload: id
    }
}
