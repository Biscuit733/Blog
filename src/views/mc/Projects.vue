<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// 記得先確保有獲取 baseUrl
const baseUrl = import.meta.env.BASE_URL
const router = useRouter()
const { t } = useI18n()

// 定义项目数据
const projects = ref([
  {
    id: 1,
    icon: `${baseUrl}images/redstone_dust.png`, // 暂时用图片路径，没有图片会裂开，可以换成 emoji 测试
    emoji: '⚡', // 备用 Emoji
    nameKey: 'p1_name',
    descKey: 'p1_desc',
    typeKey: 'p1_type',
    stack: ['Vue3', 'TypeScript', 'Vite'],
    progress: 100,
    link: 'https://github.com/your-repo/redstone'
  },
  {
    id: 2,
    icon: `${baseUrl}images/painting.png`,
    emoji: '🎨',
    nameKey: 'p2_name',
    descKey: 'p2_desc',
    typeKey: 'p2_type',
    stack: ['Canvas', 'Algorithm'],
    progress: 100,
    link: '#'
  },
  {
    id: 3,
    icon: '',
    emoji: '🐹',
    nameKey: 'p3_name',
    descKey: 'p3_desc',
    typeKey: 'p3_type',
    stack: ['Unity', 'C#'],
    progress: 45,
    link: '#'
  }
])

const goBack = () => {
  new Audio('/sounds/click.mp3').play().catch(()=>{})
  router.push('/mc')
}

const openProject = (url) => {
  if(url === '#') return
  new Audio('/sounds/click.mp3').play().catch(()=>{})
  window.open(url, '_blank')
}
</script>

<template>
  <div class="mc-projects-page">
    <div class="bg-overlay"></div>

    <header class="full-width-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          &lt; {{ t('mc.back') }}
        </button>
      </div>
      
      <div class="header-center">
        <h1 class="page-title">{{ t('mc.projects.title') }}</h1>
        <span class="subtitle">{{ t('mc.projects.subtitle') }}</span>
      </div>

      <div class="header-right"></div>
    </header>

    <div class="content-scroll-area">
      <div class="projects-grid">
        <div 
          v-for="p in projects" 
          :key="p.id" 
          class="crafting-slot"
        >
          <div class="slot-icon">
          <img v-if="p.icon" :src="p.icon" class="item-img" alt="icon" />
  <span v-else class="pixel-icon">{{ p.emoji }}</span>
          </div>

          <div class="slot-info">
            <h2 class="project-name">{{ t(`mc.projects.${p.nameKey}`) }}</h2>
            <div class="project-meta">
              <span class="badge type">{{ t(`mc.projects.${p.typeKey}`) }}</span>
              <div class="stack-list">
                <span v-for="s in p.stack" :key="s" class="badge stack">{{ s }}</span>
              </div>
            </div>
            
            <p class="project-desc">{{ t(`mc.projects.${p.descKey}`) }}</p>

            <div class="slot-footer">
              <div class="durability-bar">
                <span class="label">{{ t('mc.projects.label_progress') }}</span>
                <div class="progress-track">
                  <div 
                    class="progress-fill" 
                    :style="{ width: p.progress + '%', backgroundColor: p.progress === 100 ? '#55ff55' : '#ffaa00' }"
                  ></div>
                </div>
              </div>
              
              <button class="mc-btn-small" @click="openProject(p.link)">
                {{ t('mc.projects.btn_portal') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* --- 1. 页面容器：全屏固定，无滚动条 --- */
.mc-projects-page {
  position: fixed; /* 强制固定，不跟随 body 滚动 */
  top: 0; left: 0;
  width: 100vw; 
  height: 100vh;
  overflow: hidden; /* 隐藏整个页面的滚动条 */
  
  background-image: url('/images/aboutBG.png'); /* 建议用这一张，比较像工作台背景 */
  background-size: cover;
  background-position: center;
  font-family: 'VT323', monospace;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.bg-overlay {
  position: absolute; inset: 0;
  background: rgba(0, 0, 0, 0.65); /*稍微深一点，突出内容*/
  z-index: 0;
}

/* --- 2. 顶部导航：全屏宽度 (Full Width) --- */
.full-width-header {
  position: relative; z-index: 10;
  width: 100%;
  height: 80px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px; /* 左右留白 */
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid #fff;
  box-shadow: 0 4px 0 rgba(0,0,0,0.5);
}

.header-left, .header-right { flex: 1; } /* 左右等宽，保证中间居中 */
.header-right { text-align: right; } /* 如果右边要放东西 */

.header-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title { 
  font-size: 2.5rem; margin: 0; line-height: 1;
  text-shadow: 3px 3px 0 #000; color: #ffff55; 
}
.subtitle { color: #ccc; font-size: 1.2rem; margin-top: 5px; text-shadow: 1px 1px 0 #000; }

.back-btn {
  background: #999;
  border: 2px solid #000;
  border-top-color: #fff; border-left-color: #fff;
  border-right-color: #555; border-bottom-color: #555;
  color: #fff;
  padding: 8px 20px;
  cursor: pointer;
  font-family: inherit; font-size: 1.5rem;
  text-shadow: 2px 2px 0 #000;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.5);
}
.back-btn:active {
  border-top-color: #555; border-left-color: #555;
  border-right-color: #fff; border-bottom-color: #fff;
  transform: translateY(3px);
  box-shadow: none;
}

/* --- 3. 内容滚动区：内部滚动，隐藏滚动条 --- */
.content-scroll-area {
  position: relative; z-index: 10;
  flex: 1; /* 占满剩余高度 */
  width: 100%;
  overflow-y: auto; /* 允许内部垂直滚动 */
  padding: 40px 20px;
  
  /* 隐藏滚动条 (Chrome/Safari) */
  &::-webkit-scrollbar { display: none; }
  /* 隐藏滚动条 (Firefox) */
  scrollbar-width: none;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 900px; /* 内容最大宽度，避免太宽 */
  margin: 0 auto;   /* 居中显示 */
  padding-bottom: 60px; /* 底部留白，防止被切断 */
}

/* --- 4. 物品槽卡片样式 --- */
.crafting-slot {
  display: flex;
  background: #c6c6c6;
  border: 4px solid #000;
  border-top-color: #fff; border-left-color: #fff; border-right-color: #555; border-bottom-color: #555;
  padding: 12px;
  box-shadow: 6px 6px 0 rgba(0,0,0,0.5);
  color: #333;
  transition: transform 0.1s;
}
.crafting-slot:hover { transform: scale(1.01); }

.slot-icon {
  width: 120px; height: 120px;
  background: #8b8b8b;
  border: 3px solid #373737;
  border-bottom-color: #fff; border-right-color: #fff;
  display: flex; align-items: center; justify-content: center;
  margin-right: 25px;
  flex-shrink: 0;
  box-shadow: inset 4px 4px 0 rgba(0,0,0,0.2);
}
/* 🔥 请补上这个 class！ */
.item-img {
  width: 80%;  /* 限制宽度为格子的 80% */
  height: 80%; /* 限制高度 */
  object-fit: contain; /* 保持图片比例 */
  image-rendering: pixelated; /* 像素风格渲染，防止模糊 */
  filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.3)); /* 加一点阴影，更有物品感 */
}
.pixel-icon { font-size: 4rem; filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.3)); }

