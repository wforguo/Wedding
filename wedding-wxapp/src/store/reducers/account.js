import { handleActions } from 'redux-actions'
// 这里把types里的函数名引入 注意相对路径
import { TOKEN } from '../types/account'
const defaultAccount = {
  token: '',
  tokenExpireTime: ''
};
try {
  let token = wx.getStorageSync('token');
  if (token) {
    defaultAccount.token = token
  }
  let tokenExpireTime = wx.getStorageSync('tokenExpireTime');
  if (tokenExpireTime) {
    defaultAccount.tokenExpireTime = tokenExpireTime
  }
} catch (e) {
  console.log(e)
}

export default handleActions({
  /**
   * 通过handleActions函数导出
   * 这里函数接收2个函数 第一个函数为触发方法修改状态,第二个函数为状态里的默认值
   * @param state
   * @param action
   * @returns {state}
   */
  [TOKEN] (state, action) {
    wx.setStorage({
      key: 'token',
      data: action.token
    });
    let now = new Date().getTime();
    wx.setStorage({
      key: 'tokenExpireTime',
      data: now
    });
    return {
      ...state,
      token: action.token,
      tokenExpireTime: now
    }
  }
}, defaultAccount)
