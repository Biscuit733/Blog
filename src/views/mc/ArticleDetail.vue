<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const articleId = route.params.id
const currentPage = ref(0)

// 模拟一本书的内容 (分页存储)
// 实际开发中，你可以写一个函数把长 Markdown 切割成数组
const articleData = ref({
  title: 'Vue 3 的奥秘',
  author: 'biscuit',
  pages: [
    `
      <h3>第一章：响应式原理</h3>
      <p>在很久很久以前，Steve 发现了一种叫做 Proxy 的红石电路。</p>
      <p>这种电路可以监听数据的变化，就像侦测器 (Observer) 一样。</p>
      <br>
      <p>当我们修改数据时，视图会自动更新，这简直就是魔法！</p>
    `,
    `
      <h3>第二章：组合式 API</h3>
      <p>相比于 Option API，Composition API 就像是把背包里的物品整理得井井有条。</p>
      <p>我们可以把相关的逻辑放在一起，而不是散落在各处。</p>
      <hr>
      <p>这极大地提高了代码的可维护性，就像给箱子贴上了标签。</p>
    `,
    `
      <h3>终章：总结</h3>
      <p>Vue 3 是一个强大的工具，就像附魔后的钻石镐。</p>
      <p>掌握它，你就能构建出令人惊叹的建筑。</p>
      <br>
      <p class="signature">—— By biscuit</p>
    `
  ]
})

const totalPages = computed(() => articleData.value.pages.length)
const currentContent = computed(() => articleData.value.pages[currentPage.value])

// 翻页逻辑
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}

const closeBook = () => {
  router.push('/mc/articles')
}
</script>

<template>
  <div class="reader-overlay">
    <div class="backdrop" @click="closeBook"></div>

    <div class="book-gui">
      
      <div class="page-content">
        <div v-if="currentPage === 0" class="book-header">
          <div class="title">{{ articleData.title }}</div>
          <div class="author">by {{ articleData.author }}</div>
        </div>
        
        <div class="text-body" v-html="currentContent"></div>
        
        <div class="page-number">
          {{ t('mc.articles.reader.page') }} {{ currentPage + 1 }} / {{ totalPages }}
        </div>
      </div>

      <div class="controls">
        <button 
          class="nav-btn prev mc-button" 
          :disabled="currentPage === 0" 
          @click="prevPage"
        >
          &lt; {{ t('mc.articles.reader.prev') }}
        </button>
        
        <button class="done-btn mc-button" @click="closeBook">
          {{ t('mc.articles.reader.done') }}
        </button>
        
        <button 
          class="nav-btn next mc-button" 
          :disabled="currentPage === totalPages - 1" 
          @click="nextPage"
        >
          {{ t('mc.articles.reader.next') }} &gt;
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
/* 引入衬线字体模拟墨水字 */
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,700;1,400&display=swap');

.reader-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  display: flex; align-items: center; justify-content: center;
  z-index: 200; /* 比普通页面高 */
}

/* 模糊背景 */
.backdrop {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
}

/* 书本 GUI 容器 */
.book-gui {
  position: relative;
  width: 440px; /* 还原 MC 书本比例 */
  height: 580px;
  /* 核心：书本纹理背景色 */
  background-color: #c6b290; 
  /* 内阴影模拟纸张陈旧感 */
  box-shadow: 
    inset 0 0 40px rgba(0,0,0,0.2), 
    inset 0 0 10px rgba(139, 69, 19, 0.3),
    0 20px 50px rgba(0,0,0,0.8);
  border: 4px solid #000;
  /* 加上一点书脊效果 */
  border-left: 8px solid #5d4037; 
  display: flex; flex-direction: column;
  padding: 30px 25px;
  animation: open-book 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 页面内容 */
.page-content {
  flex: 1;
  font-family: 'Crimson Text', serif; /* 衬线字体 */
  color: #1a1a1a; /* 墨水黑，不是纯黑 */
  font-size: 1.3rem;
  line-height: 1.6;
  overflow-y: hidden; /* 书本不能滚动，只能翻页 */
}

.book-header {
  text-align: center; margin-bottom: 20px;
  border-bottom: 2px solid #5d4037; padding-bottom: 10px;
}
.title { font-size: 1.8rem; font-weight: bold; color: #000; }
.author { font-size: 1.1rem; color: #555; font-style: italic; }

/* 正文样式 */
.text-body :deep(h3) { margin: 15px 0 10px 0; font-size: 1.4rem; color: #3e2723; }
.text-body :deep(p) { margin-bottom: 10px; }
.text-body :deep(.signature) { text-align: right; margin-top: 30px; font-style: italic; color: #555; }

.page-number {
  position: absolute; top: 10px; right: 15px;
  font-family: 'VT323', monospace; font-size: 1.2rem; color: #5d4037;
}

/* 底部按钮栏 */
.controls {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 20px; font-family: 'VT323', monospace;
}

.nav-btn, .done-btn {
  background: #c6c6c6; border: 2px solid #fff; 
  border-right-color: #555; border-bottom-color: #555;
  padding: 5px 15px; cursor: pointer; font-size: 1.2rem;
  color: #000;
}
.nav-btn:active, .done-btn:active {
  border-color: #555; border-right-color: #fff; border-bottom-color: #fff;
  transform: translateY(2px);
}
.nav-btn:disabled {
  opacity: 0.5; cursor: not-allowed; filter: grayscale(1);
}

.done-btn { font-weight: bold; width: 120px; }

@keyframes open-book {
  0% { transform: scale(0.1) rotateY(90deg); opacity: 0; }
  100% { transform: scale(1) rotateY(0); opacity: 1; }
}
</style>