<script lang="ts" setup>
import { SelectOption, SelectGroupOption } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { availableLocales } = useI18n()

const options: Array<SelectOption | SelectGroupOption> = availableLocales.map((locale) => ({
  label: locale,
  value: locale
}))
</script>
<template>
  <div class="locale-changer">
    <n-space vertical mr-20>
      <n-select v-model:value="$i18n.locale" :options="options" />
    </n-space>
  </div>
</template>
