<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)

// --- 状态控制 ---
// 控制人物预览背景的 Class
const previewBg = ref('bg-default')

// --- 模拟 API 数据 ---
const fetchProfileData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: 'biscuit',
        skinUrl: 'https://minotar.net/armor/body/biscuit/100.png',
        
        // 基础信息
        location: '江苏 苏州',
        wechat: 'YaNtAngoo',
        
        // 装备栏 (代表你的核心 Role)
        armor: [
          { id: 'helmet', name: 'Diamond Helmet', desc: 'Role: Tech Lead', bg: 'bg-diamond', icon: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/03/Diamond_Helmet_JE2_BE2.png' },
          { id: 'chest', name: 'Elytra', desc: 'Skill: Architecture', bg: 'bg-sky', icon: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c5/Elytra_JE2_BE2.png' },
          { id: 'leggings', name: 'Netherite Leggings', desc: 'Stability: 99.9%', bg: 'bg-nether', icon: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/12/Netherite_Leggings_JE2_BE2.png' },
          { id: 'boots', name: 'Golden Boots', desc: 'Speed: Agile Dev', bg: 'bg-gold', icon: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/36/Golden_Boots_JE2_BE2.png' }
        ],

        // 技能背包
        inventory: [
          { name: 'Vue.js', type: 'Core', desc: '熟练度: 100% | 核心武器', icon: 'https://cdn.svgporn.com/logos/vue.svg', count: 1 },
          { name: 'React', type: 'Core', desc: '熟练度: 80% | 双持技能', icon: 'https://cdn.svgporn.com/logos/react.svg', count: 1 },
          { name: 'TypeScript', type: 'Lang', desc: '类型安全附魔', icon: 'https://cdn.svgporn.com/logos/typescript-icon.svg', count: 64 },
          { name: 'Vite', type: 'Tool', desc: '极速构建药水', icon: 'https://cdn.svgporn.com/logos/vitejs.svg', count: 16 },
          { name: 'Node.js', type: 'Backend', desc: '服务端红石电路', icon: 'https://cdn.svgporn.com/logos/nodejs-icon.svg', count: 1 },
          { name: 'Docker', type: 'DevOps', desc: '容器化潜影盒', icon: 'https://cdn.svgporn.com/logos/docker-icon.svg', count: 5 },
          { name: 'Figma', type: 'Design', desc: '像素画板', icon: 'https://cdn.svgporn.com/logos/figma.svg', count: 1 },
          { name: 'Git', type: 'Version', desc: '时光回溯指南针', icon: 'https://cdn.svgporn.com/logos/git-icon.svg', count: 1 },
          // 填充空位
          null, null, null, null, null, null,
          { name: 'Coffee', type: 'Food', desc: '回复 20 点精力值', icon: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/f0/Coffee_BE1.png', count: 99 },
          null, null, null
        ]
      })
    }, 600)
  })
}

const profile = ref({ armor: [], inventory: [], skinUrl: '', wechat: '', location: '' })

onMounted(async () => {
  const data = await fetchProfileData()
  profile.value = data
  isLoading.value = false
})

// --- 交互逻辑 ---
// 点击装备切换背景
const handleArmorClick = (item) => {
  if (item.bg) {
    previewBg.value = item.bg
  }
}

// Tooltip
const tooltip = ref({ show: false, name: '', desc: '', x: 0, y: 0 })
const showTooltip = (item, e) => {
  if (!item) return
  tooltip.value = { show: true, name: item.name, desc: item.desc, type: item.type, x: e.clientX + 20, y: e.clientY - 10 }
}
const hideTooltip = () => { tooltip.value.show = false }

const goBack = () => router.push('/mc')
</script>

