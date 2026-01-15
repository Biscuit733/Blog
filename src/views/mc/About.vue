<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Prism from '@/components/vue-bits/Prism.vue'

const router = useRouter()
const { t, tm } = useI18n() 
const isLoading = ref(true)
const showDialog = ref(false)
const dialogText = ref('')

// 定义音效
const baseUrl = import.meta.env.BASE_URL || '/'
const sfxClick = new Audio(baseUrl + 'sounds/click.mp3')
const sfxPop = new Audio(baseUrl + 'sounds/pop.ogg')

const playClick = () => {
  const s = sfxClick.cloneNode()
  s.volume = 0.5
  s.play()
}

const playHover = () => {
  const s = sfxPop.cloneNode()
  s.volume = 0.3
  s.play()
}

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

const openLink = (type) => {
  playClick()
  if (type === 'github') window.open('https://github.com/yourname', '_blank')
  if (type === 'wechat') alert('WeChat ID: biscuit_dev') 
  if (type === 'bilibili') window.open('https://bilibili.com', '_blank')
}
</script>

<template>
  <div class="mc-container">

    <div class="hud-header">
      <button class="mc-btn back-btn" @click="goBack(); playClick()">&lt; {{ t('mc.back') }}</button>
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
            <div class="hologram-wrapper floating">
              <div class="prism-rotator">
                <Prism class="character-prism-case" />
              </div>
              <img :src="profile.skinUrl" class="skin-model" />
            </div>

            <div class="soft-spotlight"></div>
            <div class="pedestal"></div>
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
          <div class="advancement-scroll-area">
            <div class="tree-line"></div>
            <div 
              v-for="(adv, idx) in profile.advancements" 
              :key="idx" 
              class="adv-node-wrapper"
              :class="{ 'first-item': idx === 0, 'last-item': idx === profile.advancements.length - 1 }"
              @mouseenter="playHover"
            >
              <div class="adv-icon-box" :class="adv.type">
                <div class="adv-icon">{{ adv.icon }}</div>
              </div>
              <div class="adv-popup">
                <div class="adv-title" :class="adv.type">{{ t(adv.titleKey) }}</div>
                <div class="adv-desc">{{ t(adv.descKey) }}</div>
                <div class="adv-date">{{ adv.date }}</div>
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
              @mouseenter="playHover"
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

        <div class="section-box obsidian-bg">
          <div class="section-header">🛸 {{ t('mc.about.social_title') }}</div>
          <div class="portal-grid">
            <button class="portal-card" @click="openLink('github')">
              <span class="p-icon">🐱</span>
              <span class="p-text">{{ t('mc.about.social_github') }}</span>
            </button>
            <button class="portal-card" @click="openLink('wechat')">
              <span class="p-icon">💬</span>
              <span class="p-text">{{ t('mc.about.social_wechat') }}</span>
            </button>
            <button class="portal-card" @click="openLink('bilibili')">
              <span class="p-icon">📺</span>
              <span class="p-text">{{ t('mc.about.social_bilibili') }}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
    
    <div v-if="isLoading" class="loading">{{ t('mc.loading') }}</div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* === 全局容器 === */
.mc-container {
  width: 100vw; height: 100vh; overflow: hidden;
  background-color: #1a1a1a;
  background-image: url('/images/aboutBG.png');
  background-size: cover; background-position: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.65);
  font-family: 'VT323', monospace; color: #fff;
}

