import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router'
import zktable from 'vue-table-with-tree-grid'
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.component('zktable', zktable)
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