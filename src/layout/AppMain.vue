<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'

const appStore = useAppStore()
const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :locale="themeStore.naiveLocale" :date-locale="themeStore.naiveDateLocale">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" v-if="appStore.reloadFlag" :key="route.path" />
    </router-view>
  </n-config-provider>
</template>
