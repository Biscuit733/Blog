<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const isClicking = ref(false)
const isHovering = ref(false)

// 这里的 baseUrl 处理保持你之前的修改 (如果有 base 配置的话)
// 如果你之前加了 import.meta.env.BASE_URL，请保留那个写法
// 这里为了通用演示，我先写最稳妥的拼接方式
const baseUrl = import.meta.env.BASE_URL || '/'
const swordImg = `${baseUrl}images/sword.png`
const pickaxeImg = `${baseUrl}images/pickaxe.png`
// 1. 定义音效路径
const audioSword = new Audio(`${baseUrl}sounds/sword_hit.mp3`)
// const audioSword = new Audio(`${baseUrl}sounds/mine_stone.ogg`)
const audioMine = new Audio(`${baseUrl}sounds/mine_stone.ogg`)

// 预加载一下，防止第一次点击没声音
audioSword.load()
audioMine.load()
const updatePosition = (e) => {
  x.value = e.clientX
  y.value = e.clientY
  
  // 检测悬停
  const target = e.target.closest('a, button, .clickable, .book-card, .read-btn, .ore-block, .mc-slot, .painting-frame, .char-wrapper, [role="button"]')
  isHovering.value = !!target
}

// 2. 修改点击事件
const onMouseDown = () => { 
  isClicking.value = true 
  
  // 核心逻辑：判断当前手里拿的是什么，播放对应的声音
  if (isHovering.value) {
    // 如果是镐子 (悬停状态)，播放挖矿声
    // cloneNode() 是为了支持快速连续点击（不用等上一个播完）
    const sound = audioMine.cloneNode()
    sound.volume = 0.5 // 音量可以调小点
    sound.play()
  } else {
    // 默认是剑，播放挥砍声
    const sound = audioSword.cloneNode()
    sound.volume = 0.4
    sound.play()
  }
}
const onMouseUp = () => { isClicking.value = false }

// --- 核心修复开始：动态插入全局样式 ---
const styleId = 'mc-cursor-style' // 给样式标签起个名字方便删除

const hideSystemCursor = () => {
  // 如果已经有了就不加了
  if (document.getElementById(styleId)) return
  
  const style = document.createElement('style')
  style.id = styleId
  // 暴力规则：强制所有元素隐藏鼠标，!important 覆盖浏览器默认的小手
  style.innerHTML = `
    html, body, * {
      cursor: none !important;
    }
  `
  document.head.appendChild(style)
}

const showSystemCursor = () => {
  const style = document.getElementById(styleId)
  if (style) {
    style.remove()
  }
}
// --- 核心修复结束 ---

onMounted(() => {
  window.addEventListener('mousemove', updatePosition)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  
  hideSystemCursor() // 启动！
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updatePosition)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  
  showSystemCursor() // 恢复！
})
</script>

<template>
  <div 
    class="custom-cursor"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
  >
    <img 
      :src="isHovering ? pickaxeImg : swordImg" 
      class="cursor-icon"
      :class="{ 'swing-action': isClicking }"
    />
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0; left: 0;
  width: 32px; height: 32px;
  pointer-events: none; /* 核心：让鼠标事件穿透这个 div，点到下面的东西 */
  z-index: 999999; /* 确保在最顶层 */
  will-change: transform;
}

.cursor-icon {
  width: 100%;
  height: 100%;
  display: block;
  /* 调整图片位置，让剑柄/镐把对准鼠标中心 */
  transform-origin: bottom right; 
  transition: opacity 0.1s;
}

/* 挥动动画 */
.swing-action {
  animation: mine-swing 0.2s linear;
}

@keyframes mine-swing {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-45deg) scale(1.1); } /* 向下挥 */
  100% { transform: rotate(0deg); }
}
</style>