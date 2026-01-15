<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// 模拟数据 (支持 Markdown)
const article = ref({
  title: "Vue 3.0 深度解析",
  author: "biscuit",
  pages: [
    // Page 1
    `# 第一章：序言

Vue 3 的 **Composition API** 是一次革命性的升级。

- 更灵活的逻辑复用
- 更好的 TypeScript 支持
- 更小的打包体积

![Vue Logo](/src/assets/vue.svg)

它允许我们将逻辑关注点组织在一起，而不是被 Options API 强制拆分。`,
    
    // Page 2
    `## 第二章：响应式原理

Vue 3 使用 *Proxy* 替代了 \`Object.defineProperty\`。这意味着我们可以直接监听数组索引的变化。

![Pickaxe](/images/pickaxe.png)

(上图是示例图片)
`,
    
    // Page 3
    `§c[End of Stream]

感谢阅读！

(这本书的内容是支持 Markdown 渲染的，你可以在后台直接粘贴 MD 文本)
`
  ]
})

// 页码状态：0=封面，1=正文第1页...
const currentPage = ref(0)
const totalPages = computed(() => article.value.pages.length + 1)
const transitionName = ref('slide-next') // 控制动画方向

// Markdown 解析器
const parseMarkdown = (text) => {
  if (!text) return ''
  let html = text
    .replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/`(.*?)`/gim, '<code class="md-code">$1</code>')
    // 图片渲染优化：增加容器以防溢出
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<div class="img-box"><img src="$2" alt="$1" /></div>')
    .replace(/^- (.*$)/gim, '<li class="md-li">$1</li>')
    // MC 颜色代码
    .replace(/§c/g, '<span style="color: #aa0000">') 
    .replace(/§0/g, '<span style="color: #000000">')
    .replace(/\n/g, '<br>')
  return html
}

// 翻页逻辑
const changePage = (delta) => {
  const newPage = currentPage.value + delta
  if (newPage >= 0 && newPage < totalPages.value) {
    // 设置动画方向
    transitionName.value = delta > 0 ? 'slide-next' : 'slide-prev'
    new Audio('/sounds/book_open.ogg').play().catch(()=>{})
    currentPage.value = newPage
  }
}

const closeBook = () => {
  new Audio('/sounds/click.mp3').play().catch(()=>{})
  router.push('/mc/articles')
}
</script>

<template>
  <div class="book-scene">
    <div class="backdrop" @click="closeBook"></div>

    <div class="book-container">
      
      <div class="book-cover-bg">
        <div class="spine-shadow"></div>
        <div class="paper-stack"></div>
      </div>

      <div class="page-viewport">
        
        <Transition :name="transitionName" mode="out-in">
          
          <div v-if="currentPage === 0" class="page-content cover-layout" key="cover">
            <div class="cover-frame">
              <h1 class="book-title">{{ article.title }}</h1>
              <div class="book-meta">
                <span>{{ t('mc.book.by') }}</span>
                <span class="author-name">{{ article.author }}</span>
              </div>
              <div class="decoration">§0Original Copy</div>
            </div>
          </div>

          <div v-else class="page-content text-layout" :key="`page-${currentPage}`">
            <div class="markdown-body" v-html="parseMarkdown(article.pages[currentPage - 1])"></div>
            <div class="page-footer">
              Page {{ currentPage }} of {{ totalPages - 1 }}
            </div>
          </div>

        </Transition>
      </div>

      <div class="book-controls">
        <button 
          class="nav-btn prev" 
          :class="{ disabled: currentPage === 0 }"
          @click="changePage(-1)"
        >
          &lt;
        </button>

        <button class="done-btn" @click="closeBook">
          {{ t('mc.book.btn_done') }}
        </button>

        <button 
          class="nav-btn next" 
          :class="{ disabled: currentPage === totalPages - 1 }"
          @click="changePage(1)"
        >
          &gt;
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* === 场景容器 === */
.book-scene {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
  font-family: 'VT323', monospace;
}

.backdrop {
  position: absolute; inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
}

/* === 书本主体 === */
.book-container {
  position: relative;
  width: 440px; height: 600px;
  background: #fdf9e8; /* 纸张底色 */
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  display: flex; flex-direction: column;
  overflow: hidden; /* 防止内容溢出 */
}

/* === 视觉层 (模拟书本质感) === */
.book-cover-bg {
  position: absolute; inset: 0; pointer-events: none;
  border: 8px solid #5d4037; /* 皮革边框 */
  background-image: 
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 5; /* 在内容之上，形成边框遮挡 */
}

