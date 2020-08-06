//---------------state inicial---------------
const initialState = {
    convalidaciones:[]
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'AgregarConvalidacion':
            return {
                ...state,
                convalidaciones: [...state.convalidaciones, action.payload]
            }
        case 'obtenerConvalidaciones':
            return{
                ...state,
                convalidaciones: action.payload.map((convalidacion)=>{
                    return {...convalidacion,
                        listaAsignaturasEquivalentes:convalidacion.listaAsignaturasEquivalentes.map((equivalente)=>{
                            var notas = 0;
                            return {
                                ...equivalente,
                                asignaturasOrigen:equivalente.asignaturasOrigen.map((asignatura)=>{
                                    notas = notas + asignatura.nota;
                                    return asignatura
                                }),
                                nota:(notas/equivalente.asignaturasOrigen.length).toFixed(1)
                            }
                        })
                    }
                })
            }
        case 'eliminarConvalidacion':
            return{
                ...state,
                convalidaciones:state.convalidaciones.filter(convalidacion=> convalidacion.run !== action.payload)
            }
            //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}