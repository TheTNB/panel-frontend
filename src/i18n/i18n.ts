import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh_CN from './zh_CN.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'zh_CN',
  messages: {
    en: en,
    zh_CN: zh_CN
  }
})

export const trans = (key: string, attributes = {}) => {
  return computed(() => {
    return i18n.global.t(key, attributes)
  })
}

export default i18n
