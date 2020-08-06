//---------------state inicial---------------
const initialState = {
    destinatarios:[]
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'ObtenerDestinatarios':
            return{
                ...state,
                destinatarios: action.payload
            }
        case 'AgregarDestinatario':
            return {
                ...state,
                destinatarios: [...state.destinatarios, action.payload]
            }
        case 'EliminarDestinatario':
        return{
            ...state,
            destinatarios: state.destinatarios.filter(destinatario=> destinatario.email !== action.payload)
        }
        case 'EditarDestinatario':
            return{
                ...state,
                destinatarios: [...state.destinatarios.map(destinatario=>{
                    if(destinatario.email !== action.payload.email){
                        return destinatario
                    }else{
                        return action.payload.destinatario
                    }
                })]
            }
        //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}