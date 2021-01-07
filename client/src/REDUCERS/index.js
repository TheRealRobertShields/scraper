import {combineReducers} from 'redux';

import games from './reducer';
import scores from './ScoreReducer';

export default combineReducers({games, scores})