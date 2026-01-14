<script setup>
import { ref, onMounted } from 'vue'

// --- 黑客解密文字特效逻辑 ---
const targetText = "BISCUIT TECHNOLOGY"
const displayText = ref("")
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%"

// 动画函数
const scrambleText = () => {
  let iteration = 0
  const interval = setInterval(() => {
    displayText.value = targetText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return targetText[index] // 已经解密的部分
        }
        return chars[Math.floor(Math.random() * chars.length)] // 还在乱码的部分
      })
      .join("")

    if (iteration >= targetText.length) {
      clearInterval(interval)
    }

    iteration += 1 / 3 // 控制解密速度
  }, 30)
}

onMounted(() => {
  scrambleText() // 进页面自动播放一次
})
</script>

<template>
  <div class="tech-container">
    <div class="grid-bg"></div>
    <div class="vignette"></div>

    <div class="content">
      <div class="glitch-wrapper">
        <h1 class="hacker-title" @mouseover="scrambleText">
          {{ displayText }}
        </h1>
      </div>
      
      <p class="sub-text">SYSTEM STATUS: <span class="online">ONLINE</span></p>
      
      <div class="card-grid">
        <div class="tech-card">Vue 3.0</div>
        <div class="tech-card">Vite</div>
        <div class="tech-card">Three.js</div>
      </div>
      
      <button class="back-btn" @click="$router.push('/')">
        &lt; RETURN TO GATEWAY
      </button>
    </div>
  </div>
</template>

<style scoped>
/* --- 布局与背景 --- */
.tech-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #050505; /* 极深灰，不是纯黑 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace; /* 只有这里用等宽字体 */
}

/* 动态网格背景 CSS 绘制 */
.grid-bg {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: 
    linear-gradient(rgba(0, 255, 170, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 170, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(60deg) translateY(0);
  animation: grid-move 10s linear infinite;
  z-index: 1;
}

/* 让网格动起来 */
@keyframes grid-move {
  0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
}

/* 暗角效果 (让四周变暗) */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent 40%, #000 100%);
  z-index: 2;
  pointer-events: none;
}

/* --- 内容区域 --- */
.content {
  z-index: 10;
  text-align: center;
}

.hacker-title {
  color: #fff;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: -2px;
  margin: 0;
  cursor: default;
  text-shadow: 0 0 10px rgba(0, 255, 170, 0.5); /* 绿色霓虹光晕 */
}

.sub-text {
  color: #666;
  margin-top: 10px;
  letter-spacing: 2px;
  font-size: 0.9rem;
}

.online {
  color: #00ffaa;
  text-shadow: 0 0 5px #00ffaa;
}

/* --- 科技感卡片 --- */
.card-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
}

.tech-card {
  border: 1px solid #333;
  padding: 15px 30px;
  color: #888;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(5px);
  transition: all 0.3s;
  cursor: pointer;
}

.tech-card:hover {
  border-color: #00ffaa;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 255, 170, 0.2);
  transform: translateY(-5px);
}

.back-btn {
  margin-top: 60px;
  background: transparent;
  border: none;
  color: #444;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.3s;
}

.back-btn:hover {
  color: #fff;
}
</style>