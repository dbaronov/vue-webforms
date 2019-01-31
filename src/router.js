
import Vue from 'vue'
import Router from 'vue-router'

import FormPage from './views/FormPage.vue'
import SuccessPage from './views/SuccessPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'formpage',
      component: FormPage
    },
    {
      path: '/success',
      name: 'Success',
      component: SuccessPage
    }
  ]
})

export default router
