/**
 * 所有接口请求定义于此
 */

import Api from './api';
import request from './request';

// 登录
export const login = async (params) => {
    return await request(params, Api.apis.login)
};

// 获取token
export const getToken = async (params) => {
    return await request(params, Api.apis.getToken, 'post', false)
};
