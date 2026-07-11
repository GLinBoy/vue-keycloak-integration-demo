import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    isAuthenticated?: boolean
    requiredRole?: string[]
  }
}
