import Vue from 'vue'
import Router from 'vue-router'
import _import from './import'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/article/:id',
      name: 'articledetail',
      component: _import('articledetail')
    }
  ]
})
