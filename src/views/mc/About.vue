<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, tm } = useI18n() 
const isLoading = ref(true)
const showDialog = ref(false)
const dialogText = ref('')

// --- 模拟数据 ---
const fetchProfileData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: 'biscuit',
        skinUrl: 'https://minotar.net/armor/body/conedox/100.png', 
        
        stats: [
          { labelKey: 'mc.stat_code', value: '1.2M', icon: '📜' },
          { labelKey: 'mc.stat_bug', value: '404', icon: '🕷️' },
          { labelKey: 'mc.stat_coffee', value: '2,048', icon: '☕' },
          { labelKey: 'mc.stat_project', value: '42', icon: '📦' }
        ],

        // 这里的 type 决定边框颜色: normal(灰), challenge(紫), goal(金)
        advancements: [
          { id: 1, titleKey: 'mc.adv_edu_title', descKey: 'mc.adv_edu_desc', date: '2019', icon: '🌱', type: 'normal' },
          { id: 2, titleKey: 'mc.adv_job1_title', descKey: 'mc.adv_job1_desc', date: '2020', icon: '⛏️', type: 'normal' },
          { id: 3, titleKey: 'mc.adv_job2_title', descKey: 'mc.adv_job2_desc', date: '2022', icon: '💎', type: 'challenge' }, 
          { id: 4, titleKey: 'mc.adv_goal_title', descKey: 'mc.adv_goal_desc', date: 'Now', icon: '🧪', type: 'goal' }
        ],

        skills: [
          { name: 'Vue.js', icon: 'https://cdn.svgporn.com/logos/vue.svg', isMined: false, oreType: 'diamond' },
          { name: 'React', icon: 'https://cdn.svgporn.com/logos/react.svg', isMined: false, oreType: 'lapis' },
          { name: 'TypeScript', icon: 'https://cdn.svgporn.com/logos/typescript-icon.svg', isMined: false, oreType: 'gold' },
          { name: 'Node.js', icon: 'https://cdn.svgporn.com/logos/nodejs-icon.svg', isMined: false, oreType: 'emerald' },
          { name: 'Docker', icon: 'https://cdn.svgporn.com/logos/docker-icon.svg', isMined: false, oreType: 'iron' },
          { name: 'Git', icon: 'https://cdn.svgporn.com/logos/git-icon.svg', isMined: false, oreType: 'redstone' },
          { name: 'Figma', icon: 'https://cdn.svgporn.com/logos/figma.svg', isMined: false, oreType: 'coal' },
        ],

        photos: [
          { id: 1, url: 'https://picsum.photos/300/200?random=1', title: 'Workstation' },
          { id: 2, url: 'https://picsum.photos/200/200?random=2', title: 'My Cat' },
          { id: 3, url: 'https://picsum.photos/300/200?random=3', title: 'Trip to JP' },
          { id: 4, url: 'https://picsum.photos/200/300?random=4', title: 'Coffee' }
        ]
      })
    }, 500)
  })
}

const profile = ref({ stats: [], advancements: [], skills: [], photos: [] })

onMounted(async () => {
  profile.value = await fetchProfileData()
  isLoading.value = false
})

const handleCharClick = () => {
  const quotes = tm('mc.npc_quotes') 
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  dialogText.value = randomQuote
  showDialog.value = true
  setTimeout(() => { showDialog.value = false }, 3000)
}

const mineBlock = (index) => {
  const skill = profile.value.skills[index]
  if (skill.isMined) return
  const el = document.getElementById(`ore-${index}`)
  if(el) {
    el.classList.remove('shake-anim')
    void el.offsetWidth 
    el.classList.add('shake-anim')
  }
  setTimeout(() => { skill.isMined = true }, 300)
}

const goBack = () => router.push('/mc')
</script>

