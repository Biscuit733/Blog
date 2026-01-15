import { createI18n } from 'vue-i18n'
import mcBase from './modules/mc'
import mcArticles from './modules/mc_articles'
import mcProjects from './modules/mc_projects' // ✨ 1. 引入新模块
import mcAbout from './modules/mc_about' // ✨ 1. 引入新模块
import mcBook from './modules/mc_book' // ✨ 1. 引入新模块
import mcMessages from './modules/mc_message' // ✨ 1. 引入新模块
import tech from './modules/tech' 

const messages = {
  en: {
    mc: {
      ...mcBase.en,
      articles: mcArticles.en,
      projects: mcProjects.en, // ✨ 2. 挂载到 mc.projects
      about: mcAbout.en, // 挂载到 mc.about
      book: mcBook.en, // 挂载到 mc.book
      messages: mcMessages.en // 挂载到 mc.messages
    },
    tech: { ...tech.en }
  },
  zh: {
    mc: {
      ...mcBase.zh,
      articles: mcArticles.zh,
      projects: mcProjects.zh, // ✨ 2. 挂载到 mc.projects
      about: mcAbout.zh, // 挂载到 mc.about
      book: mcBook.zh, // 挂载到 mc.book
      messages: mcMessages.zh // 挂载到 mc.messages
    },
    tech: { ...tech.zh }
  }
}

// ... 保持 createI18n 部分不变
export default createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false,
  messages
})