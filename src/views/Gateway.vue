<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isEntering = ref(false) // 控制是否正在穿越
const activeSide = ref(null)  // 记录点击了哪一边

// 穿越函数：增加 800ms 延迟来播放放大动画
const enterWorld = (type) => {
  if (isEntering.value) return // 防止重复点击
  
  isEntering.value = true
  activeSide.value = type

  setTimeout(() => {
    if (type === 'mc') {
      // 只有点击这个按钮，浏览器里才会存下这个标记
  sessionStorage.setItem('mc_one_time_sound', 'true')
      router.push('/mc')
    } else {
      router.push('/tech')
    }
  }, 800) // 0.8秒后跳转
}
</script>

<template>
  <div class="gateway-container" :class="{ 'animating': isEntering }">
    
    <div 
      class="split-pane mc-side" 
      :class="{ 'active': activeSide === 'mc', 'inactive': activeSide === 'tech' }"
      @click="enterWorld('mc')"
    >
      <div class="vortex-container pixel-vortex">
        <div class="square-layer layer-1"></div>
        <div class="square-layer layer-2"></div>
        <div class="square-layer layer-3"></div>
        <div class="square-layer layer-4"></div>
        <div class="center-core pixel-core"></div>
      </div>
      
      <div class="label-box pixel-label">
        <h2 class="mc-title">MINECRAFT</h2>
        <div class="status-bar">
          <span class="dot"></span> SERVER: BISCUIT
        </div>
        <p class="blink-text">> CLICK TO JOIN <</p>
      </div>
    </div>

    <div 
      class="split-pane tech-side" 
      :class="{ 'active': activeSide === 'tech', 'inactive': activeSide === 'mc' }"
      @click="enterWorld('tech')"
    >
      <div class="vortex-container black-hole-group">
        <div class="particles-system">
          <span v-for="n in 20" :key="n" :style="`--d:${Math.random() * 2}s; --r:${Math.random() * 360}deg`"></span>
        </div>
        
        <div class="accretion-disk"></div>
        <div class="accretion-disk inner"></div>
        
        <div class="event-horizon"></div>
      </div>

      <div class="label-box tech-label">
        <h2>CYBER SPACE</h2>
        <p class="decode-text">SYSTEM STATUS: UNSTABLE</p>
      </div>
    </div>

    <div class="divider" :class="{ 'hidden': isEntering }"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;900&display=swap'); /* 科技字体 */

.gateway-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* === 核心交互：点击后的放大/消失逻辑 === */
.split-pane {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1); /* 丝滑缓动 */
  overflow: hidden;
}

.split-pane:hover { flex: 1.5; } /* 悬停变宽 */

/* 当正在穿越时 */
.gateway-container.animating .split-pane.active {
  flex: 10; /* 激活的一边占满屏幕 */
  cursor: default;
}

.gateway-container.animating .split-pane.active .vortex-container {
  transform: scale(5) rotate(45deg); /* 核心旋涡极速放大 */
  opacity: 0; /* 最后淡出，模拟穿过 */
  transition: transform 0.8s ease-in, opacity 0.8s ease-in;
}

.gateway-container.animating .split-pane.inactive {
  flex: 0; /* 另一边被挤压消失 */
  opacity: 0;
}

.divider {
  position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: #000; z-index: 50; transform: translateX(-50%);
  box-shadow: -2px 0 10px #6a0dad, 2px 0 10px #00ffaa;
  transition: opacity 0.3s;
}
.divider.hidden { opacity: 0; }

