<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DecryptedText from '@/components/vue-bits/DecryptedText.vue'
import LiquidEther from '@/components/vue-bits/LiquidEther.vue'
// ✅ 新增引入刚才创建的三个组件
import LeftSidebar from '@/views/tech/components/LeftSidebar.vue'
import ArticleFeed from '@/views/tech/components/ArticleFeed.vue'
import RightWidgets from '@/views/tech/components/RightWidgets.vue'

const router = useRouter()
const { t } = useI18n()

const timeString = ref('00:00:00')
onMounted(() => {
  setInterval(() => {
    timeString.value = new Date().toLocaleTimeString('en-GB', { hour12: false })
  }, 1000)
})

const menuItems = [
  { label: 'HOME', key: 'home', active: true },
  { label: 'PROJECTS', key: 'projects' },
  { label: 'ABOUT', key: 'about' },
  { label: 'LOGS', key: 'logs' }
]

const goBack = () => router.push('/')
</script>

<template>
  <div class="tech-layout">

    <div class="hero-section">

      <!-- ✅ 完全保留您原始的 liquid-wrapper 代码，无任何修改 -->
      <div class="liquid-wrapper">
        <LiquidEther :colors="['#48FF28', '#A2FFC6', '#9EF19E']" :mouseForce="20" :cursorSize="100" :isViscous="false"
          :viscous="30" :iterationsViscous="32" :iterationsPoisson="32" :resolution="0.5" :isBounce="false"
          :autoDemo="true" :autoSpeed="0.5" :autoIntensity="2.2" :takeoverDuration="0.25" :autoResumeDelay="3000"
          :autoRampDuration="0.6" />
        <div class="gradient-overlay"></div>
      </div>

      <nav class="island-nav">
        <div class="nav-left">
          <span class="logo-icon">⌘</span>
          <span class="logo-text">biscuit_OS</span>
        </div>

        <ul class="nav-center">
          <li v-for="item in menuItems" :key="item.key" :class="{ 'active': item.active }">
            <a href="#">{{ item.label }}</a>
            <div class="active-indicator"></div>
          </li>
        </ul>

        <div class="nav-right">
          <span class="sys-time">{{ timeString }}</span>
          <button class="esc-btn" @click="goBack">ESC</button>
        </div>
      </nav>

      <div class="hero-content">
        <div class="title-box">
          <DecryptedText text="BISCUIT BLOG" :speed="70" class="main-title" animateOn="view" />
          <p class="sub-title">/// DIGITAL ARCHITECT & CREATIVE DEV ///</p>
        </div>
      </div>

    </div>

    <main class="main-content">
      <div class="bento-grid">
        
        <div class="grid-col left-col">
          <LeftSidebar />
        </div>

        <div class="grid-col center-col">
          <ArticleFeed />
        </div>

        <div class="grid-col right-col">
          <RightWidgets />
        </div>

      </div>
    </main>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;500;700&display=swap');

/* 全局重置 */
.tech-layout {
  background-color: #050505;
  color: #eee;
  font-family: 'JetBrains Mono', monospace;
  overflow-x: hidden;
}

/* === 1. 顶部 Hero 区域 (70vh) === */
.hero-section {
  position: relative;
  width: 100%;
  height: 70vh;
  background: #000;
  overflow: hidden;
}

.liquid-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* 底部渐变遮罩 */
.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, transparent, #050505);
  pointer-events: none;
}

/* === 2. 悬浮菜单 (极简风) === */
.island-nav {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 60px;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  /* 极简玻璃态 */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  transition: all 0.3s ease;
}

.island-nav:hover {
  background: rgba(0, 0, 0, 0.6);
  border-color: rgba(0, 255, 200, 0.3);
}

/* Logo */
.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #fff;
}

.logo-icon {
  color: #00ffc8;
  font-size: 1.2rem;
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

/* Center Menu */
.nav-center {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.nav-center li {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-center a {
  text-decoration: none;
  color: #888;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-center li:hover a,
.nav-center li.active a {
  color: #fff;
}

/* 激活态小灯 */
.active-indicator {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #00ffc8;
  border-radius: 50%;
  box-shadow: 0 0 5px #00ffc8;
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-center li.active .active-indicator {
  opacity: 1;
}

/* Right */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.85rem;
  color: #666;
}

.esc-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.esc-btn:hover {
  background: #fff;
  color: #000;
}

/* === 3. 中间文字 === */
.hero-content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.title-box {
  text-align: center;
}

.main-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 4px;
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(0, 255, 200, 0.4);
}

.sub-title {
  color: #00ffc8;
  font-size: 0.9rem;
  letter-spacing: 3px;
  margin-top: 15px;
  opacity: 0.8;
}

/* === 4. 下方内容 (Grid 布局) === */
.main-content {
  min-height: 100vh;
  background: #050505;
  padding: 40px 20px;
  position: relative;
  z-index: 10;
}

.bento-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  /* 定义三列：左侧280px，中间自适应，右侧280px */
  grid-template-columns: 280px 1fr 280px;
  gap: 24px;
  align-items: start;
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .bento-grid {
    grid-template-columns: 260px 1fr; 
  }
  .right-col { display: none; } /* 平板隐藏右侧 */
}

@media (max-width: 768px) {
  .hero-section { height: 60vh; }
  .island-nav { top: 20px; height: 50px; width: 95%; }
  .nav-center { display: none; }
  .main-title { font-size: 2.5rem; }
  
  .bento-grid { grid-template-columns: 1fr; }
  .left-col { order: 2; }
  .center-col { order: 1; }
  .right-col { order: 3; display: flex; } /* 手机显示所有 */
}
</style>