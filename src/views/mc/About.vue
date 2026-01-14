<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const isLoading = ref(true)

// --- 音效预留 ---
const playSound = (type) => {
  // console.log(`Play sound: ${type}`)
  // const audio = new Audio(`/sounds/${type}.mp3`)
  // audio.play()
}

// --- 数据层 ---
const profile = ref({ armor: [], inventory: [], skinUrl: '', wechat: '' })

// 模拟 API
const fetchProfileData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: 'biscuit',
        skinUrl: 'https://minotar.net/armor/body/conedox/100.png', 
        wechat: 'YaNtAngoo',
        location: 'Suzhou, CN',
        level: 25,
        xp: 85,
        
        // 装备数据
        armor: [
          { id: 'helmet', nameKey: 'armor.helmet_name', descKey: 'armor.helmet_desc', iconText: '💎' },
          { id: 'chest', nameKey: 'armor.chest_name', descKey: 'armor.chest_desc', iconText: '🕊️' },
          { id: 'legs', nameKey: 'armor.legs_name', descKey: 'armor.legs_desc', iconText: '👖' },
          { id: 'boots', nameKey: 'armor.boots_name', descKey: 'armor.boots_desc', iconText: '👢' }
        ],

        // 技能矿石
        skills: [
          { name: 'Vue.js', descKey: 'items.vue', icon: 'https://cdn.svgporn.com/logos/vue.svg', isMined: false, oreType: 'diamond' },
          { name: 'React', descKey: 'items.react', icon: 'https://cdn.svgporn.com/logos/react.svg', isMined: false, oreType: 'lapis' },
          { name: 'TypeScript', descKey: 'items.ts', icon: 'https://cdn.svgporn.com/logos/typescript-icon.svg', isMined: false, oreType: 'gold' },
          { name: 'Node.js', descKey: 'items.node', icon: 'https://cdn.svgporn.com/logos/nodejs-icon.svg', isMined: false, oreType: 'emerald' },
          { name: 'Docker', descKey: 'items.docker', icon: 'https://cdn.svgporn.com/logos/docker-icon.svg', isMined: false, oreType: 'iron' },
          { name: 'Git', descKey: 'items.git', icon: 'https://cdn.svgporn.com/logos/git-icon.svg', isMined: false, oreType: 'redstone' },
        ],

        // 兴趣爱好 (新增)
        hobbies: [
          { id: 'fps', name: 'CS:GO / Delta Force', icon: '🔫', desc: 'Rush B! (Global Elite)', type: 'game' },
          { id: 'moba', name: 'League of Legends', icon: '⚔️', desc: 'Mid Laner', type: 'game' },
          { id: 'food', name: 'Desserts', icon: '🍰', desc: 'Sweet Tooth', type: 'life' },
          { id: 'mc', name: 'Minecraft', icon: '🧊', desc: 'Redstone Engineer', type: 'game' }
        ]
      })
    }, 500)
  })
}

onMounted(async () => {
  profile.value = await fetchProfileData()
  isLoading.value = false
})

// --- 交互 ---
const mineBlock = (index) => {
  const skill = profile.value.skills[index]
  if (skill.isMined) return
  playSound('dig')
  const el = document.getElementById(`ore-${index}`)
  el.classList.add('shake-anim')
  setTimeout(() => {
    skill.isMined = true
    playSound('pop')
  }, 200)
}

const handleArmorClick = () => playSound('click')
const goBack = () => { playSound('click'); router.push('/mc') }
</script>

