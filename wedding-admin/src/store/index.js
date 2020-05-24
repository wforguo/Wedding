/**
 * @Description: createStore.js
 * @author: forguo
 * @date: 2020/5/4
*/
import { createStore } from "redux";
import reducer from './reducer'

const store = createStore(
    reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
