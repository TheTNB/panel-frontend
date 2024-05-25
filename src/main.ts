import '@/styles/reset.css'
import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupI18n } from '@/i18n/i18n'
import { setupNaiveDiscreteApi } from './utils'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import info from '@/api/panel/info'

async function setupApp() {
  const app = createApp(App)
  app.use(VueMonacoEditorPlugin, {
    paths: {
      vs: 'https://cdnjs.admincdn.com/monaco-editor/0.48.0/min/vs'
    },
    'vs/nls': {
      availableLanguages: { '*': 'zh-cn' }
    }
  })
  setupStore(app)
  setupI18n(app)
  setupNaiveDiscreteApi()
  await setupRouter(app)
  app.mount('#app')
}

const title = ref('')

function setupTitle() {
  if (title.value !== '') {
    return
  }
  info
    .name()
    .then((res) => {
      title.value = res.data.name || import.meta.env.VITE_APP_TITLE
    })
    .catch((err) => {
      console.error(err)
    })
}

setupApp()
setupTitle()

export { title }
