//---------------state inicial---------------
const initialState = {
    indicadores:{}
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'ObtenerIndicadores':
            return{
                ...state,
                indicadores: action.payload
            }
        default:
            return state;
    }
}