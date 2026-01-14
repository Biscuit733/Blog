<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { locale } = useI18n()

// 切换语言逻辑
const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
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
      <div class="mc-btn" @click="$router.push('/mc/articles')">单人游戏 (文章)</div>
      <div class="mc-btn">多人联机 (留言板)</div>
      <div class="mc-btn" @click="$router.push('/mc/about')">材质包 (关于我)</div>
    </nav>

    <footer class="version-text">
      Minecraft 1.20.1 (Modded by biscuit)
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* 全局容器 */
.mc-container {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100vh; width: 100vw;
  font-family: 'VT323', monospace;
  /* 加上背景图遮罩，让文字更清晰 */
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('../../assets/mc-bg.jpg'); 
  background-size: cover; background-position: center;
  color: #fff; user-select: none;
}

/* 语言切换按钮样式 */
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

/* 标题区域 */
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

/* 菜单按钮 */
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

.version-text { position: absolute; bottom: 20px; left: 20px; font-size: 18px; color: #fff; text-shadow: 2px 2px 0 #000; opacity: 0.8; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
</style>