<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const isLoading = ref(true)

// 獲取基礎路徑，用於修復圖片引用
const baseUrl = import.meta.env.BASE_URL

// 模擬存檔數據
const articles = ref([
  {
    id: 1,
    title: 'Vue 3.0 深度解析',
    fileName: 'Vue_Deep_Dive',
    date: '2026-01-14',
    modeKey: 'mode_survival', // 對應 mc.articles.mode_survival
    cheats: true,
    icon: `${baseUrl}images/homeBG.png`, 
    version: '1.20.1'
  },
  {
    id: 2,
    title: 'CSS 像素畫繪制指南',
    fileName: 'Pixel_Art_Tutorial',
    date: '2026-01-10',
    modeKey: 'mode_creative',
    cheats: false,
    icon: `${baseUrl}images/aboutBG.png`,
    version: '1.19.4'
  },
  {
    id: 3,
    title: 'Spigot 服務器搭建',
    fileName: 'Server_Log_Backup',
    date: '2025-12-25',
    modeKey: 'mode_hardcore',
    cheats: false,
    icon: null, 
    version: '1.7.10'
  }
])

const selectedId = ref(null)

// 狀態控制變量
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const isRecreating = ref(false)
const loadingText = ref('')
const editName = ref('')

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 500)
})

// 音效播放
const playSound = (name) => {
  new Audio(`${baseUrl}sounds/${name}`).play().catch(() => {})
}

// === 基礎交互 ===
const selectWorld = (id) => {
  selectedId.value = id
  playSound('click.mp3')
}

const playWorld = () => {
  if (!selectedId.value) return
  playSound('click.mp3')
  router.push(`/mc/articles/${selectedId.value}`)
}

const goBack = () => {
  playSound('click.mp3')
  router.push('/mc')
}

// === 功能 1: 刪除世界 ===
const handleDelete = () => {
  playSound('click.mp3')
  showDeleteModal.value = true
}

const confirmDelete = () => {
  playSound('mine_stone.ogg') 
  articles.value = articles.value.filter(a => a.id !== selectedId.value)
  selectedId.value = null
  showDeleteModal.value = false
}

// === 功能 2: 編輯世界 ===
const handleEdit = () => {
  playSound('click.mp3')
  const target = articles.value.find(a => a.id === selectedId.value)
  if (target) {
    editName.value = target.title
    showEditModal.value = true
  }
}

const saveEdit = () => {
  const target = articles.value.find(a => a.id === selectedId.value)
  if (target) {
    target.title = editName.value
    playSound('achievement.ogg')
  }
  showEditModal.value = false
}

// === 功能 3: 重建 (覆制) ===
const handleRecreate = () => {
  if (isRecreating.value) return
  playSound('click.mp3')
  
  isRecreating.value = true
  // 這裡使用 mc.articles 下的 loading 文案
  loadingText.value = t('mc.articles.loading_terrain')
  
  setTimeout(() => { loadingText.value = t('mc.articles.loading_chunks') }, 1000)
  
  setTimeout(() => {
    const target = articles.value.find(a => a.id === selectedId.value)
    if (target) {
      const newWorld = { 
        ...target, 
        id: Date.now(), 
        title: target.title + " (Copy)", 
        fileName: target.fileName + "_copy" 
      }
      articles.value.unshift(newWorld)
    }
    isRecreating.value = false
    playSound('achievement.ogg')
  }, 2500)
}

const getSubText = (article) => `${article.fileName} (${article.date})`

// 修正：這裡獲取模式文本時，也加上了 mc.articles 前綴
const getModeText = (article) => {
  let text = t(`mc.articles.${article.modeKey}`)
  if (article.cheats) text += `, ${t('mc.articles.cheats')}`
  return text
}
</script>

