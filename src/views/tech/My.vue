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
                      <span v-if="item.key === 'my'" class="status-dot green"></span>
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
                :children="t('tech.my.title')" 
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
        <!-- 个人信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h2 class="card-title">
              <GlitchText 
                :children="t('tech.my.profile.title')" 
                :speed="0.7" 
                :enable-shadows="true" 
                :enable-on-hover="false"
                class-name="section-glitch" 
              />
            </h2>
          </div>
          <div class="card-body">
            <div class="profile-info">
              <div class="profile-avatar">
                <div class="avatar-circle">
                  <span class="avatar-text">{{ t('tech.my.profile.avatar') }}</span>
                </div>
              </div>
              <div class="profile-details">
                <div class="profile-item">
                  <span class="profile-label">{{ t('tech.my.profile.name') }}:</span>
                  <span class="profile-value">{{ t('tech.my.profile.nameValue') }}</span>
                </div>
                <div class="profile-item">
                  <span class="profile-label">{{ t('tech.my.profile.location') }}:</span>
                  <span class="profile-value">{{ t('tech.my.profile.locationValue') }}</span>
                </div>
                <div class="profile-item">
                  <span class="profile-label">{{ t('tech.my.profile.occupation') }}:</span>
                  <span class="profile-value">{{ t('tech.my.profile.occupationValue') }}</span>
                </div>
                <div class="profile-item">
                  <span class="profile-label">{{ t('tech.my.profile.email') }}:</span>
                  <span class="profile-value">{{ t('tech.my.profile.emailValue') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 技能卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h2 class="card-title">
              <GlitchText 
                :children="t('tech.my.skills.title')" 
                :speed="0.7" 
                :enable-shadows="true" 
                :enable-on-hover="false"
                class-name="section-glitch" 
              />
            </h2>
          </div>
          <div class="card-body">
            <div class="skills-grid">
              <div 
                v-for="skill in skills" 
                :key="skill.name"
                class="skill-item"
              >
                <div class="skill-name">{{ skill.name }}</div>
                <div class="skill-bar">
                  <div 
                    class="skill-progress"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
                <div class="skill-level">{{ skill.level }}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 兴趣爱好卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h2 class="card-title">
              <GlitchText 
                :children="t('tech.my.hobbies.title')" 
                :speed="0.7" 
                :enable-shadows="true" 
                :enable-on-hover="false"
                class-name="section-glitch" 
              />
            </h2>
          </div>
          <div class="card-body">
            <div class="hobbies-list">
              <div 
                v-for="hobby in hobbies" 
                :key="hobby"
                class="hobby-tag"
              >
                {{ hobby }}
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
const activeMenu = ref('my')
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

// 技能数据
const skills = [
  { name: t('tech.my.skills.items.html'), level: 90 },
  { name: t('tech.my.skills.items.css'), level: 85 },
  { name: t('tech.my.skills.items.js'), level: 80 },
  { name: t('tech.my.skills.items.vue'), level: 75 },
  { name: t('tech.my.skills.items.python'), level: 70 },
  { name: t('tech.my.skills.items.design'), level: 65 }
]

// 兴趣爱好
const hobbies = [
  t('tech.my.hobbies.items.gaming'),
  t('tech.my.hobbies.items.coding'),
  t('tech.my.hobbies.items.reading'),
  t('tech.my.hobbies.items.music'),
  t('tech.my.hobbies.items.movies'),
  t('tech.my.hobbies.items.travel')
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
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

/* 信息卡片 */
.info-card {
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.3);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.info-card:hover {
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
}

.section-glitch {
  font-size: 1.5rem;
}

.card-body {
  padding: 20px;
}

/* 个人信息 */
.profile-info {
  display: flex;
  align-items: center;
  gap: 30px;
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ffc8, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.5);
}

.avatar-text {
  font-size: 2rem;
  font-weight: bold;
  color: #0a0a0a;
}

.profile-details {
  flex: 1;
}

.profile-item {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.profile-label {
  width: 120px;
  color: #888;
  font-size: 14px;
}

.profile-value {
  color: #00ffc8;
  font-size: 14px;
  font-weight: 500;
}

/* 技能样式 */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.skill-name {
  font-size: 14px;
  color: #00ffc8;
  margin-bottom: 5px;
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: rgba(0, 255, 200, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #00ffc8, #0080ff);
  border-radius: 4px;
  transition: width 1s ease;
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
}

.skill-level {
  font-size: 12px;
  color: #888;
  text-align: right;
  margin-top: 2px;
}

/* 兴趣爱好 */
.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hobby-tag {
  padding: 8px 16px;
  background: rgba(0, 255, 200, 0.1);
  border: 1px solid rgba(0, 255, 200, 0.3);
  border-radius: 20px;
  font-size: 14px;
  color: #00ffc8;
  transition: all 0.3s ease;
}

.hobby-tag:hover {
  background: rgba(0, 255, 200, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
  transform: translateY(-2px);
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
  
  .content-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .profile-info {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .profile-item {
    justify-content: center;
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

.info-card {
  animation: fadeIn 0.8s ease forwards;
}

.info-card:nth-child(1) {
  animation-delay: 0.2s;
}

.info-card:nth-child(2) {
  animation-delay: 0.4s;
}

.info-card:nth-child(3) {
  animation-delay: 0.6s;
}
</style>