// Redux imports
import { createStore, compose } from 'redux';
import rootReducer from './reducers';

// Redux devtools enhancer, can be removed if not used
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux store
const store = createStore(rootReducer, composeEnhancers());

export default store;
