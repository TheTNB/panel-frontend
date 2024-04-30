<script lang="ts" setup>
import { renderCustomIcon, renderIcon } from '@/utils'
import type { Meta } from '~/types/router'

const router = useRouter()
const route = useRoute()

const generator: any = (routerMap: any) => {
  return routerMap.map((item: any) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/',
      icon: getIcon(item.meta)
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentMenu.children = generator(item.children, currentMenu)
    }
    return currentMenu
  })
}

const breadcrumbList = computed(() => {
  return generator(route.matched)
})

function handleBreadClick(path: string) {
  if (path === route.path) return
  router.push(path)
}

function getIcon(meta?: Meta, size = 16) {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size })
  if (meta?.icon) return renderIcon(meta.icon, { size })
  return ''
}
</script>

<template>
  <n-breadcrumb>
    <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
      <n-breadcrumb-item v-if="routeItem.meta.title">
        <n-dropdown
          v-if="routeItem.children.length"
          :options="routeItem.children"
          @select="handleBreadClick"
        >
          <span class="link-text">
            <component :is="routeItem.icon" v-if="routeItem.icon" />
            {{ $t(routeItem.meta.title) }}
          </span>
        </n-dropdown>
        <span v-else class="link-text">
          <component :is="routeItem.icon" v-if="routeItem.icon" />
          {{ $t(routeItem.meta.title) }}
        </span>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>
