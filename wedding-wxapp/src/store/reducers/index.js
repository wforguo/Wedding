// 入口文件 把reducers下的所有函数引入 并且通过combineReducers函数导出
import { combineReducers } from 'redux'
import account from './account'

export default combineReducers({
  account
})
