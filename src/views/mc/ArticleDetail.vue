<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// 模拟数据 (支持 完整MC颜色码 + 增强版Markdown)
const article = ref({
  title: "Vue 3.0 深度解析",
  author: "biscuit",
  pages: [
    // P1 (正文第一页)
    `# 第一章：序言

Vue 3 的 §b**Composition API**§r 是一次革命性的升级。

- 更灵活的逻辑复用
- 更好的 §9TypeScript§r 支持
- 更小的打包体积

它允许我们将逻辑关注点组织在一起，而不是被 Options API 强制拆分。`,
    
    // P2
    `## 第二章：响应式原理

Vue 3 使用 §6*Proxy*§r 替代了 \`Object.defineProperty\`。这意味着我们可以直接监听数组索引的变化。

![Vue Logo](/images/pickaxe.png)

(上图是示例图片 - MC风格展示)
`,
    
    // P3
    `§c[本章结束]§r

§a感谢阅读！§r
§7获得经验值 +5 ✨§r

点击下方按钮返回目录，继续探索其他内容。
`
  ]
})

// 0=封面, 1=正文第1页(pages[0]), 2=pages[1]...
const currentPage = ref(0)
// ✅ 修复1: 严谨计算总页数 (封面+正文页数)
const totalContentPages = computed(() => article.value.pages.length)
const totalPages = computed(() => totalContentPages.value + 1) // 封面+正文

const isFlipping = ref(false)
const flipDirection = ref('') // 'next' 或 'prev'

// 预加载音频 避免每次点击重新创建 无卡顿
const audioBookOpen = new Audio('/sounds/book_open.ogg')
const audioBookFlip = new Audio('/sounds/book_flip.ogg')
const audioClick = new Audio('/sounds/click.ogg')
// 统一设置音频音量 贴合MC原版
audioBookOpen.volume = 0.6
audioBookFlip.volume = 0.5
audioClick.volume = 0.4

// ✅ 修复2: 重构翻页逻辑 边界判断100%严谨 + 防误触
const changePage = (delta) => {
  // 1. 翻页动画中禁止操作
  if (isFlipping.value) return
  // 2. 计算新页码
  const newPage = currentPage.value + delta
  // 3. 严格边界判断 (0=封面, totalPages-1=最后一页)
  const minPage = 0
  const maxPage = totalPages.value - 1
  
  // 4. 页码越界则直接返回 不执行任何操作
  if (newPage < minPage || newPage > maxPage) {
    console.log('页码越界:', newPage, '总页数:', maxPage)
    return
  }

  // 5. 执行翻页逻辑
  flipDirection.value = delta > 0 ? 'next' : 'prev'
  isFlipping.value = true

  // 封面翻到正文 播放 open 音效 | 正文翻页 播放 flip 音效
  currentPage.value === 0 ? audioBookOpen.play().catch(()=>{}) : audioBookFlip.play().catch(()=>{})

  // 动画半程更新数据 无视觉断层
  setTimeout(() => {
    currentPage.value = newPage
  }, 280)

  // 动画结束 重置状态
  setTimeout(() => {
    isFlipping.value = false
  }, 600)
}

// 【核心增强】完整MC颜色码解析 + 完整版Markdown解析 + 容错处理
const parseMarkdown = (text) => {
  if (!text || text.trim() === '') return '<div class="empty-page">§7暂无内容§r</div>'
  let html = text
    // MC原版颜色码
    .replace(/§0/g, '<span class="mc-black">')
    .replace(/§1/g, '<span class="mc-dark-blue">')
    .replace(/§2/g, '<span class="mc-dark-green">')
    .replace(/§3/g, '<span class="mc-dark-aqua">')
    .replace(/§4/g, '<span class="mc-dark-red">')
    .replace(/§5/g, '<span class="mc-dark-purple">')
    .replace(/§6/g, '<span class="mc-gold">')
    .replace(/§7/g, '<span class="mc-gray">')
    .replace(/§8/g, '<span class="mc-dark-gray">')
    .replace(/§9/g, '<span class="mc-blue">')
    .replace(/§a/g, '<span class="mc-green">')
    .replace(/§b/g, '<span class="mc-aqua">')
    .replace(/§c/g, '<span class="mc-red">')
    .replace(/§d/g, '<span class="mc-light-purple">')
    .replace(/§e/g, '<span class="mc-yellow">')
    .replace(/§f/g, '<span class="mc-white">')
    .replace(/§r/g, '</span>') // 颜色重置 必加
    // 完整版Markdown解析
    .replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<b class="md-bold">$1</b>')
    .replace(/\*(.*?)\*/gim, '<i class="md-italic">$1</i>')
    .replace(/~~(.*?)~~/gim, '<s class="md-del">$1</s>')
    .replace(/`(.*?)`/gim, '<code class="md-code">$1</code>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="md-img" loading="lazy" />')
    // 优化列表解析：自动包裹ul 修复原代码只有li无容器的bug
    .replace(/((^- .*\n?)+)/gim, '<ul class="md-ul">$1</ul>')
    .replace(/^- (.*$)/gim, '<li class="md-li">$1</li>')
    // 段落换行优化：连续换行才分段 单行换行保留
    .replace(/\n\n+/gim, '</p><p class="md-p">')
    .replace(/\n/gim, '<br />')
  // 给所有文本包裹段落标签 统一行高
  return `<p class="md-p">${html}</p>`
}

