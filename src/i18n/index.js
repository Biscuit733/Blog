import { createI18n } from 'vue-i18n'
import mcBase from './modules/mc'
import mcArticles from './modules/mc_articles'
// 1. 引入 tech 模块
import { tech } from './modules/tech' 

const messages = {
  en: {
    mc: {
      ...mcBase.en,
      articles: mcArticles.en
    },
    // 2. 合并 tech 命名空间
    tech: {
      ...tech.en
    }
  },
  zh: {
    mc: {
      ...mcBase.zh,
      articles: mcArticles.zh
    },
    tech: {
      ...tech.zh
    }
  }
}

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

export default i18n