<template>
  <div class="mc-container">
    
    <div class="hud-header">
      <button class="mc-btn back-btn" @click="goBack">&lt; {{ t('mc.back') }}</button>
      <div class="hud-info">
        <span class="location-text">📍 {{ t('mc.location') }}</span>
      </div>
    </div>

    <div class="main-content" v-if="!isLoading">
      
      <div class="left-column">
        <div class="char-wrapper" @click="handleCharClick">
          
          <Transition name="pop-up">
            <div class="speech-bubble" v-if="showDialog">{{ dialogText }}</div>
          </Transition>
          
          <div class="nametag"><span class="rank">{{ t('mc.admin') }}</span> {{ profile.username }}</div>
          
          <div class="char-body">
            <img :src="profile.skinUrl" class="skin-model floating" />
            <div class="holo-pedestal">
              <div class="holo-ring"></div>
              <div class="holo-glow"></div>
              <!-- ✅ 新增：人物脚下灯光元素 -->
              <div class="holo-light"></div>
            </div>
          </div>
        </div>

        <div class="stats-board">
          <div class="board-header">{{ t('mc.stats_title') }}</div>
          <div class="stats-list">
            <div v-for="(stat, idx) in profile.stats" :key="idx" class="stat-row">
              <span class="stat-icon">{{ stat.icon }}</span>
              <span class="stat-label">{{ t(stat.labelKey) }}</span>
              <span class="stat-value">{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        
        <div class="section-box stone-bg">
          <div class="section-header">🏆 {{ t('mc.adv_title') }}</div>
          
          <div class="advancement-track">
            <div 
              v-for="(adv, idx) in profile.advancements" 
              :key="idx" 
              class="adv-step"
            >
              <div class="connector" v-if="idx > 0"></div>

              <div class="mc-slot adv-slot" :class="adv.type">
                <div class="slot-icon">{{ adv.icon }}</div>
                
                <div class="adv-tooltip">
                  <div class="tt-header" :class="adv.type">{{ t(adv.titleKey) }}</div>
                  <div class="tt-body">{{ t(adv.descKey) }}</div>
                  <div class="tt-footer">{{ adv.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-box cobble-bg">
          <div class="section-header">⛏️ {{ t('mc.mining_title') }}</div>
          <div class="ore-grid">
            <div 
              v-for="(skill, index) in profile.skills" 
              :key="index"
              :id="`ore-${index}`"
              class="ore-block"
              :class="[`ore-${skill.oreType}`, { 'broken': skill.isMined }]"
              @click="mineBlock(index)"
            >
              <div class="block-face" v-if="!skill.isMined">
                <div class="ore-specks"></div>
              </div>
              <div class="revealed-content" v-else>
                <img :src="skill.icon" />
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section-box wood-bg">
          <div class="section-header">🖼️ {{ t('mc.gallery_title') }}</div>
          <div class="photo-grid">
            <div v-for="photo in profile.photos" :key="photo.id" class="painting-frame">
              <img :src="photo.url" class="painting-img" loading="lazy" />
              <div class="painting-label">{{ photo.title }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <div v-if="isLoading" class="loading">{{ t('mc.loading') }}</div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* === 全局 === */
.mc-container {
  width: 100vw; height: 100vh; overflow: hidden;
  background-color: #202020;
  /* Deepslate 纹理 (CSS生成) */
  background-image: 
    linear-gradient(45deg, #252525 25%, transparent 25%, transparent 75%, #252525 75%, #252525),
    linear-gradient(45deg, #252525 25%, transparent 25%, transparent 75%, #252525 75%, #252525);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
  box-shadow: inset 0 0 150px rgba(0,0,0,0.8);
  font-family: 'VT323', monospace; color: #fff;
}

.hud-header { height: 60px; flex-shrink: 0; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.6); border-bottom: 2px solid #000; z-index: 50; }
.mc-btn { background: #555; border: 2px solid #fff; border-bottom-color: #333; border-right-color: #333; color: #fff; padding: 6px 15px; cursor: pointer; font-family: inherit; font-size: 1.2rem; }

.main-content { display: flex; height: calc(100vh - 60px); width: 100%; }

/* === 左侧：角色 (居中调整) === */
.left-column {
  width: 340px; flex-shrink: 0; 
  background: rgba(0,0,0,0.4); border-right: 4px solid #1a1a1a; 
  display: flex; flex-direction: column; 
  align-items: center; 
  padding-top: 100px; /* 顶部留白，防止气泡顶到 Header */
  gap: 50px;
  position: relative; z-index: 20;
  overflow-y: auto; scrollbar-width: none;
}

.char-wrapper { position: relative; cursor: pointer; text-align: center; }
.char-body { position: relative; margin-top: 10px; }

.skin-model { height: 260px; image-rendering: pixelated; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5)); position: relative; z-index: 2; }
.floating { animation: float 3s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

/* 全新底座：全息投影风格 */
.holo-pedestal {
  position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%) perspective(300px) rotateX(60deg);
  width: 140px; height: 140px; z-index: 1;
}
.holo-ring {
  width: 100%; height: 100%; border: 4px solid rgba(0, 255, 255, 0.5); border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  animation: spin 10s linear infinite;
}
.holo-glow {
  position: absolute; top: 20%; left: 20%; width: 60%; height: 60%;
  background: radial-gradient(circle, rgba(0,255,255,0.4) 0%, transparent 70%);
  filter: blur(5px);
}
/* ✅ 新增：人物脚下呼吸脉冲灯光样式 + 动画 */
.holo-light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, rgba(0, 180, 180, 0.2) 50%, transparent 75%);
  filter: blur(15px);
  border-radius: 50%;
  animation: pulse-light 3s ease-in-out infinite;
}
@keyframes pulse-light {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.4); }
}
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* 气泡 */
.speech-bubble {
  position: absolute; top: -70px; left: 50%; transform: translateX(-50%);
  background: #fff; color: #000; padding: 10px; border-radius: 4px; border: 2px solid #000;
  width: 200px; text-align: center; z-index: 9999;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.4);
}
.speech-bubble::before { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); border-width: 10px 10px 0; border-style: solid; border-color: #000 transparent transparent; }
.pop-up-enter-active, .pop-up-leave-active { transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-up-enter-from, .pop-up-leave-to { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }

.nametag { display: inline-block; background: rgba(0,0,0,0.6); padding: 2px 8px; border: 1px solid #aaa; }

.stats-board { width: 260px; background: #c6c6c6; border: 2px solid #000; box-shadow: 4px 4px 0 rgba(0,0,0,0.5); }
.board-header { background: #444; color: #fff; text-align: center; padding: 5px; font-size: 1.2rem; }
.stats-list { padding: 10px; display: flex; flex-direction: column; gap: 5px; color: #333; }
.stat-row { display: flex; justify-content: space-between; border-bottom: 1px dashed #888; }
.stat-value { font-weight: bold; color: #008800; }

/* === 右侧：内容区 === */
.right-column { 
  flex: 1; padding: 30px 40px; 
  overflow-y: auto; 
  display: flex; flex-direction: column; gap: 40px; 
}
.right-column::-webkit-scrollbar { width: 12px; background: #111; }
.right-column::-webkit-scrollbar-thumb { background: #666; border: 2px solid #111; }

.section-box { 
  background-color: rgba(30,30,30,0.8);
  border: 4px solid #111; padding: 25px; position: relative; border-radius: 4px; 
  box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
}
.stone-bg { background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 10px, transparent 10px, transparent 20px); }
.section-header { font-size: 1.8rem; color: #eee; margin-bottom: 15px; text-shadow: 2px 2px 0 #000; display: inline-block; border-bottom: 3px solid #555; }

/* --- 核心修复：成就树 (标准 MC 风格) --- */
.advancement-track {
  display: flex; align-items: center; 
  /* 留足顶部空间给 Tooltip */
  padding: 80px 20px 20px 20px; 
  overflow-x: auto; 
}

.adv-step { display: flex; align-items: center; position: relative; }

/* 连接线 */
.connector { width: 60px; height: 6px; background: #333; border: 2px solid #000; border-left: none; border-right: none; }

/* 物品槽节点 */
.mc-slot {
  width: 64px; height: 64px; background: #8b8b8b;
  border: 4px solid #fff; border-right-color: #373737; border-bottom-color: #373737; border-left-color: #fff; border-top-color: #fff;
  display: flex; align-items: center; justify-content: center;
  position: relative; cursor: help;
  transition: transform 0.1s;
}
/* ✅ 修复弹窗遮挡：提升hover层级到9999，绝对置顶 */
.mc-slot:hover {
  background: #c6c6c6;
  z-index: 9999;
  transform: scale(1.1);
}

/* 特殊边框 */
.mc-slot.challenge { border-color: #a0a; border-right-color: #303; border-bottom-color: #303; } /* 紫色 */
.mc-slot.goal { border-radius: 50%; border-color: gold; border-right-color: #b8860b; border-bottom-color: #b8860b; } /* 金色圆 */

.slot-icon { font-size: 32px; filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.5)); }

/* Tooltip (经典 MC 风格) - ✅ 修复遮挡：层级拉满9999 */
.adv-tooltip {
  position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%);
  min-width: 180px; background: rgba(16,0,16,0.95); 
  border: 3px solid #30f; padding: 6px;
  color: #fff; z-index: 9999;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
  text-align: left;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.5);
}
.mc-slot:hover .adv-tooltip { opacity: 1; }

.tt-header { color: #ffff55; font-weight: bold; margin-bottom: 4px; text-shadow: 2px 2px 0 #000; }
.tt-header.challenge { color: #ff55ff; } /* 挑战是紫色标题 */
.tt-body { color: #aaaaaa; font-size: 0.9rem; margin-bottom: 4px; }
.tt-footer { color: #555555; font-size: 0.8rem; font-style: italic; }

/* 矿石 */
.ore-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 15px; }
.ore-block { width: 100%; aspect-ratio: 1; background-color: #757575; position: relative; cursor: pointer; box-shadow: inset 4px 4px 0 rgba(255,255,255,0.2), inset -4px -4px 0 rgba(0,0,0,0.4); }
.ore-block:hover { filter: brightness(1.1); }
.shake-anim { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
@keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
.ore-specks { width: 100%; height: 100%; position: absolute; }
.ore-specks::before, .ore-specks::after { content: ''; position: absolute; width: 20%; height: 20%; background: currentColor; box-shadow: 30px 20px 0 currentColor, 10px 50px 0 currentColor; }
.ore-diamond { color: #00ffff; } .ore-lapis { color: #0000aa; } .ore-gold { color: gold; } .ore-emerald { color: #00aa00; } .ore-iron { color: #d8af93; } .ore-redstone { color: #aa0000; } .ore-coal { color: #111; }
.ore-block.broken { background: rgba(0,0,0,0.3); box-shadow: none; border: 2px dashed #444; display: flex; align-items: center; justify-content: center; cursor: default; }
.revealed-content { animation: pop-in 0.3s; text-align: center; }
.revealed-content img { width: 40px; margin-bottom: 5px; }
.revealed-content span { display: block; font-size: 0.8rem; color: #ddd; }

/* 照片墙 */
.photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.painting-frame { background: #5c3317; padding: 8px; box-shadow: 5px 5px 10px rgba(0,0,0,0.5); transition: transform 0.2s; cursor: pointer; }
.painting-frame:hover { transform: scale(1.03) rotate(1deg); z-index: 10; }
.painting-img { width: 100%; height: 150px; object-fit: cover; border: 2px solid #3e220e; display: block; }
.painting-label { text-align: center; margin-top: 5px; color: #eebb99; font-size: 1.1rem; }

@keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; }
</style>