import type { RouteType } from '~/types/router'

const Layout = () => import('@/layout/IndexView.vue')

export default {
  name: 'Demo',
  path: '/demo',
  component: Layout,
  redirect: '/demo/unocss',
  meta: {
    title: '示例页面',
    customIcon: 'logo',
    role: ['admin'],
    requireAuth: true,
    order: 1
  },
  children: [
    {
      name: 'Unocss',
      path: 'unocss',
      component: () => import('@/views/demo/unocss/IndexView.vue'),
      meta: {
        title: 'unocss',
        icon: 'logos:unocss',
        role: ['admin'],
        requireAuth: true
      }
    },
    {
      name: 'Animation',
      path: 'animation',
      component: () => import('@/views/demo/animation/IndexView.vue'),
      meta: {
        title: 'animation',
        icon: 'clarity:animation-line',
        role: ['admin'],
        requireAuth: true
      }
    }
  ]
} as RouteType
