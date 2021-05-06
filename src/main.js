import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入全局演示
import './assets/base.css'
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入iconfont的样式
import './assets/iconfont.css'

// 引入工具包utils
import '@/utils/permission.js'
import '@/utils/http.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
