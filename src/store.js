import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import booksReducer from './reducers/booksReducer';

const store = createStore(
  booksReducer,
  applyMiddleware(thunk)
);

export default store;