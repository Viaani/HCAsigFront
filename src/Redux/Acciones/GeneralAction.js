//Acciones que son llamadas en el reducer
export const abrirMenuAction = (bool) => {//parametro "programa" recibido a travez de un formulario
    return {
        type:'abrirMenu',    // se fija el nombre de la accion
        payload: bool    // se fija el payload como el objeto programa
    }
}
export const cambiarTituloAction = (titulo) =>{
    return {
        type:'tituloPagina',
        payload: titulo
    }
}
export const desplegarDatosAction = (bool) => {
    return {
        type:'desplegarDatos',
        payload: bool
    }
}
export const alertaAction = (alerta) => {
    return {
        type:'alerta',
        payload:alerta
    }
}
export const idModuloAction = (id) =>{
    return {
        type:'idModulo',
        payload:id
    }
}