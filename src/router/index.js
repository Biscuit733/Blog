// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
const McProjects = () => import('../views/mc/Projects.vue') // 📦 懒加载引入
// 懒加载引入（更高效）
const Gateway = () => import('../views/Gateway.vue')
const McHome = () => import('../views/mc/Home.vue')
const TechHome = () => import('../views/tech/Home.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gateway',
      component: Gateway,
      meta: { theme: 'default' }
    },
    {
      path: '/mc',
      name: 'mc-home',
      component: McHome,
      meta: { theme: 'pixel' } // 标记：这是像素世界
    },
    {
      path: '/mc/about',
      name: 'mc-about',
      component: () => import('../views/mc/About.vue'),
      meta: { theme: 'pixel' }
    },
    // ✨✨✨ 新增路由开始 ✨✨✨
    {
      path: '/mc/projects',
      name: 'mc-projects',
      component: McProjects,
      meta: { theme: 'pixel' }
    },
    {
      path: '/mc/articles',
      name: 'mc-articles',
      component: () => import('../views/mc/Articles.vue'),
      meta: { theme: 'pixel' }
    },// 在 routes 数组中添加
    {
      path: '/mc/articles/:id', // 动态参数 :id
      name: 'mc-article-detail',
      component: () => import('../views/mc/ArticleDetail.vue'),
      meta: { theme: 'pixel' }
    },
    {
      path: '/tech',
      name: 'tech-home',
      component: TechHome,
      meta: { theme: 'modern' } // 标记：这是现代世界
    }
  ]
})

// --- 全局样式切换魔法 ---
// 每次路由跳转后，根据 meta.theme 自动修改 body 的 class
// 这样你的 MC 字体就不会污染 现代风格 页面了
router.afterEach((to) => {
  const theme = to.meta.theme || 'default'
  document.body.className = theme
})

export default router