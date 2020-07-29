import React from 'react';
//Boostrap-React
import 'bootstrap/dist/css/bootstrap.min.css';
//redux
import store from './Redux/Store';
import { Provider } from 'react-redux';
// Componente
import HCAsignaturas from './Componentes/HCAsignaturas';

const App = () => {
  //---------------Atributos---------------
  
  //---------------Funciones---------------
  
  //---------------Retorno---------------
  return (
    <Provider store = {store}>
      <HCAsignaturas/>
    </Provider>
   );
}

export default App;
