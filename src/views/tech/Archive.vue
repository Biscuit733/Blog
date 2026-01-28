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
const activeMenu = ref('archive')
const menuItems = computed(() => [
  { label: t('tech.menu.home'), key: 'home' },
  { label: t('tech.menu.archive'), key: 'archive' },
  { label: t('tech.menu.links'), key: 'links' },
  { label: t('tech.menu.my'), key: 'my' },
  { label: t('tech.menu.about'), key: 'about' },
  { label: t('tech.menu.other'), key: 'other' }
])

// 归档数据
const articles = [
  {
    id: 1,
    title: '🌟:-D简单自我介绍一下',
    date: '2025-09-08',
    wordCount: 308,
    readTime: 2,
    content: '一个在大学的海洋中挣扎求生的过度思考者，正在将屎山雕琢成艺术品的路上...',
    category: '生活感悟'
  },
  {
    id: 2,
    title: '⚡ 优先级队列（堆！堆！堆！）',
    date: '2025-08-12',
    wordCount: 1681,
    readTime: 8,
    content: '本文将系统性地介绍优先级队列（Priority Queue）就是这样一个不讲武德的数据结构，它不遵循FIFO（先进先出），而是谁优先级高谁先出。',
    category: '技术分享'
  },
  {
    id: 3,
    title: '🌳二叉树从基础概念到应用实践',
    date: '2025-04-27',
    wordCount: 1362,
    readTime: 7,
    content: '本文将系统性地介绍二叉树的核心知识点，包括基本概念、性质、存储方式、遍历方法以及常见面试题解析。',
    category: '技术分享'
  },
  {
    id: 4,
    title: '🚀 算法学习路线图',
    date: '2025-03-15',
    wordCount: 2100,
    readTime: 10,
    content: '从基础到高级，为你规划一条系统的算法学习路线，帮助你在编程之路上走得更远。',
    category: '技术分享'
  },
  {
    id: 5,
    title: '🎨 前端开发中的视觉设计',
    date: '2025-02-10',
    wordCount: 1800,
    readTime: 9,
    content: '探讨前端开发中的视觉设计原则，如何创建美观且用户友好的界面。',
    category: '前端开发'
  },
  {
    id: 6,
    title: '📱 移动优先的响应式设计',
    date: '2025-01-05',
    wordCount: 1500,
    readTime: 7,
    content: '如何设计一个从移动设备开始，逐步扩展到桌面的响应式网站。',
    category: '前端开发'
  },
  {
    id: 7,
    title: '💻 我的开发环境搭建',
    date: '2024-12-20',
    wordCount: 1200,
    readTime: 6,
    content: '分享我的开发环境配置，包括编辑器、终端、插件等，提高开发效率。',
    category: '开发工具'
  },
  {
    id: 8,
    title: '📚 程序员必读书籍推荐',
    date: '2024-11-30',
    wordCount: 1600,
    readTime: 8,
    content: '推荐一些对程序员成长有帮助的书籍，涵盖技术、思维和职业发展等方面。',
    category: '读书分享'
  }
]

// 按年份和月份分组
const groupedArticles = computed(() => {
  const groups = {}
  
  articles.forEach(article => {
    const year = article.date.substring(0, 4)
    const month = article.date.substring(5, 7)
    const monthYear = `${year}-${month}`
    
    if (!groups[year]) {
      groups[year] = {}
    }
    
    if (!groups[year][month]) {
      groups[year][month] = []
    }
    
    groups[year][month].push(article)
  })
  
  return groups
})

// 获取月份名称
const getMonthName = (month) => {
  const monthNames = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
  return monthNames[month] || month
}

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
                      <span v-if="item.key === 'archive'" class="status-dot green"></span>
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
              :children="'Archive'" 
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
          <!-- 归档内容 -->
          <div class="archive-content">
            <div class="card archive-card">
              <div class="card-header">
                <span class="card-title">Article Archive</span>
              </div>
              <div class="archive-body">
                <!-- 按年份分组显示 -->
                <div v-for="(yearData, year) in groupedArticles" :key="year" class="year-group">
                  <div class="year-header">
                    <h3>{{ year }}</h3>
                  </div>
                  <div class="months">
                    <div v-for="(monthData, month) in yearData" :key="month" class="month-group">
                      <div class="month-header">
                        <h4>{{ getMonthName(month) }}</h4>
                      </div>
                      <ul class="article-list">
                        <li v-for="article in monthData" :key="article.id" class="article-item">
                          <a href="#" class="article-link">
                            <span class="article-title">{{ article.title }}</span>
                            <span class="article-meta">
                              <span class="article-date">{{ article.date }}</span>
                              <span class="article-category">{{ article.category }}</span>
                              <span class="article-stats">{{ article.wordCount }} 字 | {{ article.readTime }} 分钟</span>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
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

.logo-glitch :deep(.before\:\[text-shadow\:var\(--before-shadow,10px_0_cyan\)\]) {
  text-shadow: var(--before-shadow, 3px 0 #00ffc8) !important;
}

.logo-glitch :deep(.after\:\[text-shadow\:var\(--after-shadow,-10px_0_red\)\]) {
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
}

.card-title {
  color: #00ffc8;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
}

/* 归档内容 */
.archive-body {
  padding: 25px;
}

.year-group {
  margin-bottom: 40px;
}

.year-header {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.2);
  padding-bottom: 10px;
}

.year-header h3 {
  color: #00ffc8;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
}

.month-group {
  margin-bottom: 30px;
}

.month-header {
  margin-bottom: 15px;
  border-left: 3px solid #00ffc8;
  padding-left: 15px;
}

.month-header h4 {
  color: #e0e0e0;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
}

.article-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.article-item {
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 15px;
}

.article-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.article-link {
  display: block;
  text-decoration: none;
  color: #e0e0e0;
  transition: all 0.3s ease;
}

.article-link:hover {
  color: #00ffc8;
}

.article-title {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.article-link:hover .article-title {
  color: #00ffc8;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.85rem;
  color: #888;
}

.article-date {
  color: #00ffc8;
  font-weight: 500;
}

.article-category {
  background: rgba(0, 255, 200, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  color: #00ffc8;
}

.article-stats {
  font-size: 0.75rem;
  color: #999;
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

  .year-header h3 {
    font-size: 1.3rem;
  }

  .month-header h4 {
    font-size: 1.1rem;
  }

  .article-title {
    font-size: 1rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 5px;
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