/**
 * request 封装 axios请求
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { notification } from 'antd';
import axios from "axios";

const qs = require('qs');

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

class request {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queue = {}
    }

    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl
            // headers: { 'content-type': 'application/x-www-form-urlencoded' }
        };
        return config
    }

    destroy (url) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            console.log(config);
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true;
            if (config.data) {
                config.data = qs.stringify(config.data)
            }
            return config
        }, error => {
            return Promise.reject(error)
        });
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url);
            const { data, status } = res;
            if (status !== 200) {
                console.log(res);
                this.destroy(url);
                notification(codeMessage[status] || data.message || '当前访问人数过多，请稍后再试');
                return Promise.reject(data.message || new Error('当前访问人数过多，请稍后再试'))
            } if (data.code !== 0) {
                notification.error(data.message);
                return Promise.reject(data)
            }
            return Promise.resolve(data)
        }, error => {
            console.log(JSON.stringify(error));
            this.destroy(url);
            notification('当前访问人数过多，请稍后再试');
            return Promise.reject(error || new Error('当前访问人数过多，请稍后再试'))
        })
    }

    request (options) {
        console.log(options);
        const instance = axios.create();
        const params = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, params.url);
        return instance(params)
    }
}
export default request;