.vortex-container {
  position: relative;
  width: 400px; height: 400px;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.split-pane:hover .vortex-container { transform: scale(1.1); }

/* =========================================
   左侧：MC 像素风 (优化版)
   ========================================= */
.mc-side {
  background-color: #1a1a1a;
  background-image: repeating-linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), repeating-linear-gradient(45deg, #222 25%, #1a1a1a 25%, #1a1a1a 75%, #222 75%, #222);
  background-position: 0 0, 10px 10px; background-size: 20px 20px;
}

.square-layer {
  position: absolute;
  border: 15px dashed #6a0dad;
  box-shadow: 0 0 10px #6a0dad;
  image-rendering: pixelated;
  animation: spin-square 10s linear infinite;
}
.layer-1 { width: 300px; height: 300px; border-color: #4a0072; animation-duration: 12s; }
.layer-2 { width: 220px; height: 220px; border-color: #7b1fa2; animation-duration: 8s; animation-direction: reverse; }
.layer-3 { width: 140px; height: 140px; border-color: #aa00ff; animation-duration: 5s; }
.layer-4 { width: 80px; height: 80px; border-color: #e1bee7; border-style: solid; animation-duration: 3s; animation-direction: reverse; }
.pixel-core { width: 40px; height: 40px; background: #fff; z-index: 10; box-shadow: 0 0 20px #d500f9; animation: pulse-pixel 1s steps(2) infinite; }

/* MC 文字优化 */
.pixel-label { margin-top: 60px; font-family: 'VT323', monospace; text-align: center; z-index: 20; }
.mc-title { font-size: 5rem; margin: 0; color: #DDD; text-shadow: 4px 4px 0 #333; letter-spacing: 2px; }
.status-bar { color: #AAAAAA; font-size: 1.5rem; margin-bottom: 10px; }
.dot { display: inline-block; width: 10px; height: 10px; background: #55FF55; margin-right: 5px; box-shadow: 0 0 5px #55FF55; }
.blink-text { font-size: 1.8rem; color: #FFFF55; text-shadow: 2px 2px 0 #3f3f3f; animation: blink 1s infinite; margin: 0; }

/* =========================================
   右侧：黑洞科技 (Vue Bits 风格重构)
   ========================================= */
.tech-side {
  background-color: #000;
  /* 更加深邃的背景 */
  background-image: radial-gradient(circle at center, #0a1a1a 0%, #000 70%);
}

.black-hole-group {
  /* 让黑洞有点透视感 */
  transform: rotateX(20deg);
}

/* 1. 事件视界 (中心黑球) */
.event-horizon {
  width: 100px; height: 100px;
  background: #000;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 20px 5px rgba(0, 255, 200, 0.6), inset 0 0 20px rgba(0, 255, 200, 0.8);
  /* 模拟黑洞边缘的光线弯曲 */
  border: 1px solid rgba(0, 255, 200, 0.3);
}

/* 2. 吸积盘 (旋转的光圈) */
.accretion-disk {
  position: absolute;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: conic-gradient(transparent 0%, rgba(0, 255, 200, 0.1) 20%, rgba(0, 255, 200, 0.8) 50%, transparent 80%);
  filter: blur(10px);
  animation: spin-tech 2s linear infinite;
  mix-blend-mode: screen; /* 混合模式让光效更亮 */
}

.accretion-disk.inner {
  width: 160px; height: 160px;
  background: conic-gradient(transparent 0%, #00bc8c 40%, transparent 90%);
  animation: spin-tech 1s linear infinite reverse; /* 反向旋转 */
  filter: blur(5px);
}

/* 3. 粒子系统 (被吸入的碎片) */
.particles-system {
  position: absolute;
  width: 100%; height: 100%;
}

.particles-system span {
  position: absolute;
  top: 50%; left: 50%;
  width: 4px; height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ffaa;
  /* 粒子从四周向中心吸入 */
  transform-origin: 0 0; 
  /* 利用自定义属性计算初始位置和动画延迟 */
  animation: suck-in 1.5s ease-in infinite;
  animation-delay: var(--d);
  opacity: 0;
}

/* 科技文字优化 */
.tech-label { margin-top: 60px; color: #00ffaa; text-align: center; z-index: 20; }
.tech-label h2 { 
  font-family: 'Orbitron', sans-serif; 
  font-size: 3.5rem; letter-spacing: 5px; margin: 0; 
  text-shadow: 0 0 15px rgba(0, 255, 170, 0.8);
}
.decode-text { 
  font-family: 'Courier New', monospace; font-size: 0.9rem; letter-spacing: 2px; opacity: 0.8; 
  border-right: 2px solid #00ffaa; animation: typing 3s steps(20) infinite alternate;
  display: inline-block; overflow: hidden; white-space: nowrap;
}


/* =========================================
   动画定义
   ========================================= */
@keyframes spin-square { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes pulse-pixel { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.8); opacity: 0.5; } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

@keyframes spin-tech { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* 黑洞吸入动画 */
@keyframes suck-in {
  0% { 
    /* 从远处开始 */
    transform: rotate(var(--r)) translateX(250px) scale(0.5); 
    opacity: 0; 
  }
  20% { opacity: 1; }
  100% { 
    /* 吸入中心 */
    transform: rotate(calc(var(--r) + 180deg)) translateX(0) scale(0); 
    opacity: 0; 
  }
}

@keyframes typing { from { width: 0; } to { width: 100%; } }
/* =========================================
   📱 Mobile / Tablet 响应式适配 (新增)
   ========================================= */
@media (max-width: 768px) {
  .gateway-container {
    flex-direction: column; /* 改为上下排列 */
  }

  .split-pane {
    width: 100vw;
    height: 50vh; /* 各占一半高度 */
    border-bottom: 2px solid #000;
  }

  /* 手机上取消 hover 变大效果，太乱了 */
  .split-pane:hover { flex: 1; }

  /* 分割线改为水平 */
  .divider {
    width: 100vw; height: 4px;
    left: 0; top: 50%; transform: translateY(-50%);
    box-shadow: 0 -2px 10px #6a0dad, 0 2px 10px #00ffaa; /* 上下发光 */
  }

  /* 核心魔法：整体缩小特效容器 */
  /* 因为原来的特效是 400x400，手机放不下，我们强制缩放 0.6 倍 */
  .vortex-container {
    transform: scale(0.65) !important; 
  }

  /* 动画触发时，覆盖全屏 */
  .gateway-container.animating .split-pane.active {
    height: 100vh;
    flex: auto; /* 禁用 flex 比例，强制高度 */
  }
  
  .gateway-container.animating .split-pane.active .vortex-container {
    transform: scale(3) rotate(45deg) !important; /* 手机上不要放太大，3倍够了 */
  }

  /* 文字稍微调小一点 */
  .mc-title { font-size: 3rem; }
  .tech-label h2 { font-size: 2.5rem; }
}
</style>