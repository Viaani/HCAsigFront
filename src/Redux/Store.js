import { createStore, applyMiddleware, compose } from 'redux';
//redux-thunk
import thunk from 'redux-thunk';
//importamos reducer (index.js en carpeta reducers)
import reducer from './index';

//---------------Definimos state inicial ---------------
const initialState = {};

const middleware = [thunk];

//---------------Creamos store---------------
const store = createStore(
    reducer,    // funciones que modifican el state
    initialState,   //state inicial
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//exportamos
export default store;