<template>
  <div class="mc-singleplayer-page" :style="{ backgroundImage: `url(${baseUrl}images/homeBG.png)` }">
    <div class="bg-overlay"></div>

    <div class="header-bar">
      <h1 class="page-title">{{ t('mc.articles.title') }}</h1>
    </div>

    <div class="list-container">
      <div class="world-list-wrapper">
        <div v-if="isLoading" class="loading-text">{{ t('mc.loading') }}</div>
        
        <template v-else>
          <div 
            v-for="world in articles" 
            :key="world.id"
            class="world-entry"
            :class="{ 'selected': selectedId === world.id }"
            @click="selectWorld(world.id)"
            @dblclick="playWorld"
          >
            <div class="world-icon">
              <img v-if="world.icon" :src="world.icon" class="icon-img" />
              <div v-else class="icon-placeholder">
                <span>World</span>
              </div>
            </div>

            <div class="world-info">
              <div class="world-name">{{ world.title }}</div>
              <div class="world-meta">{{ getSubText(world) }}</div>
              <div class="world-mode">{{ getModeText(world) }} - {{ world.version }}</div>
            </div>
          </div>
          
          <div class="world-entry empty" v-for="n in 3" :key="'empty'+n"></div>
        </template>
      </div>
    </div>

    <div class="footer-bar" :style="{ backgroundImage: `url(${baseUrl}images/homeBG.png)` }">
      <div class="btn-row top-row">
        <button class="mc-btn lg" :disabled="!selectedId" @click="playWorld">
          {{ t('mc.articles.btn_play') }}
        </button>
        <button class="mc-btn lg" disabled>
          {{ t('mc.articles.btn_create') }}
        </button>
      </div>
      
      <div class="btn-row bottom-row">
        <button class="mc-btn" :disabled="!selectedId" @click="handleEdit">{{ t('mc.articles.btn_edit') }}</button>
        <button class="mc-btn" :disabled="!selectedId" @click="handleDelete">{{ t('mc.articles.btn_delete') }}</button>
        <button class="mc-btn" :disabled="!selectedId" @click="handleRecreate">{{ t('mc.articles.btn_recreate') }}</button>
        <button class="mc-btn" @click="goBack">{{ t('mc.articles.btn_cancel') }}</button>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay danger-mode">
      <div class="mc-modal-danger">
        <h2 class="danger-title">{{ t('mc.articles.delete_title') }}</h2>
        <p class="danger-desc">
          {{ t('mc.articles.delete_warn', { name: articles.find(a => a.id === selectedId)?.title }) }}
        </p>
        <div class="modal-btns">
          <button class="mc-btn" @click="confirmDelete">{{ t('mc.articles.btn_confirm_delete') }}</button>
          <button class="mc-btn" @click="showDeleteModal = false">{{ t('mc.articles.btn_cancel') }}</button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="mc-modal">
        <h2 class="modal-title">{{ t('mc.articles.edit_title') }}</h2>
        <div class="input-group">
          <label>{{ t('mc.articles.label_world_name') }}</label>
          <input type="text" v-model="editName" class="mc-input" autofocus />
        </div>
        <div class="modal-btns">
          <button class="mc-btn" @click="saveEdit">{{ t('mc.articles.btn_save') }}</button>
          <button class="mc-btn" @click="showEditModal = false">{{ t('mc.articles.btn_cancel') }}</button>
        </div>
      </div>
    </div>

    <div v-if="isRecreating" class="modal-overlay loading-mode" :style="{ backgroundImage: `url(${baseUrl}images/homeBG.png)` }">
      <div class="loading-box">
        <div class="loading-title">{{ loadingText }}</div>
        <div class="mc-progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.mc-singleplayer-page {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  overflow: hidden;
  background-size: cover; background-position: center;
  font-family: 'VT323', monospace; color: #fff;
  display: flex; flex-direction: column;
}

.bg-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 0; }

