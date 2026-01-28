<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LiquidEther from '@/components/vue-bits/LiquidEther.vue'
import GlitchText from '@/components/vue-bits/GlitchText.vue'

const router = useRouter()
const { t } = useI18n()

// 时间显示
const timeString = ref('00:00:00')
onMounted(() => {
  setInterval(() => {
    timeString.value = new Date().toLocaleTimeString('en-GB', { hour12: false })
  }, 1000)
})

// 菜单状态
const activeMenu = ref('links')
const menuItems = computed(() => [
  { label: t('tech.menu.home'), key: 'home' },
  { label: t('tech.menu.archive'), key: 'archive' },
  { label: t('tech.menu.links'), key: 'links' },
  { label: t('tech.menu.my'), key: 'my' },
  { label: t('tech.menu.about'), key: 'about' },
  { label: t('tech.menu.other'), key: 'other' }
])

// 链接数据
const linkCategories = [
  {
    id: 'friends',
    name: 'Friends',
    description: '我的朋友们',
    links: [
      {
        id: 1,
        name: 'Overthinker',
        url: 'https://www.overthinker13.cn/',
        description: '过度思考者的博客',
        icon: '🌐',
        color: '#00ffc8'
      },
      {
        id: 2,
        name: 'Example Blog',
        url: 'https://example.com/',
        description: '示例博客',
        icon: '📝',
        color: '#ff6b6b'
      },
      {
        id: 3,
        name: 'Tech Hub',
        url: 'https://techhub.com/',
        description: '技术资源中心',
        icon: '💻',
        color: '#4ecdc4'
      },
      {
        id: 4,
        name: 'Design Studio',
        url: 'https://designstudio.com/',
        description: '设计工作室',
        icon: '🎨',
        color: '#45b7d1'
      }
    ]
  },
  {
    id: 'resources',
    name: 'Resources',
    description: '实用资源',
    links: [
      {
        id: 5,
        name: 'GitHub',
        url: 'https://github.com/',
        description: '代码托管平台',
        icon: '🔧',
        color: '#333'
      },
      {
        id: 6,
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/',
        description: '编程问答社区',
        icon: '❓',
        color: '#f48024'
      },
      {
        id: 7,
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        description: 'Web 开发文档',
        icon: '📚',
        color: '#2196f3'
      },
      {
        id: 8,
        name: 'Vue.js',
        url: 'https://vuejs.org/',
        description: '渐进式 JavaScript 框架',
        icon: '🟢',
        color: '#4fc08d'
      }
    ]
  },
  {
    id: 'inspiration',
    name: 'Inspiration',
    description: '灵感来源',
    links: [
      {
        id: 9,
        name: 'Codepen',
        url: 'https://codepen.io/',
        description: '前端创意社区',
        icon: '✨',
        color: '#000'
      },
      {
        id: 10,
        name: 'Dribbble',
        url: 'https://dribbble.com/',
        description: '设计灵感平台',
        icon: '🎯',
        color: '#ea4c89'
      },
      {
        id: 11,
        name: 'Behance',
        url: 'https://www.behance.net/',
        description: '创意作品展示',
        icon: '🎨',
        color: '#1769ff'
      },
      {
        id: 12,
        name: 'Awwwards',
        url: 'https://www.awwwards.com/',
        description: '网页设计奖',
        icon: '🏆',
        color: '#ff6163'
      }
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    description: '开发工具',
    links: [
      {
        id: 13,
        name: 'Figma',
        url: 'https://www.figma.com/',
        description: '协作设计工具',
        icon: '🎨',
        color: '#f24e1e'
      },
      {
        id: 14,
        name: 'VS Code',
        url: 'https://code.visualstudio.com/',
        description: '代码编辑器',
        icon: '💻',
        color: '#007acc'
      },
      {
        id: 15,
        name: 'Postman',
        url: 'https://www.postman.com/',
        description: 'API 测试工具',
        icon: '🌐',
        color: '#ff6c37'
      },
      {
        id: 16,
        name: 'Notion',
        url: 'https://www.notion.so/',
        description: '协作笔记工具',
        icon: '📝',
        color: '#2e2e2e'
      }
    ]
  }
]

// 导航到其他页面
const navigateTo = (path) => {
  router.push(`/tech/${path}`)
}

// 返回入口
const goBack = () => router.push('/')
</script>

<template>
  <div class="tech-layout">
    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 动画效果区域 -->
      <section class="hero-section">
        <!-- 动画背景 -->
        <div class="liquid-wrapper full-width">
          <LiquidEther :colors="['#48FF28', '#A2FFC6', '#9EF19E']" :mouseForce="20" :cursorSize="100" :isViscous="false"
            :viscous="30" :iterationsViscous="32" :iterationsPoisson="32" :resolution="0.5" :isBounce="false"
            :autoDemo="true" :autoSpeed="0.5" :autoIntensity="2.2" :takeoverDuration="0.25" :autoResumeDelay="3000"
            :autoRampDuration="0.6" />
          <div class="gradient-overlay"></div>

          <!-- 集成式菜单栏 -->
          <header class="integrated-header">
            <div class="header-content">
              <div class="logo-section">
                <a href="#" class="logo" @click.prevent="goBack">
                  <span class="status-indicator online"></span>
                  <GlitchText 
                    :children="'Biscuit Blog'" 
                    :speed="1.2" 
                    :enable-shadows="true" 
                    :enable-on-hover="false"
                    class-name="logo-glitch" 
                  />
                </a>
              </div>

              <nav class="main-nav">
                <ul>
                  <li v-for="item in menuItems" :key="item.key" :class="{ 'active': activeMenu === item.key }">
                    <a href="#" @click.prevent="navigateTo(item.key === 'home' ? '' : item.key)">
                      <span v-if="item.key === 'home'" class="menu-icon">🏠</span>
                      <span v-else-if="item.key === 'archive'" class="menu-icon">📦</span>
                      <span v-else-if="item.key === 'links'" class="menu-icon">🔗</span>
                      <span v-else-if="item.key === 'my'" class="menu-icon">👤</span>
                      <span v-else-if="item.key === 'about'" class="menu-icon">ℹ️</span>
                      <span v-else-if="item.key === 'other'" class="menu-icon">⋮</span>
                      <span class="menu-text">{{ item.label }}</span>
                      <span v-if="item.key === 'links'" class="status-dot green"></span>
                    </a>
                  </li>
                </ul>
              </nav>

              <div class="header-right">
                <div class="status-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="dot-dollar">$</span>
                </div>
                <div class="search-box">
                  <input type="text" placeholder="Search" class="search-input" />
                </div>
                <div class="nav-icons">
                  <span class="icon">⟳</span>
                  <span class="icon">🌙</span>
                </div>
              </div>
            </div>
          </header>

          <!-- 主标题区域 -->
          <div class="hero-text">
            <GlitchText 
              :children="'Links'" 
              :speed="0.8" 
              :enable-shadows="true" 
              :enable-on-hover="false"
              class-name="hero-glitch" 
            />
          </div>
        </div>
      </section>

      <!-- 主要内容区域 -->
      <section class="main-content-area">
        <div class="content-container">
          <!-- 链接内容 -->
          <div class="links-content">
            <div v-for="category in linkCategories" :key="category.id" class="card links-card">
              <div class="card-header">
                <span class="card-title">{{ category.name }}</span>
                <span class="card-description">{{ category.description }}</span>
              </div>
              <div class="links-body">
                <div class="links-grid">
                  <div v-for="link in category.links" :key="link.id" class="link-item">
                    <a :href="link.url" :style="{ borderColor: link.color }" class="link-card" target="_blank" rel="noopener noreferrer">
                      <div class="link-icon" :style="{ color: link.color }">
                        {{ link.icon }}
                      </div>
                      <div class="link-info">
                        <h4 class="link-name" :style="{ color: link.color }">{{ link.name }}</h4>
                        <p class="link-description">{{ link.description }}</p>
                      </div>
                      <div class="link-arrow">
                        <span>→</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;500;700&display=swap');

/* 全局样式 - 防止闪烁 */
.tech-layout {
  min-height: 100vh;
  background-color: #050505;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  overflow-x: hidden;
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 主内容区域 */
.main-content {
  min-height: 100vh;
}

/* 动画效果区域 */
.hero-section {
  height: 60vh;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  animation-delay: 0.1s;
}

.liquid-wrapper.full-width {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  opacity: 0;
  animation: fadeIn 1.2s ease-in-out forwards;
  animation-delay: 0.2s;
}

.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, transparent, rgba(5, 5, 5, 0.8));
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  animation-delay: 0.3s;
}

