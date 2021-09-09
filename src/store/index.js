import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/gameReducer';
import cellsReducer from './reducers/cellsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  game: gameReducer,
  cells: cellsReducer,
});

export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
