//---------------state inicial---------------
const initialState = {
    asignaturaSeleccionadas:[],
    listaAsignaturasEncontradas:[],
    listaAsignaturasGuardadas:[]
}

//--------------- Funciones del reducer ---------------
const compararEquivalentes = (equivalente, equivalente2) => {
    if ((equivalente.asignaturasOrigen.length !== equivalente2.asignaturasOrigen.length) || (equivalente.asignaturasObjetivo.length !== equivalente2.asignaturasObjetivo.length)){
        return true
    }
    for(var cont = 0; cont < equivalente.asignaturasOrigen.length ; cont++){
        if(equivalente.asignaturasOrigen[cont] !== equivalente2.asignaturasOrigen[cont]){
            return true
        }
    }
    for(var cont2 = 0; cont2 < equivalente.asignaturasObjetivo.length ; cont2++){
        if(equivalente.asignaturasObjetivo[cont2] !== equivalente2.asignaturasObjetivo[cont2]){
            return true
        }
    }
    return false
}

export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        // ---------------- Asignaturas Seleccionadas----------------
        case 'ObtenerAsignaturaSeleccionadas':
            return{
                ...state,
                asignaturaSeleccionadas: action.payload
            }
        case 'AgregarAsignaturaSeleccionada':
            return {
                ...state,
                asignaturaSeleccionadas: [...state.asignaturaSeleccionadas, action.payload]
            }
        case 'eliminarAsignaturaSeleccionada':
            return{
                ...state,
                asignaturaSeleccionadas: state.asignaturaSeleccionadas.filter(asignaturas=> asignaturas.codigo !== action.payload)
            }
        case 'eliminarAsignaturasSeleccionadasErroneas':
            return{
                ...state,
                asignaturaSeleccionadas: [...state.asignaturaSeleccionadas.filter(asignatura => asignatura.numeroDecreto !== action.payload )]
            }
        case 'eliminarAsignaturasSeleccionadasErroneasExtra':
            return{
                ...state,
                asignaturaSeleccionadas: [...state.asignaturaSeleccionadas.filter(asignatura => asignatura.codigo_ProgramaExterno !== action.payload )]
            }
        // ---------------- ListaAsignaturasEncontradas/Guardadas ----------------
        case 'ObtenerAsignaturasEncontradas':
            return{
                ...state,
                listaAsignaturasEncontradas: action.payload,
                listaAsignaturasGuardadas:action.payload.map((equivalencia)=>(
                    {
                        ...equivalencia,
                        asignaturasOrigen:equivalencia.asignaturasOrigen.map((asignatura)=>(
                            {
                                ...asignatura,
                                nota:0.0
                            }
                        )),
                        nota:0.0
                    }
                ))
            }
        case 'eliminarAsignaturaEncontrada':
            return{
                ...state,
                listaAsignaturasEncontradas: state.listaAsignaturasEncontradas.filter(asignaturaEncontrada=> compararEquivalentes(asignaturaEncontrada,action.payload)),
                listaAsignaturasGuardadas: state.listaAsignaturasGuardadas.filter(asignaturaGuardada=> compararEquivalentes(asignaturaGuardada,action.payload))
            }
        case 'eliminarAsignaturaGuardada':
            return{
                ...state,
                listaAsignaturasGuardadas: state.listaAsignaturasGuardadas.filter(asignaturaGuardada=> compararEquivalentes(asignaturaGuardada,action.payload))
            }
        case'recuperarAsignaturasGuardadas':
            return{
                ...state,
                listaAsignaturasGuardadas: [...state.listaAsignaturasEncontradas]
            }
        //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}