import {combineReducers} from 'redux'
import playerState from './playerState';
import gameboard from './gameboard';

const rootReducer = combineReducers({
  gameboard,
  playerState
});

export default rootReducer;
