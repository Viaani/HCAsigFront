
export const agregarDecretoAction = (Decreto) => {
    return {
        type:'AgregarDecreto',
        payload: Decreto
    }
}

export const ObtenerDecretosAction = (Decretos) =>{
    return {
        type:'ObtenerDecretos',
        payload: Decretos
    }
}
export const EliminarDecretoAction = (numero) =>{
    return{
        type:'EliminarDecreto',
        payload: numero
    }
}
export const EditarDecretoAction = (id, decreto)=>{
    return{
        type:'EditarDecreto',
        payload:{
            id:id,
            decreto:decreto
        }
    }
}
//----------Asignaturas-----------
export const AgregarAsignaturaAction = (asignatura)=>{
    return{
        type:'AgregarAsignatura',
        payload:{
            numero:asignatura.numeroDecreto,
            asignatura:asignatura
        }
    }
}
export const EliminarAsignaturaAction = (numero, codigo)=>{
    return{
        type:'EliminarAsignatura',
        payload:{
            numero:numero,
            codigo:codigo
        }
    }
}
export const EditarAsignaturaAction = (codigo, asignatura)=>{
    return{
        type:'EditarAsignatura',
        payload:{
            numero:asignatura.numeroDecreto,
            codigo:codigo,
            asignatura:asignatura
        }
    }
}