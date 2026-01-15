<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 引入 Vue-Bits 组件
import SpotlightCard from '@/components/vue-bits/SpotlightCard.vue'
import DecryptedText from '@/components/vue-bits/DecryptedText.vue'
import Orb from '@/components/vue-bits/Orb.vue' // 假设你有这个组件

const router = useRouter()
const { t } = useI18n()

// 模拟系统时间
const timeString = ref('00:00:00')
const updateTime = () => {
  const now = new Date()
  timeString.value = now.toLocaleTimeString('en-GB', { hour12: false }) // 24小时制
}

// 模拟技术栈数据
const techStack = ref([
  { name: 'Vue 3', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Three.js', level: 60 }
])

onMounted(() => {
  setInterval(updateTime, 1000)
  updateTime()
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="cyber-container">
    
    <div class="cyber-bg"></div>

    <nav class="cyber-nav">
      <div class="nav-left">
        <span class="brand">biscuit_OS <span class="blink">_</span></span>
      </div>
      <div class="nav-right">
        <span class="sys-time">{{ timeString }}</span>
        <button class="exit-btn" @click="goBack">[ ESC ]</button>
      </div>
    </nav>

    <main class="bento-grid">
      
      <SpotlightCard class="bento-item hero-card" spotlightColor="rgba(0, 255, 200, 0.2)">
        <div class="card-content">
          <div class="cyber-header">
            <DecryptedText 
              :text="t('tech.welcome')" 
              class="glitch-title"
              :speed="50"
              animateOn="view"
            />
            <div class="sub-title">{{ t('tech.designation') }}</div>
          </div>
          
          <div class="bio-text">
            <p>>> {{ t('tech.bio.p1') }}</p>
            <p class="highlight">{{ t('tech.bio.p2') }}</p>
          </div>

          <div class="location-tag">
            <span class="icon">📍</span> {{ t('tech.bio.location') }}
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard class="bento-item orb-card" spotlightColor="rgba(180, 0, 255, 0.2)">
        <div class="orb-container">
          <Orb 
            :hoverIntensity="0.5" 
            :scale="1.2" 
            class="cyber-orb"
          />
        </div>
        <div class="status-panel">
          <span class="label">STATUS:</span>
          <span class="value online">{{ t('tech.status.online') }}</span>
        </div>
      </SpotlightCard>

      <SpotlightCard class="bento-item stack-card" spotlightColor="rgba(255, 100, 0, 0.15)">
        <h3 class="section-title">
          <span class="bracket">[</span> {{ t('tech.headers.stack') }} <span class="bracket">]</span>
        </h3>
        <ul class="tech-list">
          <li v-for="tech in techStack" :key="tech.name" class="tech-row">
            <span class="tech-name">{{ tech.name }}</span>
            <div class="progress-bar">
              <div class="fill" :style="{ width: tech.level + '%' }"></div>
            </div>
          </li>
        </ul>
      </SpotlightCard>

      <SpotlightCard class="bento-item links-card" spotlightColor="rgba(0, 150, 255, 0.2)">
        <h3 class="section-title">{{ t('tech.headers.projects') }}</h3>
        <div class="link-group">
          <a href="https://github.com" target="_blank" class="cyber-btn">
            {{ t('tech.btn_github') }}
          </a>
          <button class="cyber-btn outline">
            {{ t('tech.btn_email') }}
          </button>
        </div>
      </SpotlightCard>

    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;700&display=swap');

/* === 全局容器 === */
.cyber-container {
  min-height: 100vh;
  background-color: #050505; /* 极黑背景 */
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* === 背景网格 === */
.cyber-bg {
  position: fixed; inset: 0;
  background-image: 
    linear-gradient(rgba(20, 255, 200, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 255, 200, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

/* === 导航栏 === */
.cyber-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 40px;
  position: relative; z-index: 10;
}
.brand { font-size: 1.5rem; font-weight: bold; color: #00ffc8; }
.blink { animation: blink 1s infinite; }
.sys-time { color: #666; margin-right: 20px; }
.exit-btn {
  background: transparent; border: 1px solid #333; color: #666;
  padding: 5px 15px; cursor: pointer; font-family: inherit;
  transition: all 0.2s;
}
.exit-btn:hover { border-color: #f00; color: #f00; }

/* === Bento Grid 布局核心 === */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列 */
  grid-template-rows: repeat(2, 300px);  /* 2行，每行300px高 */
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative; z-index: 1;
}

/* 这里的 :deep 是为了穿透 SpotlightCard 的样式 */
.bento-item {
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}
.bento-item:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.1);
}

/* 格子占位定义 */
.hero-card { grid-column: span 2; grid-row: span 1; } /* 左上：跨2列 */
.orb-card { grid-column: span 1; grid-row: span 1; }  /* 右上：1x1 */
.stack-card { grid-column: span 1; grid-row: span 1; } /* 右下：1x1 */
.links-card { grid-column: span 2; grid-row: span 1; } /* 左下：跨2列 */

/* === 卡片内容样式 === */
.card-content { padding: 30px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }

.glitch-title { font-size: 2.5rem; font-weight: bold; color: #fff; letter-spacing: -1px; }
.sub-title { color: #666; font-size: 0.9rem; margin-top: 5px; }

.bio-text { color: #aaa; font-size: 1rem; line-height: 1.6; margin-top: 20px; }
.bio-text .highlight { color: #00ffc8; margin-top: 10px; }

.location-tag { margin-top: auto; font-size: 0.8rem; color: #444; display: flex; align-items: center; gap: 5px; }

/* Orb 卡片 */
.orb-container { height: 80%; display: flex; align-items: center; justify-content: center; }
.status-panel { height: 20%; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; border-top: 1px solid rgba(255,255,255,0.05); }
.status-panel .value.online { color: #0f0; text-shadow: 0 0 5px #0f0; }

/* 技术栈列表 */
.stack-card { padding: 20px; }
.section-title { font-size: 1.2rem; color: #888; margin-bottom: 20px; }
.bracket { color: #333; }
.tech-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; }
.tech-name { font-size: 0.9rem; color: #ccc; }
.progress-bar { width: 100px; height: 4px; background: #222; border-radius: 2px; overflow: hidden; }
.fill { height: 100%; background: #ff6400; box-shadow: 0 0 10px rgba(255,100,0,0.5); }

/* 链接卡片 */
.links-card { padding: 30px; display: flex; flex-direction: column; justify-content: center; }
.link-group { display: flex; gap: 20px; margin-top: 10px; }
.cyber-btn {
  background: #0096ff; color: #000; font-weight: bold;
  border: none; padding: 12px 30px; font-family: inherit; font-size: 1rem;
  cursor: pointer; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: all 0.2s; text-decoration: none; display: inline-block;
}
.cyber-btn:hover { background: #fff; box-shadow: 0 0 15px rgba(0,150,255,0.6); }
.cyber-btn.outline { background: transparent; border: 1px solid #0096ff; color: #0096ff; }
.cyber-btn.outline:hover { background: rgba(0,150,255,0.1); color: #fff; }

@keyframes blink { 50% { opacity: 0; } }

/* 移动端适配 */
@media (max-width: 900px) {
  .bento-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
  .hero-card, .orb-card, .stack-card, .links-card { grid-column: span 1; grid-row: auto; min-height: 250px; }
}
</style>