import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import promiseMiddleware from 'redux-promise';

export default function configStore () {
  return createStore(rootReducer, applyMiddleware(promiseMiddleware))
}
