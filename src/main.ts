import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
// // 手机加载控制台
// export const loadScript = (url: string, callback: any) => {
//   const script = document.createElement('script')
//   script.onload = () => callback()
//   script.src = url
//   document.body.appendChild(script)
// }

// loadScript(
//   'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',
//   () => {
//     // eslint-disable-next-line
//     new VConsole()
//   })

// import { currencyFilter } from './currency'

// Vue.filter('currency', currencyFilter)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
