import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/user/profile',
    name: 'user-profile',
    // 路由懒加载
    component: () => import('@/views/user-profile'),
  },
  {
    path: '/article/:articleId',
    name: 'article',
    // 路由懒加载
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    // 路由懒加载
    component: () => import('@/views/search')
  },
  {
    path: '/',
    // name: 'layout',
    // 路由懒加载
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        // 路由懒加载
        component: () => import('@/views/layout/home')
      },
      {
        path: 'qa',
        name: 'qa',
        // 路由懒加载
        component: () => import('@/views/layout/qa')
      },
      {
        path: 'video',
        name: 'video',
        // 路由懒加载
        component: () => import('@/views/layout/video')
      },
      {
        path: 'my',
        name: 'my',
        // 路由懒加载
        component: () => import('@/views/layout/my')
      },
      {
        path: '/', // 路由重定向
        redirect: '/home'
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