/* 集成式菜单栏 */
.integrated-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  backdrop-filter: none;
  border-bottom: none;
  padding: 15px 0;
  box-shadow: none;
  opacity: 0;
  animation: fadeInDown 0.8s ease-out forwards;
  animation-delay: 0.4s;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section .logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #00ffc8;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-indicator.online {
  background: #27ca3f;
  box-shadow: 0 0 8px #27ca3f;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(39, 202, 63, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(39, 202, 63, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(39, 202, 63, 0);
  }
}

/* Logo Glitch Text */
.logo-glitch {
  --after-duration: 3s;
  --before-duration: 2s;
  --after-shadow: -3px 0 #ff0000;
  --before-shadow: 3px 0 #00ffc8;
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.logo-glitch :deep(div) {
  color: #00ffc8 !important;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.6) !important;
}

.logo-glitch :deep(.text-white) {
  color: #00ffc8 !important;
}

.logo-glitch :deep(.before\:text-white) {
  color: #00ffc8 !important;
}

.logo-glitch :deep(.after\:text-white) {
  color: #00ffc8 !important;
}

.logo-glitch :deep(.before\:bg-\[\#0b0b0b\]) {
  background: #050505 !important;
}

.logo-glitch :deep(.after\:bg-\[\#0b0b0b\]) {
  background: #050505 !important;
}

.logo-glitch :deep(.before\:left-\[-5px\]) {
  left: -3px !important;
}

.logo-glitch :deep(.after\:left-\[5px\]) {
  left: 3px !important;
}

.logo-glitch :deep(.before\:text-shadow\:var\(--before-shadow,10px_0_cyan\)\]) {
  text-shadow: var(--before-shadow, 3px 0 #00ffc8) !important;
}

.logo-glitch :deep(.after\:text-shadow\:var\(--after-shadow,-10px_0_red\)\]) {
  text-shadow: var(--after-shadow, -3px 0 #ff0000) !important;
}

.main-nav ul {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-nav a:hover,
.main-nav .active a {
  color: #00ffc8;
  background: rgba(0, 255, 200, 0.15);
  border-color: #00ffc8;
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.3);
  transform: translateY(-1px);
}

.menu-icon {
  font-size: 0.9rem;
  line-height: 1;
}

.menu-text {
  font-size: 0.85rem;
  font-weight: 500;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-left: 6px;
}

.status-dot.green {
  background: #27ca3f;
  box-shadow: 0 0 6px #27ca3f;
  animation: pulse 2s infinite;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 状态点 */
.status-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  background: transparent;
  border-radius: 0;
  border: none;
}

.status-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.status-dots .dot.red {
  background: #ff5f56;
  box-shadow: 0 0 6px #ff5f56;
}

.status-dots .dot.yellow {
  background: #ffbd2e;
  box-shadow: 0 0 6px #ffbd2e;
}

.status-dots .dot.green {
  background: #27ca3f;
  box-shadow: 0 0 6px #27ca3f;
}

.status-dots .dot-dollar {
  color: #00ffc8;
  font-size: 0.8rem;
  font-weight: 700;
  margin-left: 4px;
}

/* 搜索框 */
.search-box {
  position: relative;
}

.search-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 200, 0.2);
  color: #fff;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.75rem;
  width: 140px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #00ffc8;
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
  width: 180px;
  background: rgba(255, 255, 255, 0.15);
}

.search-input::placeholder {
  color: #999;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  background: transparent;
  border-radius: 0;
  border: none;
}

.icon {
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
  width: 18px;
  text-align: center;
}

.icon:hover {
  transform: scale(1.1);
  color: #00ffc8;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
}

/* 动画区域文字 */
.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  max-width: 70%;
  width: 100%;
  padding: 20px;
  opacity: 0;
  animation: fadeInUp 1.5s ease-out forwards;
  animation-delay: 0.6s;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

/* 设置GlitchText所需的CSS变量 */
.hero-glitch {
  --after-duration: 2.4s;
  --before-duration: 1.6s;
  --after-shadow: -5px 0 #ff0000;
  --before-shadow: 5px 0 #00ffc8;
  display: block !important;
  text-align: center !important;
  margin: 0 auto !important;
  max-width: 100%;
}

.hero-glitch :deep(div) {
  color: #00ffc8 !important;
  text-shadow: 0 0 30px rgba(0, 255, 200, 0.8) !important;
}

.hero-glitch :deep(.text-white) {
  color: #00ffc8 !important;
}

.hero-glitch :deep(.before\:text-white) {
  color: #00ffc8 !important;
}

.hero-glitch :deep(.after\:text-white) {
  color: #00ffc8 !important;
}

.hero-glitch :deep(.font-black) {
  font-weight: 900 !important;
}

.hero-glitch :deep(.text-\[clamp\(2rem,10vw,8rem\)\]) {
  font-size: clamp(3rem, 8vw, 6rem) !important;
}

.hero-glitch :deep(.before\:bg-\[\#0b0b0b\]) {
  background: #050505 !important;
}

.hero-glitch :deep(.after\:bg-\[\#0b0b0b\]) {
  background: #050505 !important;
}

.hero-glitch :deep(.before\:overflow-hidden) {
  overflow: hidden !important;
}

.hero-glitch :deep(.after\:overflow-hidden) {
  overflow: hidden !important;
}

.hero-glitch :deep(.before\:\[clip-path\:inset\(0_0_0_0\)\]) {
  clip-path: inset(0 0 0 0) !important;
}

.hero-glitch :deep(.after\:\[clip-path\:inset\(0_0_0_0\)\]) {
  clip-path: inset(0 0 0 0) !important;
}

.hero-glitch :deep(.before\:\[animation\:animate-glitch_var\(--before-duration,2s\)_infinite_linear_alternate-reverse\]) {
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse !important;
}

.hero-glitch :deep(.after\:\[animation\:animate-glitch_var\(--after-duration,3s\)_infinite_linear_alternate-reverse\]) {
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse !important;
}

.hero-glitch :deep(.before\:left-\[-5px\]) {
  left: -5px !important;
}

.hero-glitch :deep(.after\:left-\[5px\]) {
  left: 5px !important;
}

.hero-glitch :deep(.before\:\[text-shadow\:var\(--before-shadow,10px_0_cyan\)\]) {
  text-shadow: var(--before-shadow, 5px 0 #00ffc8) !important;
}

.hero-glitch :deep(.after\:\[text-shadow\:var\(--after-shadow,-10px_0_red\)\]) {
  text-shadow: var(--after-shadow, -5px 0 #ff0000) !important;
}

/* 确保 GlitchText 完全居中 */
.hero-text :deep(.text-white.font-black) {
  display: block !important;
  text-align: center !important;
  margin: 0 auto !important;
  position: relative !important;
  left: 0 !important;
  transform: none !important;
  white-space: normal !important;
  width: 100% !important;
  max-width: 100% !important;
}

/* 修复 GlitchText 伪元素定位 */
.hero-text :deep(.before\:left-\[-10px\]) {
  left: -5px !important;
}

.hero-text :deep(.after\:left-\[10px\]) {
  left: 5px !important;
}

/* 确保容器宽度正确 */
.hero-text :deep(.relative) {
  width: 100% !important;
  text-align: center !important;
  margin: 0 auto !important;
}

/* 主要内容区域 */
.main-content-area {
  padding: 40px 0;
  background-color: #050505;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

/* 卡片样式 */
.card {
  background: rgba(15, 15, 15, 0.9);
  border: 1px solid rgba(0, 255, 200, 0.1);
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;
}

.card:hover {
  border-color: rgba(0, 255, 200, 0.3);
  box-shadow: 0 0 30px rgba(0, 255, 200, 0.1);
  transform: translateY(-5px);
}

.card-header {
  background: rgba(0, 255, 200, 0.1);
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  color: #00ffc8;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.card-description {
  color: #888;
  font-size: 0.85rem;
}

/* 链接内容 */
.links-body {
  padding: 25px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.link-item {
  transition: all 0.3s ease;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.1);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.1);
  border-width: 2px;
}

.link-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.link-info {
  flex: 1;
}

.link-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  transition: all 0.3s ease;
}

.link-description {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
  transition: all 0.3s ease;
}

.link-arrow {
  font-size: 1.2rem;
  color: #888;
  transition: all 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(5px);
  color: inherit;
}

.link-card:hover .link-icon {
  transform: scale(1.1);
  box-shadow: 0 0 15px currentColor;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-container {
    padding: 0 20px;
  }

  .hero-section {
    height: 50vh;
  }

  .search-input {
    width: 120px;
  }

  .search-input:focus {
    width: 160px;
  }

  .links-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
  }

  .main-nav ul {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-nav a {
    font-size: 0.8rem;
    padding: 5px 10px;
  }

  .header-right {
    flex-direction: column;
    gap: 10px;
  }

  .content-container {
    padding: 20px 15px;
    gap: 20px;
  }

  .hero-section {
    height: 40vh;
  }

  .search-input {
    width: 150px;
  }

  .search-input:focus {
    width: 180px;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .link-card {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .link-info {
    text-align: center;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 15, 15, 0.5);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 200, 0.3);
  border-radius: 5px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 200, 0.5);
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 卡片动画延迟 */
.card:nth-child(1) {
  animation-delay: 0.4s;
}

.card:nth-child(2) {
  animation-delay: 0.5s;
}

.card:nth-child(3) {
  animation-delay: 0.6s;
}

.card:nth-child(4) {
  animation-delay: 0.7s;
}

/* Glitch animation keyframes */
@keyframes animate-glitch {
  0% {
    clip-path: inset(47% 0 52% 0);
    transform: translate(0, 0);
  }
  20% {
    clip-path: inset(25% 0 75% 0);
    transform: translate(-2px, 2px);
  }
  40% {
    clip-path: inset(63% 0 36% 0);
    transform: translate(-2px, -2px);
  }
  60% {
    clip-path: inset(25% 0 75% 0);
    transform: translate(2px, 2px);
  }
  80% {
    clip-path: inset(47% 0 52% 0);
    transform: translate(2px, -2px);
  }
  100% {
    clip-path: inset(47% 0 52% 0);
    transform: translate(0, 0);
  }
}
</style>