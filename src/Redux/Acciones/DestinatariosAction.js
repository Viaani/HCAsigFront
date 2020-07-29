//Acciones que son llamadas en el reducer
export const AgregarDestinatarioAction = (Destinatario) => {
    return {
        type:'AgregarDestinatario',
        payload: Destinatario
    }
}
export const ObtenerDestinatariosAction = (Destinatarios) =>{
    return {
        type:'ObtenerDestinatarios',
        payload: Destinatarios
    }
}
export const EliminarDestinatarioAction = (email) =>{
    return{
        type:'EliminarDestinatario',
        payload: email
    }
}
export const EditarDestinatarioAction = (email, destinatario)=>{
    return{
        type:'EditarDestinatario',
        payload:{
            email:email,
            destinatario:destinatario
        }
    }
}