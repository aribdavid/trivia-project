import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ loginReducer,
  player: playerReducer,
  token: tokenReducer });

export default rootReducer;
