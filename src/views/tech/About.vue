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
                    <a href="#" @click.prevent="navigateTo(item.key)">
                      <span v-if="item.key === 'home'" class="menu-icon">🏠</span>
                      <span v-else-if="item.key === 'archive'" class="menu-icon">📦</span>
                      <span v-else-if="item.key === 'links'" class="menu-icon">🔗</span>
                      <span v-else-if="item.key === 'my'" class="menu-icon">👤</span>
                      <span v-else-if="item.key === 'about'" class="menu-icon">ℹ️</span>
                      <span v-else-if="item.key === 'other'" class="menu-icon">⋮</span>
                      <span class="menu-text">{{ item.label }}</span>
                      <span v-if="item.key === 'about'" class="status-dot green"></span>
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

            <div class="hero-text">
              <GlitchText 
                :children="t('tech.about.title')" 
                :speed="0.8" 
                :enable-shadows="true" 
                :enable-on-hover="false"
                class-name="hero-glitch" 
              />
            </div>
          </header>
        </div>
      </section>

      <section class="main-content-area">
        <div class="content-container">
        <!-- 关于页面标题 -->
        <div class="about-header">
          <h1 class="about-title">
            <GlitchText 
              :children="t('tech.about.title')" 
              :speed="0.8" 
              :enable-shadows="true" 
              :enable-on-hover="false"
              class-name="about-glitch" 
            />
          </h1>
          <p class="about-subtitle">{{ t('tech.about.subtitle') }}</p>
        </div>
        
        <!-- 关于内容卡片 -->
        <div class="about-card">
          <div class="card-header">
            <h2 class="card-title">{{ t('tech.about.section1.title') }}</h2>
          </div>
          <div class="card-body">
            <p class="about-text">{{ t('tech.about.section1.content') }}</p>
          </div>
        </div>
        
        <div class="about-card">
          <div class="card-header">
            <h2 class="card-title">{{ t('tech.about.section2.title') }}</h2>
          </div>
          <div class="card-body">
            <p class="about-text">{{ t('tech.about.section2.content') }}</p>
          </div>
        </div>
        
        <div class="about-card">
          <div class="card-header">
            <h2 class="card-title">{{ t('tech.about.section3.title') }}</h2>
          </div>
          <div class="card-body">
            <ul class="tech-stack">
              <li 
                v-for="tech in techStack" 
                :key="tech.name"
                class="tech-item"
              >
                <span class="tech-icon">{{ tech.icon }}</span>
                <span class="tech-name">{{ tech.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="about-card">
          <div class="card-header">
            <h2 class="card-title">{{ t('tech.about.section4.title') }}</h2>
          </div>
          <div class="card-body">
            <p class="about-text">{{ t('tech.about.section4.content') }}</p>
            <div class="contact-info">
              <div 
                v-for="contact in contactInfo" 
                :key="contact.type"
                class="contact-item"
              >
                <span class="contact-label">{{ contact.label }}:</span>
                <a 
                  :href="contact.url" 
                  :title="contact.title"
                  class="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ contact.value }}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 统计信息卡片 -->
        <div class="stats-card">
          <div class="card-header">
            <h2 class="card-title">{{ t('tech.about.stats.title') }}</h2>
          </div>
          <div class="card-body">
            <div class="stats-grid">
              <div 
                v-for="stat in stats" 
                :key="stat.label"
                class="stat-item"
              >
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LiquidEther from '@/components/vue-bits/LiquidEther.vue'
import GlitchText from '@/components/vue-bits/GlitchText.vue'

const router = useRouter()
const { t } = useI18n()

// 菜单状态
const activeMenu = ref('about')
const menuItems = computed(() => [
  { label: t('tech.menu.home'), key: 'home' },
  { label: t('tech.menu.archive'), key: 'archive' },
  { label: t('tech.menu.links'), key: 'links' },
  { label: t('tech.menu.my'), key: 'my' },
  { label: t('tech.menu.about'), key: 'about' },
  { label: t('tech.menu.other'), key: 'other' }
])

// 导航方法
const navigateTo = (key) => {
  activeMenu.value = key
  switch (key) {
    case 'home':
      router.push('/tech')
      break
    case 'archive':
      router.push('/tech/archive')
      break
    case 'links':
      router.push('/tech/links')
      break
    case 'my':
      router.push('/tech/my')
      break
    case 'about':
      router.push('/tech/about')
      break
    case 'other':
      // 其他页面逻辑
      break
  }
}

// 技术栈
const techStack = [
  { name: 'Vue 3', icon: '⚡' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Vite', icon: '🔥' },
  { name: 'Vue Router', icon: '🛣️' },
  { name: 'Vue I18n', icon: '🌍' }
]

// 联系信息
const contactInfo = [
  {
    type: 'email',
    label: t('tech.about.contact.email'),
    value: 'contact@example.com',
    url: 'mailto:contact@example.com',
    title: t('tech.about.contact.emailTitle')
  },
  {
    type: 'github',
    label: t('tech.about.contact.github'),
    value: 'github.com/username',
    url: 'https://github.com/username',
    title: t('tech.about.contact.githubTitle')
  },
  {
    type: 'twitter',
    label: t('tech.about.contact.twitter'),
    value: 'twitter.com/username',
    url: 'https://twitter.com/username',
    title: t('tech.about.contact.twitterTitle')
  }
]

// 统计信息
const stats = [
  {
    label: t('tech.about.stats.articles'),
    value: '42'
  },
  {
    label: t('tech.about.stats.posts'),
    value: '128'
  },
  {
    label: t('tech.about.stats.followers'),
    value: '256'
  },
  {
    label: t('tech.about.stats.views'),
    value: '10k+'
  }
]

// 返回入口
const goBack = () => router.push('/')
</script>

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

.main-nav {
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
}

.main-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.main-nav li {
  position: relative;
}

.main-nav a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  text-decoration: none;
  color: #00ffc8;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.main-nav a:hover {
  background: rgba(0, 255, 200, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.2);
}

.main-nav li.active a {
  background: rgba(0, 255, 200, 0.15);
  box-shadow: 0 0 8px rgba(0, 255, 200, 0.3);
}

.menu-icon {
  font-size: 0.85rem;
  opacity: 0.9;
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
  gap: 20px;
  flex-shrink: 0;
}

.status-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red {
  background: #e74c3c;
  box-shadow: 0 0 6px rgba(231, 76, 60, 0.6);
}

.dot.yellow {
  background: #f39c12;
  box-shadow: 0 0 6px rgba(243, 156, 18, 0.6);
}

.dot.green {
  background: #27ca3f;
  box-shadow: 0 0 6px rgba(39, 202, 63, 0.6);
}

.dot-dollar {
  color: #27ca3f;
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  margin-left: 5px;
}

.search-box {
  position: relative;
}

.search-input {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.3);
  border-radius: 15px;
  padding: 6px 12px;
  color: #00ffc8;
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  width: 120px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  width: 160px;
  box-shadow: 0 0 8px rgba(0, 255, 200, 0.3);
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #00ffc8;
  opacity: 0.8;
}

.icon:hover {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.6);
  opacity: 1;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.hero-glitch {
  --after-duration: 4s;
  --before-duration: 3s;
  --after-shadow: -4px 0 #ff0000;
  --before-shadow: 4px 0 #00ffc8;
  display: block;
  font-size: 3.5rem;
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  line-height: 1.2;
}

.hero-glitch :deep(div) {
  color: #ffffff !important;
  text-shadow: 0 0 15px rgba(0, 255, 200, 0.8), 0 0 30px rgba(0, 255, 200, 0.5) !important;
}

.main-content-area {
  position: relative;
  z-index: 2;
  padding: 40px 20px;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 关于页面标题 */
.about-header {
  text-align: center;
  margin-bottom: 20px;
}

.about-title {
  margin: 0 0 10px 0;
  font-size: 3rem;
}

.about-glitch {
  font-size: 3rem;
}

.about-subtitle {
  color: #888;
  font-size: 1.2rem;
  margin: 0;
}

/* 关于卡片 */
.about-card {
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.3);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.about-card:hover {
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.3);
  transform: translateY(-5px);
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.2);
  background: rgba(0, 255, 200, 0.05);
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  color: #00ffc8;
}

