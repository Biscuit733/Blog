<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const isLoading = ref(true)
const searchQuery = ref('')
const activeFilter = ref('all')

// 模拟文章数据
const allArticles = [
  { id: 1, title: 'Vue 3 Reactivity Secrets', date: '2025-10-24', category: 'tech', readTime: '10 min', difficulty: 'IV', icon: '📘' },
  { id: 2, title: 'My Trip to The End', date: '2025-10-20', category: 'life', readTime: '5 min', difficulty: 'I', icon: '📜' },
  { id: 3, title: 'Building a Redstone CPU', date: '2025-09-15', category: 'tech', readTime: '25 min', difficulty: 'V', icon: '⚡' },
  { id: 4, title: 'Shader Configuration Guide', date: '2025-09-10', category: 'tech', readTime: '15 min', difficulty: 'III', icon: '🔮' },
  { id: 5, title: 'Coffee Brewing Recipes', date: '2025-08-05', category: 'life', readTime: '3 min', difficulty: 'I', icon: '☕' },
  { id: 6, title: 'Docker for Villagers', date: '2025-07-20', category: 'tech', readTime: '12 min', difficulty: 'II', icon: '🐳' },
]

const articles = ref([])
const openArticle = (id) => {
  // 跳转到 /mc/articles/:id
  router.push({ 
    name: 'mc-article-detail', 
    params: { id } 
  })
}
onMounted(() => {
  // 模拟加载延迟
  setTimeout(() => {
    articles.value = allArticles
    isLoading.value = false
  }, 600)
  // 播放翻书/附魔音效
  const baseUrl = import.meta.env.BASE_URL || '/'
  const bookSound = new Audio(baseUrl + 'sounds/book_open.ogg')
  bookSound.volume = 0.8
  bookSound.play()
})

// 筛选逻辑
const filteredArticles = computed(() => {
  return articles.value.filter(item => {
    // 1. 搜索过滤
    const matchSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    // 2. 分类过滤
    const matchType = activeFilter.value === 'all' || item.category === activeFilter.value
    return matchSearch && matchType
  })
})

const goBack = () => router.push('/mc')
</script>

<template>
  <div class="library-container">
    <div class="library-bg"></div>

    <div class="hud-header">
      <button class="mc-btn back-btn" @click="goBack">&lt; {{ t('mc.back') }}</button>
      <div class="hud-title">
        <h1>{{ t('mc.articles.title') }}</h1>
        <span class="subtitle">{{ t('mc.articles.subtitle') }}</span>
      </div>
      <div class="hud-spacer"></div> </div>

    <div class="main-content" v-if="!isLoading">
      
      <div class="control-bar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            :placeholder="t('mc.articles.search_placeholder')" 
            class="mc-input"
          />
        </div>
        
        <div class="filter-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: activeFilter === 'all' }"
            @click="activeFilter = 'all'"
          >{{ t('mc.articles.filter_all') }}</button>
          
          <button 
            class="tab-btn" 
            :class="{ active: activeFilter === 'tech' }"
            @click="activeFilter = 'tech'"
          >{{ t('mc.articles.filter_tech') }}</button>
          
          <button 
            class="tab-btn" 
            :class="{ active: activeFilter === 'life' }"
            @click="activeFilter = 'life'"
          >{{ t('mc.articles.filter_life') }}</button>
        </div>
      </div>

      <div class="bookshelf-area">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id" 
          class="book-card"
          :class="article.category"
        >
          <div class="book-cover">
            <span class="book-icon">{{ article.icon }}</span>
            <div v-if="article.category === 'tech'" class="enchant-glint"></div>
          </div>

          <div class="book-info">
            <h3 class="book-title">{{ article.title }}</h3>
            
            <div class="book-meta">
              <div class="meta-row">
                <span class="label">{{ t('mc.articles.attr_date') }}:</span>
                <span class="value">{{ article.date }}</span>
              </div>
              <div class="meta-row">
                <span class="label">{{ t('mc.articles.attr_read') }}:</span>
                <span class="value">{{ article.readTime }}</span>
              </div>
              <div class="meta-row">
                <span class="label">{{ t('mc.articles.difficulty') }}:</span>
                <span class="value enchant-text">{{ article.difficulty }}</span>
              </div>
            </div>

            <button class="read-btn" @click.stop="openArticle(article.id)">{{ t('mc.articles.read_more') }}</button>
          </div>
        </div>
        
        <div v-if="filteredArticles.length === 0" class="empty-state">
          No scrolls found... 🕸️
        </div>
      </div>

    </div>

    <div v-if="isLoading" class="loading">{{ t('mc.loading') }}</div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* === 全局容器 === */
