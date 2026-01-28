// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 移除原本顶部的 const McProjects = ... 这种写法，全部下放
// 这样顶部很清爽，只有核心库引入

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // === 公共/入口区域 ===
    {
      path: '/',
      name: 'gateway',
      component: () => import('../views/Gateway.vue'), // 统一使用这种写法
      meta: { theme: 'default' }
    },

    // === MC 像素世界区域 ===
    {
      path: '/mc',
      name: 'mc-home',
      component: () => import('../views/mc/Home.vue'),
      meta: { theme: 'pixel' }
    },
    {
      path: '/mc/about',
      name: 'mc-about',
      component: () => import('../views/mc/About.vue'),
      meta: { theme: 'pixel' }
    },
    {
      path: '/mc/projects',
      name: 'mc-projects',
      component: () => import('../views/mc/Projects.vue'),
      meta: { theme: 'pixel' }
    },
    {
      path: '/mc/articles',
      name: 'mc-articles',
      component: () => import('../views/mc/Articles.vue'),
      meta: { theme: 'pixel' }
    },
    {
      path: '/mc/articles/:id',
      name: 'mc-article-detail',
      component: () => import('../views/mc/ArticleDetail.vue'),
      meta: { theme: 'pixel' }
    },
    {
      path: '/mc/messages',
      name: 'mc-messages',
      component: () => import('../views/mc/Messages.vue'),
      meta: { theme: 'pixel' }
    },

    // === Tech 现代科技区域 ===
    {
      path: '/tech',
      name: 'tech-home',
      component: () => import('../views/tech/Home.vue'),
      meta: { theme: 'modern' }
    },
    {
      path: '/tech/archive',
      name: 'tech-archive',
      component: () => import('../views/tech/Archive.vue'),
      meta: { theme: 'modern' }
    },
    {
      path: '/tech/links',
      name: 'tech-links',
      component: () => import('../views/tech/Links.vue'),
      meta: { theme: 'modern' }
    },
    {
      path: '/tech/my',
      name: 'tech-my',
      component: () => import('../views/tech/My.vue'),
      meta: { theme: 'modern' }
    },
    {
      path: '/tech/about',
      name: 'tech-about',
      component: () => import('../views/tech/About.vue'),
      meta: { theme: 'modern' }
    }
  ]
})

// 全局样式切换守卫（保持不变，这部分写得很好）
router.afterEach((to) => {
  const theme = to.meta.theme || 'default'
  document.body.className = theme
})

export default router