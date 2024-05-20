<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import file from '@/api/panel/file'
import EventBus from '@/utils/event'
import { checkName } from '@/utils/file'

const path = defineModel<string>('path', { type: String, required: true })
const selected = defineModel<any[]>('selected', { type: Array, default: () => [] })

const uploadModal = ref(false)
const newModal = ref(false)
const newModel = ref({
  dir: false,
  path: ''
})

const showNew = (value: string) => {
  newModel.value.dir = value !== 'file'
  newModel.value.path = ''
  newModal.value = true
}

const handleNew = () => {
  if (!checkName(newModel.value.path)) {
    window.$message.error('名称不合法')
    return
  }

  const fullPath = path.value + '/' + newModel.value.path
  file.create(fullPath, newModel.value.dir).then(() => {
    newModal.value = false
    window.$message.success('创建成功')
    EventBus.emit('file:refresh')
  })
}

const bulkDelete = () => {
  if (!selected.value.length) {
    window.$message.error('请选择要删除的文件/文件夹')
    return
  }

  for (const path of selected.value) {
    file.delete(path).then(() => {
      window.$message.success(`删除 ${path} 成功`)
      EventBus.emit('file:refresh')
    })
  }
}
</script>

<template>
  <n-flex>
    <n-popselect
      :options="[
        { label: '文件', value: 'file' },
        { label: '文件夹', value: 'folder' }
      ]"
      @update:value="showNew"
    >
      <n-button type="primary"> 新建 </n-button>
    </n-popselect>
    <n-button @click="uploadModal = true"> 上传 </n-button>
    <n-button> 远程下载 </n-button>
    <div ml-auto v-if="selected.length">
      <n-flex>
        <n-button secondary type="primary"> 粘贴 </n-button>
        <n-button-group>
          <n-button> 复制 </n-button>
          <n-button> 移动 </n-button>
          <n-button> 压缩 </n-button>
          <n-button> 权限 </n-button>
          <n-popconfirm @positive-click="bulkDelete">
            <template #trigger>
              <n-button>删除</n-button>
            </template>
            确定要批量删除吗？
          </n-popconfirm>
        </n-button-group>
      </n-flex>
    </div>
  </n-flex>
  <n-modal
    v-model:show="newModal"
    preset="card"
    title="新建"
    style="width: 60vw"
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <n-space vertical>
      <n-form :model="newModel">
        <n-form-item label="名称">
          <n-input v-model:value="newModel.path" />
        </n-form-item>
      </n-form>
      <n-button type="info" block @click="handleNew">提交</n-button>
    </n-space>
  </n-modal>
  <upload-modal v-model:show="uploadModal" v-model:path="path" />
</template>

<style scoped lang="scss"></style>