.library-container {
  width: 100vw; height: 100vh; overflow: hidden;
  font-family: 'VT323', monospace; color: #fff;
  display: flex; flex-direction: column;
}

/* 背景层 (等你有了图，把 url 换成你的 library-bg.jpg) */
.library-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  /* 临时使用 CSS 渐变模拟书架氛围 */
  /* background: radial-gradient(circle at 50% 50%, #2a1505 0%, #000 90%); */
  /* 引入文章背景图 */
  background-image: url('/images/articleBG.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 3. 加一层黑色遮罩，否则文字看不清 */
  filter: brightness(0.6);
  z-index: -1;
}

/* 顶部 HUD */
.hud-header {
  height: 80px; padding: 0 30px; 
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
  z-index: 10;
}
.mc-btn { background: #555; border: 2px solid #fff; border-bottom-color: #333; border-right-color: #333; color: #fff; padding: 6px 15px; cursor: pointer; font-family: inherit; font-size: 1.2rem; }
.hud-title { text-align: center; }
.hud-title h1 { margin: 0; font-size: 2.5rem; color: #fec901; text-shadow: 2px 2px 0 #3e2723; }
.subtitle { color: #aaa; font-size: 1.2rem; }
.hud-spacer { width: 80px; }

/* 主内容区 */
.main-content {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  padding: 20px 40px; overflow-y: hidden;
}

/* === 控制栏 (搜索 & 过滤) === */
.control-bar {
  width: 100%; max-width: 1000px;
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 30px;
  background: rgba(0,0,0,0.5); padding: 15px; border: 2px solid #555;
}

.search-box {
  display: flex; align-items: center; background: #000; border: 2px solid #333; padding: 5px 10px;
}
.mc-input {
  background: transparent; border: none; color: #fff; font-family: inherit; font-size: 1.2rem; outline: none; width: 200px; margin-left: 10px;
}

.filter-tabs { display: flex; gap: 10px; }
.tab-btn {
  background: #333; border: 2px solid #555; color: #aaa; 
  padding: 5px 15px; cursor: pointer; font-family: inherit; font-size: 1.1rem;
  transition: all 0.2s;
}
.tab-btn.active {
  background: #5c3317; border-color: #fec901; color: #fff; transform: translateY(-2px);
}

/* === 书架区域 (Grid) === */
.bookshelf-area {
  flex: 1; width: 100%; max-width: 1200px;
  overflow-y: auto; /* 只有这里滚动 */
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
  gap: 30px; padding: 20px;
  /* 隐藏滚动条 */
  scrollbar-width: none;
}
.bookshelf-area::-webkit-scrollbar { display: none; }

/* 书本卡片 */
.book-card {
  background-color: rgba(30,30,30,0.85);
  border: 4px solid #333;
  display: flex; flex-direction: column;
  position: relative; transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer; height: 320px;
}
.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.6);
  border-color: #777;
}

/* 分类颜色 */
.book-card.tech { border-top-color: #55ffff; }
.book-card.life { border-top-color: #ffaaff; }

/* 书本封面图/Icon */
.book-cover {
  flex: 2; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.3); border-bottom: 2px dashed #444;
  position: relative; overflow: hidden;
}
.book-icon { font-size: 80px; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5)); z-index: 2; }

/* 附魔光效 (CSS 动画) */
.enchant-glint {
  position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: linear-gradient(45deg, transparent 45%, rgba(168, 56, 255, 0.2) 50%, transparent 55%);
  animation: glint 3s infinite linear; z-index: 1;
}
@keyframes glint { 0% { transform: translate(-30%, -30%); } 100% { transform: translate(30%, 30%); } }

/* 书本信息 */
.book-info { flex: 3; padding: 15px; display: flex; flex-direction: column; }
.book-title { margin: 0 0 15px 0; font-size: 1.4rem; color: #fff; line-height: 1.2; height: 3.6rem; overflow: hidden; }

.book-meta { flex: 1; color: #aaa; font-size: 1rem; }
.meta-row { display: flex; justify-content: space-between; margin-bottom: 5px; border-bottom: 1px solid #444; padding-bottom: 2px; }
.value { color: #ddd; }
.enchant-text { color: #b76bf7; font-family: monospace; font-weight: bold; } /* 附魔文字色 */

.read-btn {
  margin-top: auto; width: 100%;
  background: #3e2723; border: 2px solid #5d4037; color: #eebb99;
  padding: 8px; font-family: inherit; font-size: 1.2rem; cursor: pointer;
  transition: background 0.2s;
}
.read-btn:hover { background: #5d4037; color: #fff; }

.empty-state { grid-column: 1 / -1; text-align: center; font-size: 2rem; color: #666; margin-top: 50px; }
.loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; }
</style>