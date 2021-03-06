import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
const login = ()=> import('views/login/login') 
const Roles = ()=> import('views/roles/Roles') 
const Users = ()=> import('views/users/Users') 
const rightslist = ()=> import('views/roles/rightslist') 
const categories = ()=> import('views/categories/categories') 
const params = ()=> import('views/params/params') 
const goods = ()=> import('views/goods/goods') 
const addoreditgoods = ()=> import('views/goods/goodsc/addoreditgoods') 
const orders = ()=> import('views/orders/orders') 

const reports = ()=> import('views/reports/reports') 
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
    // {
    //   path: '/roles',
    //   name: 'Roles',
    //   component: Roles
    // },
    // {
    //   path: '/users',
    //   name: 'Users',
    //   component: Users
    // },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeLeave (to, from, next) {
      // ...
      console.log(from);
      next()
    },
    children:[
      {
        path: '/rights',
        name: 'rightslist',
        component: rightslist
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/categories',
        name: 'categories',
        component: categories
      },
      {
        path: '/params',
        name: 'params',
        component: params
      },
      {
        path: '/goods',
        name: 'goods',
        component: goods,
    
      },
      {
        path: '/goods/addoreditgoods',
        name: 'addoreditgoods',
        component: addoreditgoods,
      },
      {
        path: '/orders',
        name: 'orders',
        component: orders,
      },
      {
        path: '/reports',
        name: 'reports',
        component: reports,
    
      },
    ]
  },
]

const router = new VueRouter({
  mode:'history',
  routes,
 
})

router.beforeEach((to, from, next) => {
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
