import Vue from 'vue'
// 引入axios
import Axios from 'axios'
// 配置baseURL
Axios.defaults.baseURL = '/api'
// 接口请求拦截器
Axios.interceptors.request.use(req => {
  console.log(req)
  if(req.url !== 'login') {
      req.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return req
},
  error => Promise.reject(error)
)
// 原形上添加方法
Vue.prototype.$http = Axios 