<template>
  <div class="mc-inventory-overlay">
    <div class="backdrop" @click="goBack"></div>

    <Transition name="gui-pop">
      <div class="inventory-window" v-if="!isLoading">
        
        <div class="gui-header">
          <div class="hearts">
            <span v-for="n in 10" :key="n">❤️</span>
          </div>
          <h3 class="window-title">Inventory</h3>
          <div class="food">
            <span v-for="n in 10" :key="n">🍗</span>
          </div>
        </div>
        
        <div class="window-body">
          
          <div class="character-column">
            <div class="armor-slots">
              <div 
                v-for="(item, idx) in profile.armor" 
                :key="idx" 
                class="armor-slot"
                @click="handleArmorClick(item)"
                @mousemove="showTooltip(item, $event)"
                @mouseleave="hideTooltip"
              >
                <img v-if="item.icon" :src="item.icon" class="armor-icon" />
              </div>
            </div>

            <div class="player-render-box" :class="previewBg">
              <img :src="profile.skinUrl" class="skin-render" />
              
              <div class="player-info-card">
                <div class="info-row">
                  <span class="icon">📍</span> {{ profile.location }}
                </div>
                <div class="info-row">
                  <span class="icon">💬</span> {{ profile.wechat }}
                </div>
              </div>
            </div>
            
            <div class="shield-slot mc-slot">
               <span style="font-size:20px">🛡️</span>
            </div>
          </div>

          <div class="storage-column">
            
            <div class="xp-bar-container">
              <div class="xp-bar"></div>
              <span class="xp-level">25</span>
            </div>

            <div class="section-label">Backpack (Tech Stack)</div>
            
            <div class="grid-container">
              <div 
                v-for="(item, index) in profile.inventory" 
                :key="index" 
                class="mc-slot item-slot"
                :class="{ 'has-item': item }"
                @mousemove="showTooltip(item, $event)"
                @mouseleave="hideTooltip"
              >
                <template v-if="item">
                  <img v-if="item.icon.startsWith('http')" :src="item.icon" class="item-img" />
                  <span v-else class="item-text">{{ item.icon }}</span>
                  <span v-if="item.count > 1" class="item-count">{{ item.count }}</span>
                </template>
              </div>
            </div>

            <div class="hotbar-container">
              <div class="mc-slot" v-for="n in 9" :key="n"></div>
            </div>

          </div>
        </div>
        
        <div class="hotbar-hint">Press [ESC] to Close</div>
      </div>
    </Transition>

    <div v-if="isLoading" class="loading-text">Loading Chunks...</div>

    <div v-if="tooltip.show" class="mc-tooltip" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
      <div class="tt-name">{{ tooltip.name }}</div>
      <div class="tt-desc">{{ tooltip.desc }}</div>
      <div class="tt-lore">Enchanted by biscuit</div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.mc-inventory-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  display: flex; align-items: center; justify-content: center;
  z-index: 100; font-family: 'VT323', monospace;
  perspective: 1000px;
}

