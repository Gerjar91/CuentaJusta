import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // Importa el middleware que necesites
import reducer from "./reducer";

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk) // Agrega aquí cualquier otro middleware que necesites
    // Otros mejoradores de la tienda, si los hay
  )
);

export default store;
