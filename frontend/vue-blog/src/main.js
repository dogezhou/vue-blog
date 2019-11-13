import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('formatDate2', function (str) {
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}:${date.getMinutes()}`
})

Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '个小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '个月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}
)
