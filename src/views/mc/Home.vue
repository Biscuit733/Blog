<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { locale } = useI18n()
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
    router.push(path)
  }, 200)
}

// 退出游戏逻辑
const quitGame = () => {
  const audio = new Audio(BASE_URL + 'sounds/click.ogg')
  audio.volume = 0.5
  audio.play().catch(() => {})

  setTimeout(() => {
    // 确保清理掉票据（虽然理论上已经没了）
    sessionStorage.removeItem('mc_one_time_sound')
    router.push('/')
  }, 200)
}

onMounted(() => {
  // === 核心逻辑：验票 ===
  
  // 1. 看看口袋里有没有 Gateway 发的票
  const hasTicket = sessionStorage.getItem('mc_one_time_sound')

  // 2. 如果有票，说明是刚从大门进来的
  if (hasTicket) {
    const bgm = new Audio(BASE_URL + 'sounds/achievement.ogg')
    bgm.volume = 0.6
    
    // 延迟一点播放，避免和点击声冲突
    bgm.play()

    // 3. 撕票！(最关键的一步)
    // 删掉这个标记后：
    // - 刷新页面 -> 没票 -> 不响
    // - 子页面返回 -> 没票 -> 不响
    // - 只有再次从 Gateway 点击进入，才会重新领到票
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
        单人游戏 (文章)
      </div>
      
      <div class="mc-btn">
        多人联机 (留言板)
      </div>
      
      <div class="mc-btn" @click="handleNav('/mc/about')">
        材质包 (关于我)
      </div>

      <div class="mc-btn quit-btn" @click="quitGame">
        退出游戏
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
  /* 如果图片已经移到了 public，建议改成 /images/homeBG.png */
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

/* 给退出按钮加点特殊样式（可选，如果不想要可以删掉） */
.quit-btn {
  margin-top: 20px; /* 和上面拉开点距离 */
}

.version-text { position: absolute; bottom: 20px; left: 20px; font-size: 18px; color: #fff; text-shadow: 2px 2px 0 #000; opacity: 0.8; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
</style>