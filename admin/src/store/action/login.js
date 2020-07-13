/**
 * @Description: login.js
 * @author: forguo
 * @date: 2020/5/4
*/
import request from '@/utils/request';

// 用户登录
export const dispatchLogin = (data) => {
    return request.request({
        url: 'manage/user/login',
        method: 'post',
        data
    })
};

// 退出登录
export const dispatchLogout = (data) => {
    return request.request({
        url: 'manage/user/logout',
        method: 'post',
        data
    })
};
