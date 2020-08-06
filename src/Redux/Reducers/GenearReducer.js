//---------------state inicial---------------
const initialState = {
    menuAbrir : false,
    tituloPagina : "HCAsignaturas",
    desplegarDatos : false,
    alerta:[],
    idModulo: 0,
    modulos:{
        indicadores:0,
        programas:1,
        programasExternos:2,
        decretos:3,
        comparar:4,
        usuarios:5,
        destinatario:6,
        editarUsuario:7
    }
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'abrirMenu' :
            return {
                ...state,
                menuAbrir: action.payload
            }
        
        case 'tituloPagina' :
            return {
                ...state,
                tituloPagina: action.payload
            }

        case 'desplegarDatos':
            return {
                ...state,
                desplegarDatos: action.payload
            }
        case 'alerta':
            return{
                ...state,
                alerta:action.payload
            }
        case 'idModulo':
            return{
                ...state,
                idModulo:action.payload
            }
        //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}