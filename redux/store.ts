import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import placesReducer from './reducers/placesReducer';
import { RootState } from './types';

const rootReducer = combineReducers<RootState>({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;