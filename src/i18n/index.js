import { createI18n } from 'vue-i18n'
// 引入拆分出来的模块
import mc from './modules/mc'

// 如果你以后有 vue-bits，就 import vueBits from './modules/vueBits'

const messages = {
  en: {
    // 使用命名空间 'mc'，这样调用时就是 t('mc.back')
    mc: mc.en,
    // vueBits: vueBits.en
  },
  zh: {
    mc: mc.zh,
    // vueBits: vueBits.zh
  }
}

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

export default i18n