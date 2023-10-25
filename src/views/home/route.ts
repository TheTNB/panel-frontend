import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'home',
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    order: 0
  },
  children: [
    {
      name: 'home-index',
      path: 'home',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        role: ['admin'],
        requireAuth: true
      }
    },
    {
      name: 'home-update',
      path: 'update',
      component: () => import('./UpdateView.vue'),
      isHidden: true,
      meta: {
        title: '更新',
        icon: 'mdi:archive-arrow-up-outline',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
