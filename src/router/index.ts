// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/unsecure',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'unsecure',
        component: () => import('@/views/UnSecure.vue'),
      },
    ],
  },
  {
    path: '/user_secure',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'user-secure',
        component: () => import('@/views/UserSecure.vue'),
      },
    ],
  },
  {
    path: '/admin_secure',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'admin-secure',
        component: () => import('@/views/AdminSecure.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
