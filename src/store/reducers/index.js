import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({ loginReducer, playerReducer });

export default rootReducer;