// ✅ 修复3: 关闭书籍逻辑 增加防误触
const closeBook = () => {
  // 翻页动画中禁止关闭 避免误触
  if (isFlipping.value) return
  audioClick.cloneNode().play().catch(err => console.log('音效播放失败', err))
  router.push('/mc/articles')
}

// ✅ 修复4: 触摸事件增加防误触阈值 + 禁止冒泡
const touchStartX = ref(0)
const touchStartTime = ref(0) // 记录触摸开始时间 区分点击和滑动
const handleTouchStart = (e) => {
  e.stopPropagation() // 阻止触摸事件冒泡到外层closeBook
  touchStartX.value = e.touches[0].clientX
  touchStartTime.value = Date.now()
}
const handleTouchEnd = (e) => {
  e.stopPropagation() // 阻止触摸事件冒泡到外层closeBook
  const touchEndX = e.changedTouches[0].clientX
  const touchDuration = Date.now() - touchStartTime.value
  const diff = touchStartX.value - touchEndX

  // 防误触：触摸时长<300ms 且滑动距离>50px 才判定为翻页
  if (touchDuration < 300) {
    if (diff > 50) changePage(1) // 左滑 → 下一页
    if (diff < -50) changePage(-1) // 右滑 → 上一页
  }
}

// ✅ 修复5: 键盘事件增加防误触
const handleKeydown = (e) => {
  // 输入框/文本域中禁止键盘翻页 避免冲突
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return
  // 翻页动画中禁止键盘操作
  if (isFlipping.value) return

  if (e.key === 'ArrowLeft') {
    e.preventDefault() // 阻止默认行为
    changePage(-1)
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault() // 阻止默认行为
    changePage(1)
  }
  if (e.key === 'Escape') {
    e.preventDefault() // 阻止默认行为
    closeBook()
  }
}

// 挂载/卸载事件监听 避免内存泄漏
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- ✅ 修复6: 外层点击仅触发closeBook 但内部元素全部阻止冒泡 -->
  <div class="book-scene">
    <div class="backdrop" @click="closeBook"></div>

    <!-- 核心重构：完全对齐MC原版书本布局 -->
    <div class="book-container" @click.stop> <!-- 阻止容器内点击冒泡到closeBook -->
      <!-- 书本主体 -->
      <div 
        class="book-body" 
        :class="{ 'flipping-next': isFlipping && flipDirection === 'next', 'flipping-prev': isFlipping && flipDirection === 'prev' }"
        @click.stop <!-- 阻止书本内点击冒泡 -->
      >
        <div class="book-spine"></div>
        <!-- 页面内容区 -->
        <div class="page-wrapper">
          <!-- 封面页 (1:1还原MC原版封面) -->
          <div v-if="currentPage === 0 && !isFlipping" class="page-content cover-page">
            <div class="mc-cover-inner">
              <h1 class="mc-book-title">{{ article.title }}</h1>
              <div class="mc-book-author">
                <span>作者：</span>
                <span class="author-name">{{ article.author }}</span>
              </div>
              <div class="mc-cover-footer">Original Copy • Minecraft Edition</div>
            </div>
          </div>

          <!-- 正文页 -->
          <div v-else-if="!isFlipping" class="page-content text-page">
            <div class="markdown-body" v-html="parseMarkdown(article.pages[currentPage - 1])"></div>
            <div class="page-num">{{ currentPage }} / {{ totalContentPages }}</div>
          </div>

          <!-- 翻页动画层 -->
          <div class="flip-animation-layer" v-if="isFlipping"></div>
        </div>
      </div>

      <!-- ✅ 修复7: 按钮区所有点击事件都阻止冒泡 -->
      <div class="mc-controls" @click.stop>
        <button 
          class="mc-nav-btn prev" 
          :class="{ disabled: currentPage === 0 }" 
          @click.stop="changePage(-1)" <!-- 阻止按钮点击冒泡 -->
        >
          &lt;
        </button>
        <button 
          class="mc-done-btn" 
          @click.stop="closeBook" <!-- 阻止按钮点击冒泡 -->
        >
          {{ t('mc.book.btn_done') }}
        </button>
        <button 
          class="mc-nav-btn next" 
          :class="{ disabled: currentPage === totalContentPages }" <!-- ✅ 修复: 禁用逻辑对应最后一页 -->
          @click.stop="changePage(1)" <!-- 阻止按钮点击冒泡 -->
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 引入MC原版字体风格 */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* 场景容器 (全屏+居中) */
.book-scene {
  position: fixed; 
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 9999;
  font-family: 'VT323', monospace;
  perspective: 1500px;
  background: #000; /* 纯黑背景 贴合MC界面 */
}

