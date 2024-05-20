<script setup lang="ts">
import PathInput from '@/views/file/PathInput.vue'
import ToolBar from '@/views/file/ToolBar.vue'
import ListTable from '@/views/file/ListTable.vue'

const path = ref('/www')
const selected = ref<any[]>([])
</script>

<template>
  <common-page show-footer>
    <n-flex vertical :size="20">
      <n-alert type="info"> 该页面尚未开发完善，如遇部分功能无法使用为正常现象 </n-alert>
      <path-input v-model:path="path" />
      <tool-bar v-model:path="path" v-model:selected="selected" />
      <list-table v-model:path="path" v-model:selected="selected" />
    </n-flex>
  </common-page>
</template>
