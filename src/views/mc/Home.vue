<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { locale, t } = useI18n()
const BASE_URL = import.meta.env.BASE_URL || '/'

// 切换语言
const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  new Audio(BASE_URL + 'sounds/click.ogg').play().catch(() => {})
}

// 按钮跳转逻辑
const handleNav = (path) => {
  const audio = new Audio(BASE_URL + 'sounds/click.ogg')
  audio.volume = 0.5
  audio.play().catch(() => {})

  setTimeout(() => {
    // 如果 path 还没准备好，可以先不做跳转
    if (path) router.push(path)
  }, 200)
}

// 退出游戏逻辑
const quitGame = () => {
  const audio = new Audio(BASE_URL + 'sounds/click.ogg')
  audio.volume = 0.5
  audio.play().catch(() => {})

  setTimeout(() => {
    sessionStorage.removeItem('mc_one_time_sound')
    router.push('/')
  }, 200)
}

onMounted(() => {
  const hasTicket = sessionStorage.getItem('mc_one_time_sound')
  if (hasTicket) {
    const bgm = new Audio(BASE_URL + 'sounds/achievement.ogg')
    bgm.volume = 0.6
    bgm.play().catch(() => {})
    sessionStorage.removeItem('mc_one_time_sound')
  }
})
</script>

<template>
  <div class="mc-container">
    
    <button class="lang-btn" @click="toggleLang">
      <span class="icon">🌐</span>
      {{ locale === 'zh' ? 'Language: CN' : 'Language: EN' }}
    </button>

    <header class="game-title">
      <h1 class="pixel-text">BISCUIT<span class="logo">🍪</span>BLOG</h1>
      <p class="subtitle">A MINECRAFT STYLE JOURNEY</p>
    </header>

    <nav class="menu-list">
      <div class="mc-btn" @click="handleNav('/mc/articles')">
        {{ t('mc.menu_start') }}
      </div>
      
      <div class="mc-btn" @click="handleNav('')">
        {{ t('mc.menu_board') }}
      </div>

      <div class="mc-btn" @click="handleNav('/mc/projects')">
        {{ t('mc.menu_projects') }}
      </div>
      
      <div class="mc-btn" @click="handleNav('/mc/about')">
        {{ t('mc.menu_about') }}
      </div>

      <div class="mc-btn quit-btn" @click="quitGame">
        {{ t('mc.menu_quit') }}
      </div>
    </nav>

    <footer class="version-text">
      Minecraft 1.20.1 (Modded by biscuit)
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.mc-container {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100vh; width: 100vw;
  font-family: 'VT323', monospace;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/homeBG.png'); 
  background-size: cover; background-position: center;
  color: #fff; user-select: none;
}

.lang-btn {
  position: absolute; top: 20px; right: 20px;
  background-color: #c6c6c6;
  border: 2px solid #000;
  border-top-color: #fff; border-left-color: #fff;
  border-right-color: #555; border-bottom-color: #555;
  padding: 8px 12px;
  font-family: 'VT323', monospace; font-size: 1.2rem; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
}
.lang-btn:active {
  border-top-color: #555; border-left-color: #555;
  border-right-color: #fff; border-bottom-color: #fff;
  transform: translateY(2px);
}

.game-title { text-align: center; margin-bottom: 40px; }
h1.pixel-text {
  font-size: 80px; margin: 0; color: #fff;
  text-shadow: 4px 4px 0 #3f3f3f, 6px 6px 0 #000;
  letter-spacing: 4px; display: flex; align-items: center; justify-content: center;
}
.logo { margin: 0 15px; filter: drop-shadow(4px 4px 0 #3f3f3f); }
.subtitle {
  color: #FFFF55; font-size: 24px; margin-top: 5px;
  text-shadow: 2px 2px 0 #3f3f3f; animation: pulse 2s infinite ease-in-out;
}

.menu-list { display: flex; flex-direction: column; gap: 15px; width: 400px; }

.mc-btn {
  background-color: #c6c6c6; color: #1a1a1a; font-size: 22px; text-align: center; padding: 12px 0;
  cursor: pointer; text-decoration: none;
  outline: 2px solid #000; border: 4px solid;
  border-top-color: #fff; border-left-color: #fff; border-right-color: #555; border-bottom-color: #555;
  text-shadow: 2px 2px 0 rgba(255,255,255,0.4);
  transition: all 0.1s;
}
.mc-btn:hover { background-color: #d9d9d9; }
.mc-btn:active {
  background-color: #aaaaaa; border-top-color: #555; border-left-color: #555; border-right-color: #fff; border-bottom-color: #fff;
  padding: 14px 0 10px 0;
}

.quit-btn {
  margin-top: 20px;
}

.version-text { position: absolute; bottom: 20px; left: 20px; font-size: 18px; color: #fff; text-shadow: 2px 2px 0 #000; opacity: 0.8; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
</style>