/* 背景遮罩 (纯黑+轻微模糊) */
.backdrop {
  position: absolute; 
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(2px);
  cursor: none; /* 适配MC自定义光标 */
}

/* 书本容器 (核心布局 书本+按钮垂直排列) */
.book-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* 书本和按钮的间距 刚好不遮挡 */
}

/* -------------------------- 核心：MC原版书本样式 -------------------------- */
.book-body {
  width: 400px; /* 精准匹配MC书本宽度 */
  height: 520px; /* 精准匹配MC书本高度 */
  background-color: #f8f0d7; /* MC原版纸张色 */
  background-image: 
    linear-gradient(90deg, rgba(100, 80, 60, 0.02) 1px, transparent 1px),
    linear-gradient(rgba(100, 80, 60, 0.02) 1px, transparent 1px);
  background-size: 16px 16px; /* MC原版纸张纹理密度 */
  border: 2px solid #8b5a2b; /* MC皮革书边框色 */
  border-radius: 2px;
  box-shadow: 
    inset 8px 0 15px rgba(0,0,0,0.08),
    0 0 0 4px #5c3c1e, /* 外层深色边框 */
    10px 10px 30px rgba(0,0,0,0.5);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center left;
  transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1;
  cursor: none; /* 适配MC自定义光标 */
}

/* 翻页动画 (MC原版翻页手感) */
.book-body.flipping-next {
  animation: flip-next 0.6s forwards;
}
.book-body.flipping-prev {
  animation: flip-prev 0.6s forwards;
}

@keyframes flip-next {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(-15deg) scale(0.98); background-color: #eee8d5; }
  100% { transform: rotateY(0); }
}
@keyframes flip-prev {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(15deg) scale(0.98); background-color: #eee8d5; }
  100% { transform: rotateY(0); }
}

/* 书脊 (MC原版窄书脊) */
.book-spine {
  position: absolute; 
  left: 0; top: 0; bottom: 0; 
  width: 15px;
  background: linear-gradient(to right, rgba(0,0,0,0.2), transparent);
  border-right: 1px solid rgba(0,0,0,0.1);
  pointer-events: none;
}

/* 页面内容容器 (无溢出+精准内边距) */
.page-wrapper {
  height: 100%;
  padding: 25px 25px 30px 30px; /* 左内边距适配书脊 */
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  cursor: none; /* 适配MC自定义光标 */
}

/* 滚动条 (MC风格 极简) */
.page-wrapper::-webkit-scrollbar { width: 4px; }
.page-wrapper::-webkit-scrollbar-track { background: transparent; }
.page-wrapper::-webkit-scrollbar-thumb {
  background: #8b5a2b;
  border-radius: 2px;
}