/* 標題 */
.header-bar { height: 60px; flex-shrink: 0; z-index: 10; display: flex; align-items: center; justify-content: center; margin-top: 20px; }
.page-title { font-size: 2rem; color: #fff; text-shadow: 2px 2px 0 #333; margin: 0; }

/* 列表容器 */
.list-container { flex: 1; width: 100%; position: relative; z-index: 10; display: flex; justify-content: center; overflow-y: auto; padding: 10px 0; background: rgba(0,0,0,0.4); box-shadow: inset 0 0 20px #000; }
.list-container::-webkit-scrollbar { width: 10px; background: #000; border-left: 2px solid #888; }
.list-container::-webkit-scrollbar-thumb { background: #ccc; border: 2px solid #fff; border-right-color: #555; border-bottom-color: #555; }

.world-list-wrapper { width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 4px; padding: 0 10px; }
.loading-text { text-align: center; margin-top: 50px; font-size: 1.5rem; color: #aaa; }

/* 單個存檔條目 */
.world-entry { height: 80px; background: rgba(0,0,0,0.5); border: 2px solid transparent; display: flex; align-items: center; gap: 12px; padding: 4px; cursor: pointer; }
.world-entry:hover { border-color: #fff; background: #000; }
.world-entry.selected { border: 2px solid #fff; background: #000; box-shadow: inset 0 0 10px rgba(255,255,255,0.1); }
.world-entry.empty { height: 80px; opacity: 0; pointer-events: none; }

.world-icon { width: 72px; height: 72px; border: 1px solid #aaa; flex-shrink: 0; }
.icon-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
.icon-placeholder { width: 100%; height: 100%; background: #555; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.8rem; }

.world-info { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 2px; }
.world-name { font-size: 1.5rem; color: #fff; text-shadow: 1px 1px 0 #333; line-height: 1.2; }
.world-meta { font-size: 1.1rem; color: #aaa; }
.world-mode { font-size: 1.1rem; color: #888; font-style: italic; }

/* 底部按鈕欄 */
.footer-bar { 
  height: 140px; width: 100%; z-index: 20; 
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px; 
  background-size: cover; background-position: bottom; box-shadow: 0 -10px 20px rgba(0,0,0,0.5); padding-bottom: 20px; 
}
.btn-row { display: flex; gap: 10px; width: 600px; justify-content: space-between; }

.mc-btn { background: #777; border: 2px solid #fff; border-bottom-color: #333; border-right-color: #333; color: #fff; padding: 6px 0; text-align: center; cursor: pointer; font-family: inherit; font-size: 1.2rem; flex: 1; text-shadow: 1px 1px 0 #333; }
.mc-btn:hover { background: #888; color: #ffffa0; }
.mc-btn:active { border-top-color: #333; border-left-color: #333; border-bottom-color: #fff; border-right-color: #fff; transform: translateY(2px); }
.mc-btn:disabled { color: #aaa; cursor: default; filter: brightness(0.7); transform: none; }

/* === 模態框通用 === */
.modal-overlay { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); }

/* 刪除確認 (Danger Mode) */
.danger-mode { background: rgba(200, 0, 0, 0.4); } 
.mc-modal-danger { width: 500px; background: rgba(0,0,0,0.8); border: 2px solid #f00; padding: 20px; text-align: center; color: #fff; display: flex; flex-direction: column; gap: 20px; }
.danger-title { font-size: 1.8rem; color: #fff; margin: 0; }
.danger-desc { color: #ffffa0; font-size: 1.2rem; }

/* 編輯彈窗 */
.mc-modal { width: 400px; background: #c6c6c6; border: 2px solid #fff; outline: 2px solid #000; padding: 20px; display: flex; flex-direction: column; gap: 15px; color: #000; }
.modal-title { font-size: 1.5rem; margin: 0; text-align: center; }
.input-group label { display: block; color: #444; margin-bottom: 5px; font-size: 1.1rem; }
.mc-input { width: 100%; background: #000; border: 2px solid #a0a0a0; border-bottom-color: #fff; border-right-color: #fff; color: #fff; padding: 8px; font-family: inherit; font-size: 1.2rem; outline: none; }
.modal-btns { display: flex; gap: 10px; justify-content: center; }

/* 加載畫面 (Loading Mode) */
.loading-mode { background-size: cover; z-index: 200; }
.loading-box { text-align: center; width: 400px; }
.loading-title { font-size: 1.8rem; color: #fff; text-shadow: 2px 2px 0 #000; margin-bottom: 20px; }
.mc-progress-bar { width: 100%; height: 20px; border: 2px solid #fff; background: #000; padding: 2px; }
.progress-fill { height: 100%; background: #00aa00; width: 0%; animation: fillProgress 2s linear forwards; }

@keyframes fillProgress { 0% { width: 0%; } 100% { width: 100%; } }

@media (max-width: 768px) {
  .world-list-wrapper, .btn-row, .mc-modal, .mc-modal-danger { width: 95%; }
  .btn-row { flex-wrap: wrap; }
  .mc-btn { min-width: 45%; }
}
</style>