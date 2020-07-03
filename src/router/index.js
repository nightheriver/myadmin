import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const login = ()=> import('views/login') 
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
     redirect:'/login'
      
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  mode:'history',
  routes,
 
})

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  const token = window.sessionStorage.getItem('token')
  if(to.path !== '/login'){
    if(!token){
      next('/login')
    }
  }else{
    if(token){
     
      console.log(window.history);
      
      const path = from.path==='/'?'/home':'/'
      next(path)
    }
  }
  next()
  
})
export default router
