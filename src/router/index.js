import Vue from 'vue'
import Router from 'vue-router'
import _import from './import'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: _import('productView')
    },
    {
      path: '/art',
      name: 'art',
      component: _import('art')
    },
    {
      path: '/download',
      name: 'download',
      component: _import('download')
    },
    {
      path: '/loan',
      name: 'loan',
      component: _import('loan')
    },
    {
      path: '/article/:id',
      name: 'articledetail',
      component: _import('articledetail')
    }
  ]
})
