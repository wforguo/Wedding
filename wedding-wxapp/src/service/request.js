/**
 * wx.request请求
 * @param params 参数
 * @param url 请求地址
 * @param type 类型
 * @returns {Promise<>}
 */
import wepy from 'wepy';
import { TOKEN } from '@/store/types'
import config from '@/common/js/config';
import Api from './api';

// request 请求
const request = async (params, url, type, ifNeedToken) => {
    if (typeof type !== 'string') {
        type = 'POST'
    }
    // 默认需要token，
    if (typeof ifNeedToken !== 'boolean') {
        ifNeedToken = true
    }
    let p = Object.assign({}, params);
    const token = wepy.$store.getState().account[TOKEN];
    if (ifNeedToken && token) {
        p = Object.assign({}, params, {
            token: token
        })
    }
    return await new Promise((resolve, reject) => {
        wx.request({
            url: config.apiBasePath + url,
            data: p,
            method: type,
            dataType: 'json',
            success: (res) => {
                Api.handleResult(res, ifNeedToken, () => {
                    return request(params, url, type, ifNeedToken);
                }).then((res) => {
                    resolve(res)
                });
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
};
export default request