.backdrop {
  position: absolute; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

/* --- GUI 主窗口 --- */
.inventory-window {
  position: relative;
  width: 780px;
  background-color: #c6c6c6;
  border: 4px solid #000;
  border-top-color: #fff; border-left-color: #fff;
  border-right-color: #555; border-bottom-color: #555;
  padding: 15px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  image-rendering: pixelated;
  display: flex; flex-direction: column; gap: 10px;
}

.gui-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 10px; margin-bottom: 5px;
}
.hearts, .food { display: flex; gap: 2px; font-size: 20px; filter: drop-shadow(2px 2px 0 #000); }
.window-title { margin: 0; color: #404040; font-size: 1.8rem; font-weight: normal; }

.window-body { display: flex; gap: 20px; }

/* --- 左侧：角色列 --- */
.character-column {
  width: 200px;
  display: flex; flex-direction: column; gap: 10px;
  position: relative;
}

/* 交互升级版装备栏 */
.armor-slots {
  display: flex; flex-direction: column; gap: 8px;
  position: absolute; top: 0; left: -54px;
  z-index: 10;
}

.armor-slot {
  width: 44px; height: 44px;
  background-color: #8b8b8b;
  border: 2px solid #000;
  border-top-color: #fff; border-left-color: #fff;
  border-right-color: #555; border-bottom-color: #555;
  display: flex; align-items: center; justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: -4px 4px 5px rgba(0,0,0,0.3);
}

.armor-slot:hover {
  background-color: #c6c6c6;
  transform: translateX(-6px) scale(1.1);
  border-color: #fff;
  box-shadow: -6px 6px 10px rgba(0,0,0,0.5);
  z-index: 20;
}

.armor-slot:active {
  transform: translateX(-6px) scale(0.95);
  background-color: #707070;
  border-top-color: #555; border-left-color: #555;
  border-bottom-color: #fff; border-right-color: #fff;
}

.armor-icon {
  width: 32px; height: 32px;
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.5));
  transition: transform 0.3s ease;
}

.armor-slot:hover .armor-icon {
  transform: scale(1.2) rotate(-10deg);
}

.shield-slot {
  position: absolute; bottom: 0; right: -30px;
}

/* 玩家预览框 (支持动态背景切换) */
.player-render-box {
  border: 2px solid #fff;
  border-top-color: #373737; border-left-color: #373737;
  height: 280px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative;
  transition: background 0.5s ease; /* 背景切换动画 */
}

/* 不同的背景状态 */
.bg-default { background: #000; }
.bg-diamond { background: radial-gradient(circle, #0e2a38 0%, #000 100%); } /* 蓝色氛围 */
.bg-sky { background: linear-gradient(to bottom, #87CEEB 0%, #fff 100%); } /* 天空 */
.bg-nether { background: radial-gradient(circle, #4a0000 0%, #1a0000 100%); } /* 下界红 */
.bg-gold { background: radial-gradient(circle, #554400 0%, #000 100%); } /* 金色氛围 */

.skin-render { height: 160px; margin-bottom: 20px; filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.5)); }

.player-info-card {
  background: rgba(0,0,0,0.6);
  width: 90%; padding: 6px;
  color: #fff; font-size: 1.1rem;
  border-radius: 2px;
}
.info-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }

/* --- 右侧列 --- */
.storage-column { flex: 1; display: flex; flex-direction: column; }

.xp-bar-container {
  width: 100%; height: 24px;
  display: flex; align-items: center; justify-content: center;
  position: relative; margin-bottom: 10px;
}
.xp-bar {
  width: 100%; height: 12px;
  background: #373737;
  border: 2px solid #fff; border-right-color: #373737; border-bottom-color: #373737;
  position: absolute;
  background-image: linear-gradient(to right, #00ff00 65%, transparent 65%);
}
.xp-level { position: relative; z-index: 2; color: #80ff20; font-size: 1.5rem; text-shadow: 2px 2px 0 #000; }

.section-label { color: #404040; margin-bottom: 5px; font-size: 1.2rem; }

.grid-container {
  display: grid; grid-template-columns: repeat(9, 1fr); gap: 4px;
  background: #8b8b8b; padding: 4px;
  border: 2px solid #fff; border-top-color: #373737; border-left-color: #373737;
  margin-bottom: 10px;
}

.hotbar-container {
  display: grid; grid-template-columns: repeat(9, 1fr); gap: 4px;
  margin-top: auto;
}

/* 通用 Slot */
.mc-slot {
  width: 44px; height: 44px;
  background-color: #8b8b8b;
  box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.mc-slot.has-item:hover { background-color: #a0a0a0; cursor: pointer; }

.item-img { width: 32px; height: 32px; image-rendering: pixelated; filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.5)); }
.item-count { position: absolute; bottom: 0; right: 2px; color: #fff; font-size: 1rem; text-shadow: 2px 2px 0 #000; }

/* Tooltip */
.mc-tooltip {
  position: fixed; background: rgba(16, 0, 16, 0.95);
  border: 3px solid #3802c7; border-radius: 4px; padding: 8px 12px;
  color: #fff; z-index: 200; pointer-events: none;
  min-width: 150px; box-shadow: 4px 4px 10px rgba(0,0,0,0.6);
}
.tt-name { color: #55ffff; font-size: 1.2rem; font-weight: bold; margin-bottom: 4px; text-shadow: 2px 2px 0 #3f3f3f; }
.tt-desc { color: #aaaaaa; font-size: 1rem; margin-bottom: 6px; }
.tt-lore { color: #5555ff; font-style: italic; font-size: 0.9rem; }

.hotbar-hint { text-align: center; color: #555; margin-top: 5px; }
.loading-text { font-size: 2rem; color: #fff; text-shadow: 2px 2px 0 #000; }

/* 动效 */
.gui-pop-enter-active { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.gui-pop-leave-active { transition: all 0.2s ease-in; }
.gui-pop-enter-from, .gui-pop-leave-to { opacity: 0; transform: scale(0.8) translateY(20px); }
</style>