<template>
  <div class="base-container">
    
    <div class="hud-header">
      <button class="mc-btn back-btn" @click="goBack">&lt; {{ t('mc.back') }}</button>
      <div class="hud-status">
        <div class="heart-row">❤️❤️❤️❤️❤️❤️❤️❤️❤️🖤</div>
        <div class="xp-row">
          <span class="xp-text">Lv.{{ profile.level }}</span>
          <div class="xp-bar"><div class="xp-fill" :style="`width: ${profile.xp}%`"></div></div>
        </div>
      </div>
    </div>

    <div class="main-layout" v-if="!isLoading">
      
      <div class="left-panel">
        <div class="bookshelf-bg"></div>

        <div class="character-stage">
          <div class="nametag">
            <span class="rank">{{ t('mc.admin') }}</span> {{ profile.username }}
          </div>
          <img :src="profile.skinUrl" class="skin-model floating" />
          <div class="pedestal"></div>
        </div>

        <div class="armor-rack">
          <div v-for="(item, idx) in profile.armor" :key="idx" class="armor-slot" @click="handleArmorClick">
            <span class="slot-icon">{{ item.iconText }}</span>
            <div class="slot-tooltip">
              <div class="tt-title">{{ t(item.nameKey) }}</div>
              <div class="tt-desc">{{ t(item.descKey) }}</div>
            </div>
          </div>
        </div>
        
        <div class="hologram-base">
          <div class="hologram-beam">
            <div class="holo-text">
              <p>📍 {{ profile.location }}</p>
              <p>💬 {{ profile.wechat }}</p>
            </div>
          </div>
          <div class="holo-emitter"></div>
        </div>
      </div>

      <div class="right-panel">
        
        <div class="panel-section">
          <h2 class="section-title">⛏️ Mining Skills</h2>
          <div class="ore-grid">
            <div 
              v-for="(skill, index) in profile.skills" 
              :key="index"
              :id="`ore-${index}`"
              class="ore-block"
              :class="[`ore-${skill.oreType}`, { 'broken': skill.isMined }]"
              @click="mineBlock(index)"
            >
              <div class="block-face front" v-if="!skill.isMined">
                <div class="ore-texture"></div>
              </div>
              <div class="revealed-card" v-else>
                <img :src="skill.icon" class="skill-icon" />
                <div class="skill-name">{{ skill.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-section">
          <h2 class="section-title">🎮 Hobbies & Loot</h2>
          <div class="item-frame-grid">
            <div v-for="(hobby, idx) in profile.hobbies" :key="idx" class="item-frame">
              <div class="frame-bg"></div>
              <div class="frame-content">
                <span class="hobby-icon">{{ hobby.icon }}</span>
              </div>
              <div class="frame-tooltip">
                <div class="tt-title">{{ hobby.name }}</div>
                <div class="tt-desc">{{ hobby.desc }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="isLoading" class="loading-screen">Loading Base...</div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* 全局容器 */
.base-container {
  width: 100vw; height: 100vh; overflow: hidden;
  background-color: #111; color: #fff; font-family: 'VT323', monospace;
  /* 背景图稍后用 AI 生成的替换 */
  background-image: radial-gradient(circle at 30% 50%, rgba(20,20,30,1) 0%, rgba(10,10,10,1) 100%);
}

.hud-header { height: 60px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.6); border-bottom: 2px solid #555; z-index: 50; }
.mc-btn.back-btn { background: #777; border: 2px solid #fff; color: #fff; padding: 5px 10px; cursor: pointer; font-family: inherit; font-size: 1.2rem; }
.hud-status { text-align: right; }
.heart-row { font-size: 1.2rem; }
.xp-row { display: flex; align-items: center; gap: 5px; }
.xp-bar { width: 100px; height: 6px; background: #333; border: 1px solid #aaa; }
.xp-fill { height: 100%; background: #0f0; }

.main-layout { display: flex; height: calc(100vh - 60px); }

/* --- 左侧：指挥中心 --- */
.left-panel {
  flex: 3; background: rgba(0,0,0,0.4);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  border-right: 4px solid #333; position: relative;
  /* 增加一点内阴影，制造空间感 */
  box-shadow: inset -10px 0 20px rgba(0,0,0,0.5);
}

/* 装饰：书架背景 */
.bookshelf-bg {
  position: absolute; top: 10%; left: 10%; width: 80%; height: 60%;
  border: 4px solid #533; background: repeating-linear-gradient(0deg, #643 0, #643 20px, #421 20px, #421 24px);
  opacity: 0.3; z-index: 0;
}

.character-stage { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
.skin-model { height: 35vh; image-rendering: pixelated; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.6)); }

/* 浮动动画 */
.floating { animation: float 4s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

.pedestal { width: 100px; height: 30px; background: #444; border: 2px solid #222; transform: perspective(300px) rotateX(40deg) translateY(-15px); }
.nametag { background: rgba(0,0,0,0.6); padding: 2px 8px; border: 1px solid #aaa; margin-bottom: 10px; }
.rank { color: #FFAA00; font-weight: bold; }

.armor-rack { display: flex; gap: 10px; margin: 20px 0; z-index: 2; }
.armor-slot { width: 44px; height: 44px; background: #888; border: 2px solid #fff; border-right-color: #555; border-bottom-color: #555; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; }
.armor-slot:active { border-color: #555; border-right-color: #fff; border-bottom-color: #fff; transform: translateY(2px); }
.slot-icon { font-size: 24px; filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.5)); }

/* 全息信息台 */
.hologram-base { position: relative; margin-top: auto; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; z-index: 2; }
.holo-emitter { width: 80px; height: 10px; background: #0ff; box-shadow: 0 0 10px #0ff; border-radius: 50%; }
.hologram-beam {
  width: 140px; padding: 10px;
  background: linear-gradient(to top, rgba(0, 255, 255, 0.2), transparent);
  border-left: 1px solid rgba(0,255,255,0.3); border-right: 1px solid rgba(0,255,255,0.3);
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  margin-bottom: 5px; text-align: center;
}
.holo-text { color: #0ff; font-size: 1rem; text-shadow: 0 0 5px #0ff; animation: hologram-flicker 3s infinite; }
@keyframes hologram-flicker { 0%, 100% { opacity: 0.8; } 50% { opacity: 0.5; } 52% { opacity: 0.2; } 54% { opacity: 0.8; } }

/* --- 右侧：功能区 --- */
.right-panel { flex: 7; padding: 30px 50px; overflow-y: auto; display: flex; flex-direction: column; gap: 40px; }
.section-title { font-size: 2.5rem; color: #ddd; margin-bottom: 20px; border-bottom: 2px dashed #555; padding-bottom: 5px; text-shadow: 2px 2px 0 #000; }

/* 矿石网格 */
.ore-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px; }
.ore-block { width: 100%; aspect-ratio: 1; background: #666; position: relative; cursor: pointer; box-shadow: inset 4px 4px 0 #888, inset -4px -4px 0 #444; transition: transform 0.1s; }
.ore-block:hover { transform: scale(1.05); }
.ore-block.broken { background: rgba(255,255,255,0.1); box-shadow: none; border: 2px dashed #555; transform: none; }
.ore-texture { width: 100%; height: 100%; position: relative; }
.ore-texture::before { content: ''; position: absolute; width: 20%; height: 20%; top: 20%; left: 30%; background: currentColor; box-shadow: 30px 30px 0 currentColor; }
.ore-diamond { color: #0ff; } .ore-gold { color: gold; } .ore-redstone { color: #f00; } .ore-lapis { color: blue; } .ore-emerald { color: #0f0; } .ore-iron { color: #dcb; }
.revealed-card { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: pop-in 0.3s; }
.skill-icon { width: 40px; height: 40px; margin-bottom: 5px; }
.skill-name { font-size: 1rem; color: #fff; }

/* 物品展示框 (Hobbies) */
.item-frame-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px; }
.item-frame {
  width: 120px; height: 120px; position: relative;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform 0.2s;
}
.item-frame:hover { transform: scale(1.1); z-index: 10; }

/* 棕色背景框 */
.frame-bg {
  position: absolute; width: 100%; height: 100%;
  background: #5c3a21; border: 4px solid #3e2714;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 5px 5px 10px rgba(0,0,0,0.5);
}
.frame-content { position: relative; z-index: 2; font-size: 50px; filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.3)); }

.frame-tooltip {
  position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%);
  background: #100010; border: 2px solid #30f; color: #fff;
  padding: 8px; width: 160px; text-align: center;
  opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 20;
}
.item-frame:hover .frame-tooltip { opacity: 1; }
.tt-title { color: #5ff; margin-bottom: 4px; font-size: 1.1rem; }
.tt-desc { color: #aaa; font-size: 0.9rem; }

/* 简单的 Tooltip */
.slot-tooltip { position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); background: #100010; border: 2px solid #30f; color: #fff; padding: 5px; width: 120px; text-align: center; opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 10; }
.armor-slot:hover .slot-tooltip { opacity: 1; }

@keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.loading-screen { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 2rem; z-index: 100; }
</style>