<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const articles = ref([])

// 模拟 API
const fetchArticles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Understanding Vue 3 Reactivity', date: '2025-10-24', category: 'Tech', difficulty: '⭐⭐⭐' },
        { id: 2, title: 'How I built this MC Blog', date: '2025-10-20', category: 'Project', difficulty: '⭐⭐' },
        { id: 3, title: 'Redstone Circuits Guide', date: '2025-09-15', category: 'Game', difficulty: '⭐⭐⭐⭐' },
        { id: 4, title: 'My Freelance Journey', date: '2025-08-05', category: 'Life', difficulty: '⭐' },
        { id: 5, title: 'Docker for Beginners', date: '2025-07-20', category: 'Tech', difficulty: '⭐⭐' },
      ])
    }, 300)
  })
}

onMounted(async () => {
  articles.value = await fetchArticles()
})

const goBack = () => router.push('/mc')
</script>

<template>
  <div class="quest-board-page">
    <div class="board-header">
      <button class="mc-btn back-btn" @click="goBack">&lt; {{ t('mc.back') }}</button>
      <h1 class="board-title">{{ t('mc.quest_board') }}</h1>
    </div>

    <div class="board-container">
      <div class="wood-frame">
        <div class="paper-grid">
          
          <div 
            v-for="article in articles" 
            :key="article.id" 
            class="quest-paper"
          >
            <div class="pin">📌</div>
            <h2 class="quest-title">{{ article.title }}</h2>
            
            <div class="quest-meta">
              <span class="tag">[{{ article.category }}]</span>
              <span class="date">{{ t('mc.published') }}: {{ article.date }}</span>
            </div>

            <div class="quest-divider">----------------</div>
            
            <div class="quest-body">
              <p>Difficulty: {{ article.difficulty }}</p>
              <p>{{ t('mc.quest_reward') }}</p>
            </div>

            <button class="accept-btn">{{ t('mc.read_more') }}</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.quest-board-page {
  width: 100vw; min-height: 100vh;
  background-color: #3f2818; /* 深木色背景 */
  /* 这里可以用木板纹理图代替 background-color */
  background-image: repeating-linear-gradient(90deg, #5c3a21 0, #5c3a21 40px, #52321b 40px, #52321b 80px);
  font-family: 'VT323', monospace;
  display: flex; flex-direction: column; align-items: center;
  padding: 20px;
}

.board-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 30px;
}
.board-title {
  color: #fff; font-size: 3rem; text-shadow: 4px 4px 0 #000;
  background: #000; padding: 5px 20px; border: 4px solid #fff;
}
.mc-btn.back-btn {
  background: #777; border: 2px solid #fff; color: #fff; font-size: 1.5rem; padding: 5px 15px; cursor: pointer;
}

/* 木板框容器 */
.board-container {
  width: 90%; max-width: 1200px;
  background: #855e42; /* 浅一点的木色 */
  border: 8px solid #3e2714;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  padding: 30px;
  min-height: 60vh;
}

.paper-grid {
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
  gap: 30px;
}

/* 羊皮纸/任务纸风格 */
.quest-paper {
  background: #f2eecb; /* 羊皮纸黄 */
  color: #3e2714; /* 墨水色 */
  padding: 20px;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  transform: rotate(calc(var(--r, 0deg))); /* 可以随机旋转一点点 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex; flex-direction: column;
}

.quest-paper:hover {
  transform: scale(1.05) rotate(0deg) !important;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.4);
  z-index: 10;
}

.pin { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); font-size: 1.5rem; filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.5)); }

.quest-title { font-size: 1.8rem; margin: 10px 0; line-height: 1.1; text-align: center; border-bottom: 2px solid #3e2714; padding-bottom: 5px; }

.quest-meta { font-size: 1rem; display: flex; justify-content: space-between; color: #664422; margin-bottom: 10px; }
.quest-divider { text-align: center; margin: 10px 0; opacity: 0.5; letter-spacing: -2px; }

.quest-body { flex: 1; font-size: 1.2rem; margin-bottom: 20px; text-align: center; }

.accept-btn {
  background: #3e2714; color: #f2eecb; border: none;
  font-family: inherit; font-size: 1.5rem; padding: 5px 0;
  cursor: pointer; width: 100%;
}
.accept-btn:hover { background: #5c3a21; }
</style>