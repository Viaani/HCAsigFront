//Acciones que son llamadas en el reducer
export const AgregarUsuarioAction = (usuario) => {
    return {
        type:'AgregarUsuario',
        payload: usuario
    }
}
export const ObtenerUsuariosAction = (Programas) =>{
    return {
        type:'ObtenerUsuarios',
        payload: Programas
    }
}
export const EliminarUsuarioAction = (email) =>{
    return{
        type:'EliminarUsuario',
        payload: email
    }
}
export const EditarUsuarioAction = (email, usuario)=>{
    return{
        type:'EditarUsuario',
        payload:{
            email:email,
            usuario:usuario
        }
    }
}

// usuarios Conectado

export const UsuarioConectadoAction = (bool)=>{
    return{
        type:'UsuarioConectado',
        payload:bool
    }
}
export const DataUsuarioConectadoAction = (usuario)=>{
    return{
        type:'DataUsuarioConectado',
        payload:usuario
    }
}
