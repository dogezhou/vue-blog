import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () =>import ('@/views/Index')
  },
  {
    path: '/Detail/:blogId',
    component: () =>import ('@/views/Detail')
  },
  {
    path: '/Create',
    component: () =>import ('@/views/Create'),
    meta:{ requiresAuth:true }
  },
  {
    path: '/Edit/:blogId',
    component: () =>import ('@/views/Edit'),
    meta:{ requiresAuth:true }
  },
  {
    path: '/My',
    component: () =>import ('@/views/My'),
    meta:{ requiresAuth:true }
  },
  {
    path: '/User/:userId',
    component: () =>import ('@/views/User'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
