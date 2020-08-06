import { combineReducers } from 'redux';
//importamos reducers
import programasReducers from './Reducers/ProgramasReducer';
import generalReducers from './Reducers/GenearReducer';
import decretosReducer from './Reducers/DecretosReducer';
import asignaturasReducer from './Reducers/AsignaturasReducer';
import convalidacionReducer from './Reducers/ConvalidacionReducer';
import homologacionReducer from './Reducers/HomologacionReducer';
import usuariosReducer from './Reducers/UsuariosReducer';
import destinatariosReducer from './Reducers/DestinatariosReducer';
import indicadoresReducer from './Reducers/IndicadoresReducer'

//combinamos los reducers
export default combineReducers({
    programasStore: programasReducers,
    generalStore: generalReducers,
    decretosStore: decretosReducer,
    asignaturasStore: asignaturasReducer,
    convalidacionesStore: convalidacionReducer,
    homologacionesStore: homologacionReducer,
    usuariosStore: usuariosReducer,
    destinatariosStore: destinatariosReducer,
    indicadoresStore: indicadoresReducer
});