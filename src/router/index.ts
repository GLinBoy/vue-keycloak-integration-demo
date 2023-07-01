// Composables
import { createRouter, createWebHistory, RouteLocationRaw } from 'vue-router'
import authPromise from '@/plugins/keycloak'

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
  {
    path: '/unauthorized',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'unauthorized',
        component: () => import('@/views/Unauthorized.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to.meta.skipAuth)
  if (to.meta.skipAuth) {
    next()
  } else {
    authPromise.then(async auth => {
      if (auth.isAuthenticated()) {
        next()
      } else {
        const redirect: RouteLocationRaw = { query: { ...to.query, 'sync_me': null } }
        const redirectUri = `${location.origin}${router.resolve(redirect, to).href}`
        auth.login(redirectUri)
      }
    })
  }
})

export default router
