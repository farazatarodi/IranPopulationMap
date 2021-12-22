// reducer imports
import dataReducer from './data';

// Redux imports
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ dataReducer });

export default rootReducer;
