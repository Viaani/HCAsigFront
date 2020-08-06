//---------------state inicial---------------
const initialState = {
    homologaciones:[]
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'AgregarHomologacion':
            return {
                ...state,
                homologaciones: [...state.homologaciones, action.payload]
            }
        case 'obtenerHomologaciones':
            return{
                ...state,
                homologaciones: action.payload.map((homologacion)=>{
                    return {...homologacion,
                        listaAsignaturasEquivalentes:homologacion.listaAsignaturasEquivalentes.map((equivalente)=>{
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
        case 'eliminarHomologacion':
            return{
                ...state,
                homologaciones:state.homologaciones.filter(homologacion=> homologacion.run !== action.payload)
            }
            //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}