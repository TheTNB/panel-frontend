<script setup lang="ts">
import setting from '@/api/panel/setting'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const model = ref({
  name: '',
  username: '',
  password: '',
  email: '',
  port: '',
  entrance: '',
  ssl: false,
  website_path: '',
  backup_path: ''
})

const getSetting = () => {
  setting.list().then((res) => {
    model.value = res.data
  })
}

const handleSave = () => {
  setting.update(model.value).then(() => {
    window.$message.success(t('routes.settingIndex.edit.toasts.success'))
  })
}

onMounted(() => {
  getSetting()
})
</script>

<template>
  <CommonPage show-footer>
    <n-space vertical>
      <n-alert type="info">
        {{ $t('routes.settingIndex.info') }}
      </n-alert>
      <n-form>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.name.label')">
          <n-input
            v-model:value="model.name"
            :placeholder="$t('routes.settingIndex.edit.fields.name.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.username.label')">
          <n-input
            v-model:value="model.username"
            :placeholder="$t('routes.settingIndex.edit.fields.username.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.password.label')">
          <n-input
            v-model:value="model.password"
            :placeholder="$t('routes.settingIndex.edit.fields.password.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.email.label')">
          <n-input
            v-model:value="model.email"
            :placeholder="$t('routes.settingIndex.edit.fields.email.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.port.label')">
          <n-input
            v-model:value="model.port"
            :placeholder="$t('routes.settingIndex.edit.fields.port.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.entrance.label')">
          <n-input
            v-model:value="model.entrance"
            :placeholder="$t('routes.settingIndex.edit.fields.entrance.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.ssl.label')">
          <n-switch v-model:value="model.ssl" />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.path.label')">
          <n-input
            v-model:value="model.website_path"
            :placeholder="$t('routes.settingIndex.edit.fields.path.placeholder')"
          />
        </n-form-item>
        <n-form-item :label="$t('routes.settingIndex.edit.fields.backup.label')">
          <n-input
            v-model:value="model.backup_path"
            :placeholder="$t('routes.settingIndex.edit.fields.backup.placeholder')"
          />
        </n-form-item>
      </n-form>
    </n-space>
    <n-button type="primary" @click="handleSave">
      {{ $t('routes.settingIndex.edit.actions.submit') }}
    </n-button>
  </CommonPage>
</template>

<style scoped lang="scss"></style>
