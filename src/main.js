import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// import {logins} from 'network/api';
// logins({username:'admin',password:'123456'}).then((result) => {
//   console.log(result);
  
// }).catch((err) => {
//   console.log(err);
  
// });
// logins({username:'',password:''}).then((result) => {
//   console.log(result);
  
// }).catch((err) => {
//   console.log(err);
  
// });