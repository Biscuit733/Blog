import { createI18n } from 'vue-i18n'

// 1. 引入各个模块
import mcBase from './modules/mc'          // 之前的通用+关于 (建议以后也可以继续拆 mc_about.js)
import mcArticles from './modules/mc_articles' // 新增的文章页模块

const messages = {
  en: {
    // 2. 合并到 'mc' 命名空间下
    mc: {
      ...mcBase.en,                // 展开基础/About 的翻译
      articles: mcArticles.en      // 挂载文章页翻译 -> t('mc.articles.xxx')
    }
  },
  zh: {
    mc: {
      ...mcBase.zh,
      articles: mcArticles.zh
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