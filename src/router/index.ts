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
        name: 'home',
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
        meta: {
          isAuthenticated: true,
          requiredRole: ['admin', 'user'],
        },
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
        meta: {
          isAuthenticated: true,
          requiredRole: ['admin'],
        },
      },
    ],
  },
  {
    path: '/profile',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          isAuthenticated: true,
        },
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
        meta: {
          isAuthenticated: true
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isAuthenticated) {
    next()
  } else {
    authPromise.then(async auth => {
      if (auth.isAuthenticated() && to.path !== '/unauthorized') {
        if (!to.meta?.requiredRole || to.meta?.requiredRole?.some(r => auth.userRoles().includes(r))) {
          next()
        } else {
          next('/unauthorized')
        }
      } else if (auth.isAuthenticated() && to.path === '/unauthorized') {
        next()
      } else {
        const redirect: RouteLocationRaw = { query: { ...to.query, 'sync_me': null } }
        const redirectUri = `${location.origin}${router.resolve(redirect, to).href}`
        auth.login(redirectUri)
      }
    })
  }
})

router.beforeEach((to, from, next) => {
  if ('sync_me' in to.query) {
    authPromise.then(async auth => {
      console.log('Authenticated')
    }).finally(() => {
      delete to.query.sync_me // remove sync_me query parameter to avoid endless recursion
      next({ path: to.path, query: to.query, params: to.params, replace: true })
    })
  } else {
    next()
  }
})

export default router
