<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const isLoading = ref(true)
const baseUrl = import.meta.env.BASE_URL || '/'

// 模拟文章数据 (模拟存档数据)
const articles = ref([
  {
    id: 1,
    title: 'Vue 3.0 深度解析', // 世界名
    fileName: 'Vue_Deep_Dive', // 文件夹名
    date: '2026-01-14',
    modeKey: 'mode_survival', // 对应生存模式
    cheats: true,
    icon: baseUrl + '/images/homeBG.png', // 模拟世界快照
    version: '1.20.1'
  },
  {
    id: 2,
    title: 'CSS 像素画绘制指南',
    fileName: 'Pixel_Art_Tutorial',
    date: '2026-01-10',
    modeKey: 'mode_creative', // 对应创造模式
    cheats: false,
    icon: baseUrl + '/images/aboutBG.png',
    version: '1.19.4'
  },
  {
    id: 3,
    title: 'Spigot 服务器搭建',
    fileName: 'Server_Log_Backup',
    date: '2025-12-25',
    modeKey: 'mode_hardcore', // 对应极限模式
    cheats: false,
    icon: null, // 无图
    version: '1.7.10'
  }
])

const selectedId = ref(null)

onMounted(() => {
  // 模拟读取硬盘存档
  setTimeout(() => { isLoading.value = false }, 500)
})

const selectWorld = (id) => {
  selectedId.value = id
  new Audio(baseUrl + 'sounds/click.ogg').play().catch(()=>{})
}

const playWorld = () => {
  if (!selectedId.value) return
  new Audio(baseUrl + 'sounds/click.ogg').play().catch(()=>{})
  // 跳转详情页
  router.push(`/mc/articles/${selectedId.value}`)
}

const goBack = () => {
  new Audio(baseUrl + 'sounds/click.ogg').play().catch(()=>{})
  router.push('/mc')
}

// 格式化副标题: "文件夹名 (日期)"
const getSubText = (article) => {
  return `${article.fileName} (${article.date})`
}

// 格式化第三行: "模式, 版本"
const getModeText = (article) => {
  let text = t(`mc.articles.${article.modeKey}`)
  if (article.cheats) text += `, ${t('mc.articles.cheats')}`
  return text
}
</script>

<template>
  <div class="mc-singleplayer-page">
    <div class="bg-overlay"></div>

    <div class="header-bar">
      <h1 class="page-title">{{ t('mc.articles.title') }}</h1>
    </div>

    <div class="list-container">
      <div class="world-list-wrapper">
        
        <div v-if="isLoading" class="loading-text">
          {{ t('mc.loading') }}
        </div>

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
              
              <div class="world-mode">
                {{ getModeText(world) }} - {{ world.version }}
              </div>
            </div>
          </div>
          
          <div class="world-entry empty" v-for="n in 3" :key="'empty'+n"></div>
        </template>
      </div>
    </div>

    <div class="footer-bar">
      <div class="btn-row top-row">
        <button class="mc-btn lg" :disabled="!selectedId" @click="playWorld">
          {{ t('mc.articles.btn_play') }}
        </button>
        <button class="mc-btn lg" disabled>
          {{ t('mc.articles.btn_create') }}
        </button>
      </div>
      
      <div class="btn-row bottom-row">
        <button class="mc-btn">{{ t('mc.articles.btn_edit') }}</button>
        <button class="mc-btn">{{ t('mc.articles.btn_delete') }}</button>
        <button class="mc-btn">{{ t('mc.articles.btn_recreate') }}</button>
        <button class="mc-btn" @click="goBack">{{ t('mc.articles.btn_cancel') }}</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.mc-singleplayer-page {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  overflow: hidden;
  background-image: url('/images/homeBG.png'); 
  background-size: cover; background-position: center;
  font-family: 'VT323', monospace; color: #fff;
  display: flex; flex-direction: column;
}

.bg-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 0; }

/* 头部 */
.header-bar {
  height: 60px; flex-shrink: 0; z-index: 10;
  display: flex; align-items: center; justify-content: center;
  margin-top: 20px;
}
.page-title { font-size: 2rem; color: #fff; text-shadow: 2px 2px 0 #333; margin: 0; }

/* 列表容器 */
.list-container {
  flex: 1; width: 100%; position: relative; z-index: 10;
  display: flex; justify-content: center;
  overflow-y: auto;
  padding: 10px 0;
  background: rgba(0,0,0,0.4);
  box-shadow: inset 0 0 20px #000;
}

/* 隐藏滚动条 */
.list-container::-webkit-scrollbar { width: 10px; background: #000; border-left: 2px solid #888; }
.list-container::-webkit-scrollbar-thumb { background: #ccc; border: 2px solid #fff; border-right-color: #555; border-bottom-color: #555; }

.world-list-wrapper { width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 4px; padding: 0 10px; }

.loading-text { text-align: center; margin-top: 50px; font-size: 1.5rem; color: #aaa; }

/* 单个存档条目 */
.world-entry {
  height: 80px; /* 单人模式列表稍微矮一点 */
  background: rgba(0,0,0,0.5);
  border: 2px solid transparent;
  display: flex; align-items: center; gap: 12px;
  padding: 4px; cursor: pointer;
  position: relative;
}
.world-entry:hover { border-color: #fff; background: #000; }
.world-entry.selected { border: 2px solid #fff; background: #000; box-shadow: inset 0 0 10px rgba(255,255,255,0.1); }
.world-entry.empty { height: 80px; opacity: 0; pointer-events: none; }

/* 图标 (正方形快照) */
.world-icon { width: 72px; height: 72px; border: 1px solid #aaa; flex-shrink: 0; }
.icon-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
.icon-placeholder { width: 100%; height: 100%; background: #555; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.8rem; }

/* 信息 */
.world-info { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 2px; }

.world-name { font-size: 1.5rem; color: #fff; text-shadow: 1px 1px 0 #333; line-height: 1.2; }
.world-meta { font-size: 1.1rem; color: #aaa; }
.world-mode { font-size: 1.1rem; color: #888; font-style: italic; }

/* 底部按钮栏 */
.footer-bar {
  height: 140px; width: 100%; z-index: 20;
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px;
  background: url('/images/homeBG.png'); 
  background-size: cover; background-position: bottom;
  box-shadow: 0 -10px 20px rgba(0,0,0,0.5);
  padding-bottom: 20px;
}

.btn-row { display: flex; gap: 10px; width: 600px; justify-content: space-between; }

.mc-btn {
  background: #777; border: 2px solid #fff; border-bottom-color: #333; border-right-color: #333;
  color: #fff; padding: 6px 0; text-align: center; cursor: pointer; font-family: inherit; font-size: 1.2rem;
  flex: 1; /* 均分宽度 */
  text-shadow: 1px 1px 0 #333;
}
.mc-btn:hover { background: #888; color: #ffffa0; }
.mc-btn:active { border-top-color: #333; border-left-color: #333; border-bottom-color: #fff; border-right-color: #fff; transform: translateY(2px); }
.mc-btn:disabled { color: #aaa; cursor: default; filter: brightness(0.7); transform: none; }

@media (max-width: 768px) {
  .world-list-wrapper { width: 95%; }
  .btn-row { width: 90%; flex-wrap: wrap; }
  .mc-btn { min-width: 45%; }
}
</style>