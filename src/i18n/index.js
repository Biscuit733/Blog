import { createI18n } from 'vue-i18n'
import mc from './modules/mc'
// import vueBits from './modules/vueBits' // 以后你可以这样加别的模块

const messages = {
  en: {
    mc: mc.en
  },
  zh: {
    mc: mc.zh
  }
}

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

export default i18n