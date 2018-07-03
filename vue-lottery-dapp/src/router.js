import Vue from 'vue'
import Router from 'vue-router'
import Casino from './views/Casino.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Casino
    }
  ]
})
