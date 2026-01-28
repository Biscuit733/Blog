<script setup>
import { ref, onMounted, computed, nextTick, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LiquidEther from '@/components/vue-bits/LiquidEther.vue'
import GlitchText from '@/components/vue-bits/GlitchText.vue'
import ArchiveComponent from '@/components/tech/ArchiveComponent.vue'
import LinksComponent from '@/components/tech/LinksComponent.vue'
import MyComponent from '@/components/tech/MyComponent.vue'
import AboutComponent from '@/components/tech/AboutComponent.vue'

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
const activeMenu = ref('home')
const menuItems = computed(() => [
  { label: t('tech.menu.home'), key: 'home' },
  { label: t('tech.menu.archive'), key: 'archive' },
  { label: t('tech.menu.links'), key: 'links' },
  { label: t('tech.menu.my'), key: 'my' },
  { label: t('tech.menu.about'), key: 'about' },
  { label: t('tech.menu.other'), key: 'other' }
])

// GlitchText元素引用
const heroTextRef = ref(null)

// 访客信息
const visitorInfo = {
  os: 'Windows 11',
  device: 'Desktop',
  browser: 'Chrome 135',
  ip: '无法获取公网IP',
  location: '本地访问'
}

// 日历数据
const currentDate = ref(new Date())
const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

// 生成日历
const generateCalendar = () => {
  const firstDay = new Date(year.value, month.value, 1)
  const lastDay = new Date(year.value, month.value + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const calendarDays = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    calendarDays.push(date)
  }
  return calendarDays
}

const calendarDays = computed(() => generateCalendar())
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthName = computed(() => monthNames[month.value])

// 文章数据
const articles = [
  {
    id: 1,
    title: '🌟:-D简单自我介绍一下',
    date: '2025-09-08',
    wordCount: 308,
    readTime: 2,
    content: '一个在大学的海洋中挣扎求生的过度思考者，正在将屎山雕琢成艺术品的路上...'
  },
  {
    id: 2,
    title: '⚡ 优先级队列（堆！堆！堆！）',
    date: '2025-08-12',
    wordCount: 1681,
    readTime: 8,
    content: '本文将系统性地介绍优先级队列（Priority Queue）就是这样一个不讲武德的数据结构，它不遵循FIFO（先进先出），而是谁优先级高谁先出。'
  },
  {
    id: 3,
    title: '🌳二叉树从基础概念到应用实践',
    date: '2025-04-27',
    wordCount: 1362,
    readTime: 7,
    content: '本文将系统性地介绍二叉树的核心知识点，包括基本概念、性质、存储方式、遍历方法以及常见面试题解析。'
  }
]

// 终端命令
const terminalInput = ref('')
const terminalHistory = ref([
  '$ Welcome to Overthinker-Blog Terminal Emulator',
  '$ Type \'help\' to see available commands',
  '$'
])

const executeCommand = () => {
  if (!terminalInput.value.trim()) {
    terminalHistory.value.push('$')
    terminalInput.value = ''
    return
  }

  terminalHistory.value.push(`$ ${terminalInput.value}`)

  // 简单的命令处理
  if (terminalInput.value.toLowerCase() === 'help') {
    terminalHistory.value.push('Available commands:')
    terminalHistory.value.push('  help - Show this help message')
    terminalHistory.value.push('  clear - Clear terminal history')
    terminalHistory.value.push('  date - Show current date and time')
  } else if (terminalInput.value.toLowerCase() === 'clear') {
    terminalHistory.value = ['$']
  } else if (terminalInput.value.toLowerCase() === 'date') {
    terminalHistory.value.push(new Date().toString())
  } else {
    terminalHistory.value.push(`Command not found: ${terminalInput.value}`)
  }

  terminalHistory.value.push('$')
  terminalInput.value = ''
}

// 导航到其他页面
const navigateTo = (key) => {
  activeMenu.value = key
  // 不需要路由跳转，通过条件渲染实现单页应用效果
}

// 返回入口
const goBack = () => router.push('/')
</script>

<template>
  <div class="tech-layout">
    <main class="main-content">
      <section class="hero-section">
        <div class="liquid-wrapper full-width">
          <LiquidEther :colors="['#48FF28', '#A2FFC6', '#9EF19E']" :mouseForce="20" :cursorSize="100" :isViscous="false"
            :viscous="30" :iterationsViscous="32" :iterationsPoisson="32" :resolution="0.5" :isBounce="false"
            :autoDemo="true" :autoSpeed="0.5" :autoIntensity="2.2" :takeoverDuration="0.25" :autoResumeDelay="3000"
            :autoRampDuration="0.6" />
          <div class="gradient-overlay"></div>

          <header class="integrated-header">
            <div class="header-content">
              <div class="logo-section">
                <a href="#" class="logo">
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
                    <a href="#" @click.prevent="navigateTo(item.key)">
                      <span v-if="item.key === 'home'" class="menu-icon">🏠</span>
                      <span v-else-if="item.key === 'archive'" class="menu-icon">📦</span>
                      <span v-else-if="item.key === 'links'" class="menu-icon">🔗</span>
                      <span v-else-if="item.key === 'my'" class="menu-icon">👤</span>
                      <span v-else-if="item.key === 'about'" class="menu-icon">ℹ️</span>
                      <span v-else-if="item.key === 'other'" class="menu-icon">⋮</span>
                      <span class="menu-text">{{ item.label }}</span>
                      <span v-if="item.key === 'home'" class="status-dot green"></span>
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

          <div class="hero-text">
            <GlitchText 
              ref="heroTextRef"
              :children="t('tech.hero.title')" 
              :speed="0.8" 
              :enable-shadows="true" 
              :enable-on-hover="false"
              class-name="hero-glitch" 
            />
          </div>
        </div>
      </section>

      <section class="main-content-area">
        <div class="content-container">
          <!-- 首页内容 -->
          <template v-if="activeMenu === 'home'">
            <div class="left-content">
              <div class="card profile-card">
                <div class="card-header">
                  <span class="card-title">Overthinker</span>
                </div>
                <div class="profile-content">
                  <p class="profile-quote">"无所谓，跳探戈不像人生，一步跳错了，继续跳就行了"</p>
                </div>
              </div>

              <div class="card visitor-card">
                <div class="card-header">
                  <span class="card-title">visitor-info</span>
                </div>
                <div class="visitor-content">
                  <p class="welcome-text">欢迎访问本站！</p>
                  <p class="connection-status">连接似乎有些问题，请稍后再试。</p>
                  <ul class="info-list">
                    <li><strong>操作系统</strong> {{ visitorInfo.os }}</li>
                    <li><strong>设备类型</strong> {{ visitorInfo.device }}</li>
                    <li><strong>浏览器</strong> {{ visitorInfo.browser }}</li>
                    <li><strong>您的IP地址</strong> {{ visitorInfo.ip }}</li>
                    <li><strong>当前位置</strong> {{ visitorInfo.location }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="center-content">
              <div class="card terminal-card">
                <div class="card-header">
                  <span class="card-title">terminal</span>
                </div>
                <div class="terminal-body">
                  <div class="terminal-history">
                    <p v-for="(line, index) in terminalHistory" :key="index">{{ line }}</p>
                  </div>
                  <div class="terminal-input">
                    <span class="prompt">$</span>
                    <input type="text" v-model="terminalInput" @keyup.enter="executeCommand"
                      placeholder="Type commands here..." />
                  </div>
                </div>
              </div>

              <div class="card articles-card">
                <div class="card-header">
                  <span class="card-title">articles</span>
                </div>
                <div class="articles-content">
                  <article v-for="article in articles" :key="article.id" class="article-item">
                    <div class="article-header">
                      <span class="article-date">{{ article.date }}</span>
                      <span class="article-tags">生活感悟 / Overthinker / 日常打卡 / 思考</span>
                    </div>
                    <h3 class="article-title">
                      <a href="#">{{ article.title }}</a>
                    </h3>
                    <div class="article-stats">{{ article.wordCount }} 字 | {{ article.readTime }} 分钟</div>
                    <div class="article-content">
                      <p>{{ article.content }}</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div class="right-content">
              <div class="card calendar-card">
                <div class="card-header">
                  <span class="card-title">{{ monthName }} {{ year }}</span>
                </div>
                <div class="calendar-grid">
                  <div class="weekdays">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                  <div class="days">
                    <div v-for="(day, index) in calendarDays" :key="index" class="day">
                      {{ day.getDate() }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="card clock-card">
                <div class="card-header">
                  <span class="card-title">system time</span>
                </div>
                <div class="clock-content">
                  <div class="time-display">{{ timeString }}</div>
                </div>
              </div>
            </div>
          </template>

          <!-- 归档页面 -->
          <template v-else-if="activeMenu === 'archive'">
            <div class="full-width-content">
              <ArchiveComponent />
            </div>
          </template>

          <!-- 链接页面 -->
          <template v-else-if="activeMenu === 'links'">
            <div class="full-width-content">
              <LinksComponent />
            </div>
          </template>

          <!-- 我的页面 -->
          <template v-else-if="activeMenu === 'my'">
            <div class="full-width-content">
              <MyComponent />
            </div>
          </template>

          <!-- 关于页面 -->
          <template v-else-if="activeMenu === 'about'">
            <div class="full-width-content">
              <AboutComponent />
            </div>
          </template>
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
  height: 70vh;
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

/* -----------------------------------------------------------
   ✅ 修复核心区域：英雄标题文字
   ----------------------------------------------------------- */

/* 动画区域文字容器 - 使用 Flex 完美居中 */
.hero-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* 关键：占满高度，不再用 top:50% */
  z-index: 10;
  
  /* 使用 Flexbox 强制垂直水平居中 */
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column;
  
  /* 移除所有会导致位移的 transform */
  transform: none !important; 
  padding: 0 20px; /* 防止手机端贴边 */
  pointer-events: none; /* 让鼠标事件穿透到背景动画（如果需要文字可点，请删掉这行）*/
}

/* 修复 GlitchText 内部容器：
   由 width: 100% 改为 auto，确保容器紧贴文字，
   这样绝对定位的故障特效层才会以文字为基准，而不是屏幕边缘。
*/
.hero-text :deep(.relative) {
  width: auto !important;
  height: auto !important;
  display: flex !important; /* 确保内部也是 Flex */
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
  margin: 0 auto !important;
}

/* 修复内部文字层 */
.hero-text :deep(.text-white.font-black) {
  display: block !important;
  width: auto !important;
  white-space: nowrap !important; /* 强制不换行 */
  text-align: center !important;
  margin: 0 !important;
  position: relative !important;
  left: auto !important;
  top: auto !important;
  transform: none !important;
}

/* Glitch 特效样式微调 */
.hero-glitch {
  --after-duration: 2.4s;
  --before-duration: 1.6s;
  --after-shadow: -3px 0 #ff0000;
  --before-shadow: 3px 0 #00ffc8;
  
  display: inline-block !important;
  position: relative !important;
  margin: 0 auto !important;
  /* 确保文字在任何情况下都是居中的 */
  text-align: center !important;
}

/* 字体与颜色修正 */
.hero-glitch :deep(div),
.hero-glitch :deep(.text-white),
.hero-glitch :deep(.before\:text-white),
.hero-glitch :deep(.after\:text-white) {
  color: #00ffc8 !important;
}

.hero-glitch :deep(div) {
  text-shadow: 0 0 30px rgba(0, 255, 200, 0.8) !important;
}

.hero-glitch :deep(.font-black) {
  font-weight: 900 !important;
}

.hero-glitch :deep(.text-\[clamp\(2rem,10vw,8rem\)\]) {
  font-size: clamp(3rem, 8vw, 6rem) !important;
  line-height: 1.1;
  font-weight: 900 !important;
}

/* 确保故障伪元素紧贴文字 */
.hero-glitch :deep(.before),
.hero-glitch :deep(.after) {
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;
  position: absolute !important;
  display: block !important;
}

/* 覆盖原始 CSS 中可能存在的背景色或定位偏移 */
.hero-glitch :deep(.before\:bg-\[\#0b0b0b\]),
.hero-glitch :deep(.after\:bg-\[\#0b0b0b\]) {
  background: #050505 !important;
}

.hero-glitch :deep(.before\:overflow-hidden),
.hero-glitch :deep(.after\:overflow-hidden) {
  overflow: hidden !important;
}

.hero-glitch :deep(.before\:\[clip-path\:inset\(0_0_0_0\)\]),
.hero-glitch :deep(.after\:\[clip-path\:inset\(0_0_0_0\)\]) {
  clip-path: inset(0 0 0 0) !important;
}

/* 保持原有动画 */
.hero-glitch :deep(.before\:\[animation\:animate-glitch_var\(--before-duration,2s\)_infinite_linear_alternate-reverse\]) {
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse !important;
}

.hero-glitch :deep(.after\:\[animation\:animate-glitch_var\(--after-duration,3s\)_infinite_linear_alternate-reverse\]) {
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse !important;
}

.hero-glitch :deep(.before\:\[text-shadow\:var\(--before-shadow,10px_0_cyan\)\]) {
  text-shadow: var(--before-shadow, 3px 0 #00ffc8) !important;
}

.hero-glitch :deep(.after\:\[text-shadow\:var\(--after-shadow,-10px_0_red\)\]) {
  text-shadow: var(--after-shadow, -3px 0 #ff0000) !important;
}

/* -----------------------------------------------------------
   主要内容区域
   ----------------------------------------------------------- */
.main-content-area {
  padding: 40px 0;
  background-color: #050505;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 30px;
}

/* 全宽内容区域 */
.full-width-content {
  grid-column: 1 / -1;
  width: 100%;
}

/* 卡片样式 */
.card {
  background: rgba(15, 15, 15, 0.9);
  border: none;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;
}

.card:hover {
  border: none;
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

/* 个人介绍卡片 */
.profile-card {
  text-align: left;
  padding: 30px 20px;
}

.profile-header h3 {
  color: #00ffc8;
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
}

.profile-header p {
  color: #ccc;
  font-style: italic;
  margin: 0;
  line-height: 1.5;
}

/* 终端卡片 */
.terminal-body {
  padding: 20px;
  min-height: 200px;
}

.terminal-history {
  margin-bottom: 15px;
  max-height: 150px;
  overflow-y: auto;
}

.terminal-history p {
  margin: 8px 0;
  color: #ccc;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.terminal-input {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 255, 200, 0.1);
  padding-top: 15px;
}

.prompt {
  color: #00ffc8;
  margin-right: 15px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
}

.terminal-input input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  flex: 1;
}

/* 留言板卡片 */
.message-board {
  min-height: 600px;
}

.message-content {
  padding: 25px;
}

.message-item {
  background: rgba(20, 20, 20, 0.8);
  border: none;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.message-date {
  color: #00ffc8;
  font-weight: 500;
}

.message-tags {
  color: #888;
  font-size: 0.9rem;
}

.message-title {
  color: #fff;
  margin: 10px 0;
  font-size: 1.1rem;
}

.message-stats {
  color: #888;
  font-size: 0.8rem;
  margin-bottom: 15px;
}

/* 文章列表 */
.article-list {
  margin-top: 30px;
}

.article-item {
  background: rgba(20, 20, 20, 0.8);
  border: none;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.article-item:hover {
  border: none;
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.1);
  transform: translateX(10px);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.article-date {
  color: #00ffc8;
  font-weight: 500;
}

.article-tags {
  color: #888;
  font-size: 0.9rem;
}

.article-title {
  margin: 0 0 15px 0;
}

.article-title a {
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.article-title a:hover {
  color: #00ffc8;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
}

.article-stats {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.article-content p {
  color: #ccc;
  line-height: 1.6;
  margin: 0;
}

/* 日历卡片 */
.calendar-grid {
  padding: 20px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 15px;
}

.weekdays span {
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  font-weight: 500;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day {
  text-align: center;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(25, 25, 25, 0.8);
  border: none;
}

.day:hover {
  background: rgba(0, 255, 200, 0.2);
  color: #00ffc8;
  transform: scale(1.1);
}

/* 访客信息卡片 */
.visitor-content {
  padding: 20px;
}

.welcome-text {
  color: #fff;
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.connection-status {
  color: #ff6b6b;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.info-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.info-list li {
  color: #ccc;
  margin-bottom: 12px;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
}

.info-list strong {
  color: #00ffc8;
  font-weight: 500;
}

/* 时钟卡片 */
.clock-content {
  padding: 25px;
  text-align: center;
}

.time-display {
  color: #00ffc8;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 20px rgba(0, 255, 200, 0.8);
  letter-spacing: 2px;
}

/* 个人介绍卡片 */
.profile-content {
  padding: 25px;
}

.profile-quote {
  color: #ccc;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
  text-align: center;
}

/* 文章列表 */
.articles-content {
  padding: 25px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-container {
    grid-template-columns: 250px 1fr;
  }

  .right-content {
    display: none;
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
    grid-template-columns: 1fr;
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
</style>