.hud-header { height: 60px; flex-shrink: 0; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.6); border-bottom: 2px solid #000; z-index: 50; }
.mc-btn { background: #777; border: 2px solid #fff; border-bottom-color: #333; border-right-color: #333; color: #fff; padding: 6px 15px; cursor: pointer; font-family: inherit; font-size: 1.2rem; }

.main-content { display: flex; height: calc(100vh - 60px); width: 100%; }

/* === 左侧 === */
.left-column { width: 340px; flex-shrink: 0; background: rgba(0, 0, 0, 0.4); border-right: 4px solid #1a1a1a; display: flex; flex-direction: column; align-items: center; padding-top: 80px; gap: 50px; position: relative; z-index: 20; overflow-y: auto; -ms-overflow-style: none; scrollbar-width: none; }
.left-column::-webkit-scrollbar { display: none; }

.char-wrapper { position: relative; cursor: pointer; text-align: center; margin-bottom: 20px; }
.hologram-wrapper { position: relative; height: 280px; width: 320px; margin: 0 auto; z-index: 2; display: flex; justify-content: center; align-items: flex-end; }
.prism-rotator { position: absolute; width: 280px; height: 280px; top: 50%; left: 50%; transform-origin: center center; animation: prism-spin 18s linear infinite; z-index: 1; mask-image: radial-gradient(circle, black 30%, transparent 75%); }
.character-prism-case { width: 100%; height: 100%; filter: blur(28px) brightness(1.3); mix-blend-mode: screen; opacity: 0.7; }
@keyframes prism-spin { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); } 50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.1); } 100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); } }
.skin-model { height: 240px; width: auto; position: relative; z-index: 2; image-rendering: pixelated; margin-bottom: 10px; filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.4)); }
.floating { animation: float 3s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.speech-bubble { position: absolute; top: -90px; left: 50%; transform: translateX(-50%); background: #fff; color: #000; padding: 10px; border-radius: 4px; border: 2px solid #000; width: 200px; text-align: center; z-index: 9999; box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4); }
.speech-bubble::before { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); border-width: 10px 10px 0; border-style: solid; border-color: #000 transparent transparent; }
.nametag { display: inline-block; background: rgba(0, 0, 0, 0.6); padding: 2px 8px; border: 1px solid #aaa; margin-bottom: 15px; position: relative; z-index: 10; }
.pedestal { width: 140px; height: 30px; background: #333; border: 2px solid #111; transform: perspective(300px) rotateX(40deg) translateY(-25px); margin: 0 auto; z-index: 0; position: relative; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
.soft-spotlight { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%) scaleY(0.4); width: 320px; height: 200px; background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, rgba(0, 150, 255, 0.1) 50%, transparent 70%); filter: blur(25px); z-index: 0; }

.stats-board { width: 260px; background: #c6c6c6; border: 2px solid #000; box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5); position: relative; z-index: 10; }
.board-header { background: #444; color: #fff; text-align: center; padding: 5px; font-size: 1.2rem; }
.stats-list { padding: 10px; display: flex; flex-direction: column; gap: 5px; color: #333; }
.stat-row { display: flex; justify-content: space-between; border-bottom: 1px dashed #888; }
.stat-value { font-weight: bold; color: #008800; }

/* === 右侧 === */
.right-column { flex: 1; padding: 30px 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 40px; }
.right-column::-webkit-scrollbar { width: 12px; background: #111; }
.right-column::-webkit-scrollbar-thumb { background: #666; border: 2px solid #111; }

.section-box { background-color: rgba(30, 30, 30, 0.8); border: 4px solid #111; padding: 25px; position: relative; border-radius: 4px; box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5); }
.stone-bg { background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0, rgba(255, 255, 255, 0.02) 10px, transparent 10px, transparent 20px); }
.section-header { font-size: 1.8rem; color: #eee; margin-bottom: 10px; text-shadow: 2px 2px 0 #000; display: inline-block; border-bottom: 3px solid #555; }

/* 成就树 */
.advancement-scroll-area { display: flex; align-items: center; gap: 60px; padding: 100px 20px 40px 20px; margin-top: -60px; overflow-x: auto; min-height: 150px; }
.tree-line { position: absolute; top: 60%; left: 0; width: 100%; height: 4px; background: #000; z-index: 0; }
.adv-node-wrapper { position: relative; width: 64px; height: 64px; flex-shrink: 0; z-index: 1; display: flex; align-items: center; justify-content: center; }
.adv-icon-box { width: 60px; height: 60px; background: #333; border: 2px solid #777; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; cursor: help; }
.adv-icon-box.challenge { transform: rotate(45deg); border-color: #a0a; }
.adv-icon-box.challenge .adv-icon { transform: rotate(-45deg); } 
.adv-node-wrapper:hover .adv-icon-box { background: #555; transform: scale(1.1); }
.adv-icon { font-size: 30px; filter: drop-shadow(2px 2px 0 #000); }

/* 修复 Tooltip */
.adv-popup { position: absolute; bottom: 85px; left: 50%; transform: translateX(-50%); width: 220px; background: #100010; border: 2px solid #50f; padding: 8px; opacity: 0; pointer-events: none; transition: opacity 0.2s; text-align: center; z-index: 999; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8); }
.adv-node-wrapper.first-item .adv-popup { left: 0; transform: none; text-align: center; }
.adv-node-wrapper.last-item .adv-popup { left: auto; right: 0; transform: none; text-align: center; }
.adv-node-wrapper:hover .adv-popup { opacity: 1; }
/* 🔥 关键修复：悬停时极大提高层级，保证盖住兄弟节点 */
.adv-node-wrapper:hover { z-index: 100; }
.adv-title { color: #ff5; margin-bottom: 4px; font-weight: bold; }
.adv-desc { font-size: 0.9rem; color: #ccc; }
.adv-date { font-size: 0.8rem; color: #888; margin-top: 5px; }

/* 矿石 */
.ore-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 15px; }
.ore-block { width: 100%; aspect-ratio: 1; background-color: #757575; position: relative; cursor: pointer; box-shadow: inset 4px 4px 0 rgba(255, 255, 255, 0.2), inset -4px -4px 0 rgba(0, 0, 0, 0.4); }
.ore-block:hover { filter: brightness(1.1); }
.shake-anim { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
@keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
.ore-specks { width: 100%; height: 100%; position: absolute; }
.ore-specks::before, .ore-specks::after { content: ''; position: absolute; width: 20%; height: 20%; background: currentColor; box-shadow: 30px 20px 0 currentColor, 10px 50px 0 currentColor; }
.ore-diamond { color: #00ffff; } .ore-lapis { color: #0000aa; } .ore-gold { color: gold; } .ore-emerald { color: #00aa00; } .ore-iron { color: #d8af93; } .ore-redstone { color: #aa0000; } .ore-coal { color: #111; }
.ore-block.broken { background: rgba(0, 0, 0, 0.3); box-shadow: none; border: 2px dashed #444; display: flex; align-items: center; justify-content: center; cursor: default; }
.revealed-content { animation: pop-in 0.3s; text-align: center; }
.revealed-content img { width: 40px; margin-bottom: 5px; }
.revealed-content span { display: block; font-size: 0.8rem; color: #ddd; }

/* 社交传送门 */
.portal-grid { display: flex; gap: 20px; justify-content: flex-start; flex-wrap: wrap; }
.portal-card {
  background: #222; border: 2px solid #a0a; border-bottom-color: #505; border-right-color: #505;
  color: #d4aaff; padding: 15px 25px; cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  font-family: inherit; font-size: 1.4rem;
  transition: transform 0.1s;
  box-shadow: 0 0 10px rgba(160, 0, 160, 0.2);
}
.portal-card:hover { background: #303; color: #fff; transform: translateY(-2px); box-shadow: 0 0 15px rgba(160, 0, 160, 0.6); }
.portal-card:active { transform: translateY(2px); border-color: #505; }
.p-icon { font-size: 1.6rem; }

@keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; }
</style>