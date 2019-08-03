import axios from 'axios'
import Vue from 'vue'
const qs = require('qs')

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl
      // headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      if (config.data) {
        config.data = qs.stringify(config.data)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (status !== 200) {
        console.log(res)
        this.destroy(url)
        Vue.prototype.$Message.error(data.msg || '当前访问人数过多，请稍后再试')
        return Promise.reject(data.msg || new Error('当前访问人数过多，请稍后再试'))
      } else if (data.errcode !== 0) {
        Vue.prototype.$Message.error(data.msg)
        return Promise.reject(data)
      } else {
        return Promise.resolve(data)
      }
    }, error => {
      console.log(JSON.stringify(error))
      this.destroy(url)
      Vue.prototype.$Message.error('当前访问人数过多，请稍后再试')
      return Promise.reject(error || new Error('当前访问人数过多，请稍后再试'))
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