.slot-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }

.project-name { 
  margin: 0 0 8px 0; font-size: 2rem; color: #222; 
  text-shadow: 2px 2px 0 rgba(255,255,255,0.4); 
}

.project-meta { display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
.badge { font-size: 1rem; padding: 4px 8px; border: 2px solid #555; color: #000; box-shadow: 2px 2px 0 rgba(0,0,0,0.2); }
.badge.type { background: #b0b0b0; font-weight: bold; }
.badge.stack { background: #ddd; }

.project-desc { 
  margin: 0 0 15px 0; font-size: 1.2rem; color: #444; 
  line-height: 1.4; font-weight: bold;
}

.slot-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }

.durability-bar { display: flex; align-items: center; gap: 12px; flex: 1; margin-right: 20px; }
.durability-bar .label { font-size: 1.2rem; color: #555; }
.progress-track {
  flex: 1; max-width: 200px; height: 16px; 
  background: #000; border: 2px solid #555; position: relative;
}
.progress-fill { 
  height: 100%; transition: width 0.5s; 
  box-shadow: inset 0 4px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2); 
}

.mc-btn-small {
  background: #777;
  color: #fff;
  border: 2px solid #000;
  border-top-color: #fff; border-left-color: #fff; border-right-color: #555; border-bottom-color: #555;
  padding: 6px 16px;
  cursor: pointer;
  font-family: inherit; font-size: 1.3rem;
  text-shadow: 2px 2px 0 #000;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.5);
}
.mc-btn-small:hover { background: #888; color: #ffff55; }
.mc-btn-small:active { 
  border-top-color: #555; border-left-color: #555; border-right-color: #fff; border-bottom-color: #fff;
  transform: translateY(2px); 
}

/* 移动端适配 */
@media (max-width: 768px) {
  .full-width-header { padding: 0 15px; height: 70px; }
  .page-title { font-size: 1.8rem; }
  .subtitle { display: none; } /* 手机上隐藏副标题 */
  .crafting-slot { flex-direction: column; text-align: center; }
  .slot-icon { margin: 0 auto 15px auto; }
  .project-meta { justify-content: center; }
  .slot-footer { flex-direction: column; gap: 15px; }
  .durability-bar { width: 100%; justify-content: center; margin-right: 0; }
  .progress-track { max-width: 100%; }
  .mc-btn-small { width: 100%; }
}
</style>