/* 左侧书脊阴影 */
.spine-shadow {
  position: absolute; left: 0; top: 0; bottom: 0; width: 30px;
  background: linear-gradient(to right, rgba(62, 39, 35, 0.4), transparent);
  z-index: 6;
}

/* === 内容视口 === */
.page-viewport {
  flex: 1;
  position: relative;
  margin: 15px 20px 10px 30px; /* 留出边距 */
  overflow: hidden;
}

/* 页面通用布局 */
.page-content {
  height: 100%;
  padding: 20px;
  overflow-y: auto; /* 内容过长可滚动 */
  color: #1a1a1a;
  /* 自定义滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #8d6e63 transparent;
}
.page-content::-webkit-scrollbar { width: 6px; }
.page-content::-webkit-scrollbar-thumb { background: #8d6e63; border-radius: 3px; }

/* === 封面样式 (Page 0) === */
.cover-layout {
  display: flex; align-items: center; justify-content: center;
  text-align: center;
}
.cover-frame {
  width: 100%; height: 90%;
  border: 4px double #8d6e63;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 20px;
}
.book-title { font-size: 2.5rem; color: #3e2723; margin-bottom: 20px; line-height: 1.2; text-shadow: 1px 1px 0 rgba(0,0,0,0.1); }
.book-meta { font-size: 1.4rem; color: #5d4037; }
.author-name { display: block; font-weight: bold; color: #000; margin-top: 5px; }
.decoration { margin-top: auto; font-size: 1rem; color: #aaa; }

/* === 正文样式 (Page > 0) === */
.text-layout {
  font-size: 1.3rem;
  line-height: 1.6;
}
.page-footer {
  margin-top: 30px;
  text-align: right;
  font-size: 1rem;
  color: #8d6e63;
  border-top: 1px solid rgba(141, 110, 99, 0.3);
  padding-top: 10px;
}

/* === Markdown 样式修正 === */
:deep(.md-h1) { font-size: 1.8rem; border-bottom: 2px solid #5d4037; color: #3e2723; margin-bottom: 15px; }
:deep(.md-h2) { font-size: 1.5rem; margin-top: 20px; font-weight: bold; color: #4e342e; }
:deep(.md-li) { margin-left: 20px; list-style: square; }
:deep(.md-code) { background: rgba(0,0,0,0.08); padding: 2px 5px; border-radius: 4px; color: #bf360c; font-family: monospace; }
:deep(.img-box) { text-align: center; margin: 15px 0; }
:deep(img) { max-width: 90%; border: 3px solid #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transform: rotate(-1deg); }

/* === 底部控制栏 === */
.book-controls {
  height: 70px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 30px;
  z-index: 10;
  border-top: 1px solid rgba(93, 64, 55, 0.1);
  background: rgba(253, 249, 232, 0.5);
}

.done-btn {
  background: #d7ccc8;
  border: 2px solid #5d4037; border-top-color: #efebe9; border-left-color: #efebe9;
  padding: 6px 40px;
  font-family: inherit; font-size: 1.4rem; color: #3e2723;
  cursor: pointer;
  box-shadow: 0 3px 0 #5d4037;
  transition: all 0.1s;
}
.done-btn:active { transform: translateY(3px); box-shadow: none; border-color: #5d4037; }

.nav-btn {
  background: none; border: none; font-size: 3rem; color: #8d6e63; cursor: pointer; transition: transform 0.2s;
}
.nav-btn:hover { color: #3e2723; transform: scale(1.1); }
.nav-btn.disabled { opacity: 0.2; cursor: default; transform: none; }

/* === 切换动画 (Vue Transition) === */
/* 下一页：新页从右滑入，旧页向左滑出 */
.slide-next-enter-active, .slide-next-leave-active,
.slide-prev-enter-active, .slide-prev-leave-active {
  transition: all 0.3s ease;
}

/* Next: Enter (Right -> Center), Leave (Center -> Left) */
.slide-next-enter-from { opacity: 0; transform: translateX(20px); }
.slide-next-leave-to { opacity: 0; transform: translateX(-20px); }

/* Prev: Enter (Left -> Center), Leave (Center -> Right) */
.slide-prev-enter-from { opacity: 0; transform: translateX(-20px); }
.slide-prev-leave-to { opacity: 0; transform: translateX(20px); }

/* 移动端适配 */
@media (max-width: 500px) {
  .book-container { width: 95vw; height: 80vh; }
  .book-title { font-size: 2rem; }
  .text-layout { font-size: 1.2rem; }
}
</style>