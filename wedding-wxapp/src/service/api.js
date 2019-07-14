/**
 * 接口url，
 * 登录模块
 */

import wepy from 'wepy';
import { TOKEN } from '@/store/types'
import {getToken} from './index'

// 接口URL
const Api = {
    apis: {
        getToken: '/api/common/get-token',
        login: '/api/common/login',
    },
    getToken() {
        // 登录，获取用户登陆凭证
        return new Promise((resolve, reject) => {
            wx.login({
                success (res) {
                    if (res.code) {
                        let params = {
                            code: res.code
                        };
                        // 获取token并保存
                        getToken(params).then(resT => {
                            resolve(resT);
                            wepy.$store.dispatch({
                                type: TOKEN,
                                token: resT.token
                            })
                        }).catch((e)=> {
                            reject(e)
                        });
                    } else {
                        console.log('登录失败！')
                    }
                },
                fail(e) {
                    reject(e)
                    console.log('登录失败！')
                }
            })
        })
    },
    handleResult(res, ifNeedToken, tokenErrorBack) {
        return new Promise((resolve, reject) => {
            wx.hideLoading();
            if (res.statusCode !== 200) {
                wx.showToast({
                    title: '请求失败，请重试！',
                    icon: 'none'
                });
                reject(new Error(res));
                return
            }
            if (res.data.errorcode === 0) {
                resolve(res.data.data)
            } else {
                // token 失效的处理
                if (res.data.errorcode === 10020 && ifNeedToken) {
                    wepy.$store.dispatch({
                        type: TOKEN,
                        token: ''
                    })
                    this.getToken().then(() => {
                        tokenErrorBack()
                    });
                }
                wx.showToast({
                    title: res.data.msg ? res.data.msg : '请求失败，请重试！',
                    icon: 'none'
                });
                reject(new Error(res.data.msg ? res.data.msg : '请求失败，请重试！'))
            }
        })
    }
};

export default Api
