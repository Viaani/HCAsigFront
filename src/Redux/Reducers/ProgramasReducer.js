//---------------state inicial---------------
const initialState = {
    programas:[],
    programasExternos:[]
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'AgregarPrograma':
            return {
                ...state,
                programas: [...state.programas, action.payload]
            }
        case 'ObtenerProgramas':
            return{
                ...state,
                programas: action.payload
            }
        case 'EliminarPrograma':
            return{
                ...state,
                programas: state.programas.filter(programas=> programas.codigo !== action.payload)
            }
        case 'EditarPrograma':
            return{
                ...state,
                programas: [...state.programas.filter(programas=> programas.codigo !== action.payload.id), action.payload.programa]
            }

        // ------------------programas externos------------------
        case 'AgregarProgramaExterno':
            return {
                ...state,
                programasExternos: [...state.programasExternos, action.payload]
            }
        case 'ObtenerProgramasExternos':
            return{
                ...state,
                programasExternos: action.payload
            }
        case 'EliminarProgramaExterno':
            return{
                ...state,
                programasExternos: state.programasExternos.filter(ProgramaExterno=> ProgramaExterno.codigo !== action.payload)
            }
        case 'EditarProgramaExterno':
            return{
                ...state,
                programasExternos: [...state.programasExternos.filter(programas=> programas.codigo !== action.payload.id), action.payload.programa]
            }
        // ---------------- Asignaturas externas----------------
        case 'AgregarAsignaturaExterna':
            return{
                ...state,
                programasExternos:[
                    ...state.programasExternos.map((programaExterno)=>{
                        if(programaExterno.codigo === action.payload.codigoPrograma){
                            return {
                                ...programaExterno,
                                asignaturasExternas:[...programaExterno.asignaturasExternas, action.payload.asignaturaExterna]
                            }
                        }else{
                            return programaExterno
                        }
                    })
                ]
            }
        case 'EditarAsignaturaExterna':
            return {
                ...state,
                programasExternos:[
                    ...state.programasExternos.map((programaExterno)=>{
                        if(programaExterno.codigo === action.payload.codigoPrograma){
                            return {
                                ...programaExterno,
                                asignaturasExternas:[...programaExterno.asignaturasExternas.filter(asignatura=>asignatura.codigo !== action.payload.codigo), action.payload.asignaturaExterna]
                            }
                        }else{
                            return programaExterno
                        }
                    })
                ]
            }
        case 'EliminarAsignaturaExterna':
            return {
                ...state,
                programasExternos:[
                    ...state.programasExternos.map((programaExterno)=>{
                        if(programaExterno.codigo === action.payload.codigoPrograma){
                            return {
                                ...programaExterno,
                                asignaturasExternas:[...programaExterno.asignaturasExternas.filter(asignatura=>asignatura.codigo !== action.payload.codigo)]
                            }
                        }else{
                            return programaExterno
                        }
                    })
                ]
            }
        //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}