.card-body {
  padding: 20px;
}

.about-text {
  line-height: 1.8;
  color: #ccc;
  font-size: 1rem;
  margin: 0;
}

/* 技术栈 */
.tech-stack {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 255, 200, 0.1);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(0, 255, 200, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
  transform: translateY(-2px);
}

.tech-icon {
  font-size: 1.5rem;
}

.tech-name {
  font-size: 0.9rem;
  color: #00ffc8;
}

/* 联系信息 */
.contact-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-label {
  width: 100px;
  color: #888;
  font-size: 0.9rem;
}

.contact-link {
  color: #00ffc8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
}

.contact-link:hover {
  color: #ffffff;
  text-shadow: 0 0 5px #00ffc8;
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #00ffc8;
  transition: width 0.3s ease;
}

.contact-link:hover::after {
  width: 100%;
}

/* 统计信息卡片 */
.stats-card {
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.3);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stats-card:hover {
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.3);
  transform: translateY(-5px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(0, 255, 200, 0.05);
  border-radius: 5px;
  border: 1px solid rgba(0, 255, 200, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(0, 255, 200, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.2);
  transform: translateY(-3px);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #00ffc8;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #888;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .integrated-header {
    height: 300px;
  }
  
  .title-glitch {
    font-size: 2rem;
  }
  
  .nav-menu {
    top: 10px;
    right: 10px;
    gap: 10px;
    padding: 5px 10px;
  }
  
  .nav-item {
    font-size: 12px;
    padding: 3px 8px;
  }
  
  .main-content {
    padding: 20px 10px;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .about-glitch {
    font-size: 2rem;
  }
  
  .about-subtitle {
    font-size: 1rem;
  }
  
  .tech-stack {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .tech-item {
    font-size: 0.8rem;
    padding: 8px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .contact-label {
    width: 100%;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-card,
.stats-card {
  animation: fadeIn 0.8s ease forwards;
}

.about-card:nth-child(1) {
  animation-delay: 0.2s;
}

.about-card:nth-child(2) {
  animation-delay: 0.4s;
}

.about-card:nth-child(3) {
  animation-delay: 0.6s;
}

.about-card:nth-child(4) {
  animation-delay: 0.8s;
}

.stats-card {
  animation-delay: 1s;
}
</style>