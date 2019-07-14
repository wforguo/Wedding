import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import promiseMiddleware from '_redux-promise@0.5.3@redux-promise';

export default function configStore () {
  return createStore(rootReducer, applyMiddleware(promiseMiddleware))
}
