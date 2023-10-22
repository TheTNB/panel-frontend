import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'setting',
  path: '/setting',
  component: Layout,
  meta: {
    order: 9
  },
  children: [
    {
      name: 'setting-index',
      path: '',
      component: () => import('./IndexView.vue'),
      meta: {
        title: '面板设置',
        icon: 'mdi:settings-outline',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
