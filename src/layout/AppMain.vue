<script setup lang="ts">
import { useAppStore } from '@/store'
import { dateZhCN, zhCN, enUS, dateEnUS } from 'naive-ui'
import type { NLocale, NDateLocale } from 'naive-ui'

const appStore = useAppStore()

const localeMap: Record<string, { locale: NLocale; dateLocale: NDateLocale }> = {
  zh_CN: { locale: zhCN, dateLocale: dateZhCN },
  en: { locale: enUS, dateLocale: dateEnUS }
}
</script>

<template>
  <n-config-provider
    :locale="localeMap[$i18n.locale].locale"
    :date-locale="localeMap[$i18n.locale].dateLocale"
  >
    <router-view v-slot="{ Component, route }">
      <component :is="Component" v-if="appStore.reloadFlag" :key="route.path" />
    </router-view>
  </n-config-provider>
</template>
