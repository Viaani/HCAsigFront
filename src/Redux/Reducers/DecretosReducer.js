//---------------state inicial---------------
const initialState = {
    decretos:[]
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'ObtenerDecretos':
            return{
                ...state,
                decretos: action.payload
            }
        case 'AgregarDecreto':
            return {
                ...state,
                decretos: [...state.decretos, action.payload]
            }
        case 'EliminarDecreto':
        return{
                ...state,
                decretos: state.decretos.filter(decretos=> decretos.numero !== action.payload)
            }
        case 'EditarDecreto':
            return{
                ...state,
                decretos: [...state.decretos.filter(decretos=> decretos.numero !== action.payload.id), action.payload.decreto]
            }
        //retorno default, se retorna el state sin modificar

        // Asignatura
        case 'AgregarAsignatura':
            return {
                ...state,
                decretos:[
                    ...state.decretos.map((decreto)=>{
                        if(decreto.numero.toString() === action.payload.numero.toString()){
                            return {
                                ...decreto,
                                asignaturas:[...decreto.asignaturas, action.payload.asignatura]
                            }
                        }else{
                            return decreto
                        }
                    })
                ]
            }
        case 'EliminarAsignatura':
            return {
                ...state,
                decretos:[
                    ...state.decretos.map((decreto)=>{
                        if(decreto.numero.toString() === action.payload.numero.toString()){
                            return {
                                ...decreto,
                                asignaturas:[...decreto.asignaturas.filter(asignatura=>asignatura.codigo !== action.payload.codigo)]
                            }
                        }else{
                            return decreto
                        }
                    })
                ]
            }
        case 'EditarAsignatura':
            return {
                ...state,
                decretos:[
                    ...state.decretos.map((decreto)=>{
                        if(decreto.numero.toString() === action.payload.numero.toString()){
                            return {
                                ...decreto,
                                asignaturas:[...decreto.asignaturas.filter(asignatura=>asignatura.codigo !== action.payload.codigo), action.payload.asignatura]
                            }
                        }else{
                            return decreto
                        }
                    })
                ]
            }

        default:
            return state;
    }
}