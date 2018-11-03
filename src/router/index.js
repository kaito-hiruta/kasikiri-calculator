import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Kasikiri from '@/components/Kasikiri'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/:kasikiriId',
      name: 'kasikiri',
      component: Kasikiri
    }
  ]
})
