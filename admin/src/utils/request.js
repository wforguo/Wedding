/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import {getPageQuery} from "@/utils/utils";
import {history} from "umi";
import {stringify} from "querystring";

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
    const { response } = error;
    console.log(response);
    if (response && response.status) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });
        const err = new Error(errorText);
        err.name = response.status;
        err.response = response;
        if (response.status === 401) {
            // toDo 使用dispatch方式
            // dispatch({
            //     type: 'login/logout',
            // });
            //
            // token失效，退出登录
            const {redirect} = getPageQuery(); // Note: There may be security issues, please note

            if (window.location.pathname !== '/Login' && !redirect) {
                localStorage.clear();
                sessionStorage.clear();
                history.replace({
                    pathname: '/Login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        }
        throw err;
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
        const err = new Error('您的网络发生异常，无法连接服务器');
        err.name = response.status;
        err.response = response;
        throw err;
    }
    return response;
};

/**
 * 配置request请求时的默认参数
 */
// const currentUser = yield select(state => state.user.currentUser);

const request = extend({
    timeout: 1000,
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
});

// request 拦截器
request.interceptors.request.use((url, options) => {
    const accessToken = window.localStorage.getItem('accessToken') || '';
    return {
        url: `${url}`,
        options: {
            ...options,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        },
    }
});

// toDo response 拦截器

export default request;