/* 页面内容通用动画 */
.page-content {
  height: 100%;
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

/* -------------------------- MC原版封面样式 (1:1还原) -------------------------- */
.cover-page {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f8f0d7;
}

.mc-cover-inner {
  width: 90%;
  height: 90%;
  border: 1px double #8b5a2b; /* MC封面细边框 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
}

.mc-book-title {
  font-size: 2.2rem;
  color: #2b1b17;
  margin: 0 0 30px 0;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.mc-book-author {
  font-size: 1.5rem;
  color: #5c3c1e;
  margin-bottom: auto; /* 作者信息居中 底部留空 */
}

.author-name {
  font-weight: bold;
  color: #000;
  display: block;
  margin-top: 5px;
}

.mc-cover-footer {
  font-size: 0.9rem;
  color: #8b5a2b;
  opacity: 0.7;
  margin-top: 10px;
}

/* -------------------------- 正文页样式 -------------------------- */
.text-page {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #1a1a1a;
  position: relative;
}

.page-num {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 0.9rem;
  color: #8b5a2b;
  opacity: 0.8;
}

/* -------------------------- MC颜色码样式 (精准匹配游戏内颜色) -------------------------- */
:deep(.mc-black) { color: #000000 !important; }
:deep(.mc-dark-blue) { color: #0000aa !important; }
:deep(.mc-dark-green) { color: #00aa00 !important; }
:deep(.mc-dark-aqua) { color: #00aaaa !important; }
:deep(.mc-dark-red) { color: #aa0000 !important; }
:deep(.mc-dark-purple) { color: #aa00aa !important; }
:deep(.mc-gold) { color: #ffaa00 !important; }
:deep(.mc-gray) { color: #aaaaaa !important; }
:deep(.mc-dark-gray) { color: #555555 !important; }
:deep(.mc-blue) { color: #5555ff !important; }
:deep(.mc-green) { color: #55ff55 !important; }
:deep(.mc-aqua) { color: #55ffff !important; }
:deep(.mc-red) { color: #ff5555 !important; }
:deep(.mc-light-purple) { color: #ff55ff !important; }
:deep(.mc-yellow) { color: #ffff55 !important; }
:deep(.mc-white) { color: #ffffff !important; }

/* -------------------------- Markdown样式 (MC风格适配) -------------------------- */
:deep(.md-p) { margin: 0 0 6px 0; }
:deep(.md-h1) { font-size: 1.7rem; border-bottom: 1px solid #8b5a2b; color: #2b1b17; margin: 0 0 15px 0; padding-bottom: 4px; }
:deep(.md-h2) { font-size: 1.4rem; margin: 20px 0 8px 0; font-weight: bold; color: #5c3c1e; }
:deep(.md-h3) { font-size: 1.2rem; margin: 15px 0 6px 0; font-weight: bold; color: #8b5a2b; }
:deep(.md-bold) { color: #000; font-weight: bold; }
:deep(.md-italic) { color: #5c3c1e; font-style: italic; }
:deep(.md-del) { color: #8b5a2b; text-decoration: line-through; }
:deep(.md-code) { background: rgba(92, 60, 30, 0.1); padding: 1px 3px; border-radius: 2px; font-size: 0.9em; color: #aa0000; }
:deep(.md-img) { max-width: 100%; border: 1px solid #8b5a2b; margin: 10px 0; box-shadow: 2px 2px 0 rgba(0,0,0,0.2); transform: rotate(-0.5deg); }
:deep(.md-ul) { margin: 6px 0 6px 20px; padding: 0; }
:deep(.md-li) { list-style: square; color: #333; margin: 3px 0; }
:deep(.empty-page) { text-align: center; margin-top: 50%; transform: translateY(-50%); font-size: 1.4rem; }

/* -------------------------- 按钮区 (MC原版样式 无遮挡) -------------------------- */
.mc-controls {
  display: flex;
  align-items: center;
  gap: 10px; /* 按钮间距 紧凑但不挤 */
  z-index: 99999; /* 最高层级 确保可点击 */
  position: relative;
  width: 100%;
  max-width: 400px; /* 和书本同宽 对齐 */
  justify-content: center;
  cursor: none; /* 适配MC自定义光标 */
}

/* 完成按钮 (MC原版按钮样式) */
.mc-done-btn {
  background: #d9c7b8;
  border: 2px solid #5c3c1e;
  border-top-color: #f0e6d6;
  border-left-color: #f0e6d6;
  color: #2b1b17;
  padding: 6px 30px;
  font-family: inherit;
  font-size: 1.2rem;
  cursor: none; /* 适配MC自定义光标 */
  box-shadow: 0 2px 0 #5c3c1e;
  transition: all 0.1s;
  min-width: 120px;
  text-align: center;
}
.mc-done-btn:hover { 
  background: #e8d8c8; 
  transform: translateY(-1px); 
  box-shadow: 0 3px 0 #5c3c1e; 
}
.mc-done-btn:active { 
  transform: translateY(2px); 
  box-shadow: 0 0 0 #5c3c1e; 
  background: #c8b098; 
}

/* 翻页按钮 (MC原版箭头样式) */
.mc-nav-btn {
  background: none; 
  border: none;
  font-size: 2.5rem; 
  color: #d9c7b8;
  text-shadow: 1px 1px 0 #2b1b17;
  cursor: none; /* 适配MC自定义光标 */
  transition: all 0.2s;
  line-height: 1;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mc-nav-btn:hover { 
  color: #fff; 
  transform: scale(1.1); 
  text-shadow: 1px 1px 0 #000; 
}
.mc-nav-btn.disabled { 
  color: #555; 
  cursor: default; 
  transform: none; 
  text-shadow: none; 
  opacity: 0.5; 
  pointer-events: none; /* 禁用按钮完全不可点击 */
}

/* -------------------------- 移动端适配 (精准缩放) -------------------------- */
@media (max-width: 450px) {
  .book-body { 
    width: 90vw; 
    height: 70vh; 
  }
  .mc-book-title { font-size: 1.8rem; }
  .text-page { font-size: 1.1rem; }
  .mc-controls { 
    gap: 8px; 
    padding: 0 10px;
  }
  .mc-done-btn { 
    padding: 5px 20px; 
    font-size: 1.1rem; 
    min-width: 100px;
  }
  .mc-nav-btn { 
    font-size: 2.2rem; 
    width: 40px;
    height: 40px;
  }
}
</style>