//---------------state inicial---------------
const initialState = {
    usuarios:[],
    usuarioConectado:false,
    dataUsuarioConectado:{
        tipoUsuario:'Administrador'
    }
}

//--------------- Funciones del reducer ---------------
export default function(state = initialState, action) {

    switch(action.type){
        //caso que actua como setState
        case 'AgregarUsuario':
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload]
            }
        case 'ObtenerUsuarios':
            return{
                ...state,
                usuarios: action.payload
            }
        case 'EliminarUsuario':
            return{
                ...state,
                usuarios: state.usuarios.filter(usuario=> usuario.email !== action.payload)
            }
        case 'EditarUsuario':
            return{
                ...state,
                usuarios: [...state.usuarios.filter(usuario=> usuario.email !== action.payload.email), action.payload.usuario]
            }

        //usuarioConectado
        
        case 'UsuarioConectado':
            return{
                ...state,
                usuarioConectado:action.payload
            }
        case 'DataUsuarioConectado':
            return{
                ...state,
                dataUsuarioConectado:action.payload
            }
        //retorno default, se retorna el state sin modificar
        default:
            return state;
    }
}