/**
 * @Description: 用户登录相关
 * @author: forguo
 * @date: 2020/7/22
*/
import { USER_INFO, LOGIN } from "../constants/account";

// 用户授权登录
export const dispatchUserAuth = () => {
    return (dispatch) => {
        dispatch({
            type: LOGIN,
            accessToken: '10086'
        })
    };
};

// 获取用户信息
export const dispatchGetUserInfo = (userInfo) => {
    return (dispatch) => {
        dispatch({
            type: USER_INFO,
            userInfo
        })
    };
};

