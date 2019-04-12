import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: '/detail',
      name: 'home',
      component: Home,
      children: [
        {
          path: '', // 放一个空路径,默认渲染这个
          name: 'detail',
          component: () => import('./views/home/detail.vue')
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('./views/home/cart.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '*',
      redirect: '/'
      // 所有不符合地址规范的都将转到/地址下
    }
  ]
});
