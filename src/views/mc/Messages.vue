<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const isLoading = ref(true)
const showAddModal = ref(false)
const baseUrl = import.meta.env.BASE_URL

// === 状态控制 ===
// 0: 列表, 1: 连接中, 2: 游戏中(查看留言)
const viewState = ref(0) 
const connectionStatus = ref('') // 连接过程文案

// 模拟留言数据
const messages = ref([
  {
    id: 1,
    author: 'Creeper_AwMan',
    content: '§a[置顶] §f这就是传说中的 Vue 博客吗？\n§e好强！SSSSsssss.... BOOM!\n\n(这是一条很长的留言测试)\n其实我想说，这个博客的交互做得太棒了，完全还原了 MC 的感觉。',
    reply: '谢谢支持！小心不要炸了我的服务器 XD', // 管理员回复
    ping: 5,
    maxPlayers: 100,
    onlinePlayers: 99,
    icon: `${baseUrl}images/pickaxe.png`
  },
  {
    id: 2,
    author: 'Steve',
    content: '§b[生存] §f求一个红石大神的联系方式！\n我想做一个全自动收瓜机。',
    ping: 150,
    maxPlayers: 20,
    onlinePlayers: 3,
    icon: `${baseUrl}images/sword.png`
  }
])

const selectedId = ref(null)
const currentMessage = ref(null) // 当前查看的留言
const form = ref({ nickname: '', content: '' })

onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 1000)
})

const playSound = (name) => {
  new Audio(`${baseUrl}sounds/${name}`).play().catch(() => {})
}

// === 列表交互 ===
const selectServer = (id) => {
  selectedId.value = id
  playSound('click.mp3')
}

// === 核心逻辑：加入服务器 (查看详情) ===
const joinServer = () => {
  if (!selectedId.value) return
  
  const target = messages.value.find(m => m.id === selectedId.value)
  if (!target) return

  currentMessage.value = target
  playSound('click.mp3')
  
  // 1. 进入连接状态
  viewState.value = 1
  connectionStatus.value = "Connecting to the server..."
  
  // 模拟连接过程
  setTimeout(() => { connectionStatus.value = "Encrypting..." }, 800)
  setTimeout(() => { connectionStatus.value = "Logging in..." }, 1600)
  setTimeout(() => { connectionStatus.value = "Loading terrain..." }, 2400)
  
  // 2. 连接成功，进入游戏视角
  setTimeout(() => {
    viewState.value = 2
    // 播放进入游戏的音效 (如经验球声)
    playSound('achievement.ogg') 
  }, 3000)
}

// === 退出服务器 ===
const disconnect = () => {
  playSound('click.mp3')
  viewState.value = 0
  currentMessage.value = null
}

const openAddModal = () => {
  playSound('click.mp3')
  showAddModal.value = true
}

const closeAddModal = () => {
  playSound('click.mp3')
  showAddModal.value = false
}

const submitMessage = () => {
  if(!form.value.nickname || !form.value.content) return
  
  playSound('achievement.ogg')
  
  messages.value.unshift({
    id: Date.now(),
    author: form.value.nickname,
    content: `§f${form.value.content}`,
    ping: Math.floor(Math.random() * 50),
    maxPlayers: 60,
    onlinePlayers: 1,
    icon: null 
  })
  
  form.value = { nickname: '', content: '' }
  showAddModal.value = false
}

const goBack = () => {
  playSound('click.mp3')
  router.push('/mc')
}

// 工具函数
const getSignalClass = (ping) => {
  if (ping < 50) return 'signal-5'
  if (ping < 150) return 'signal-4'
  if (ping < 300) return 'signal-3'
  return 'signal-2'
}

const parseMotd = (text) => {
  if (!text) return ''
  // 列表只显示前两行，多余的截断
  const lines = text.split('\n').slice(0, 2).join('<br>')
  return formatColor(lines)
}

const formatColor = (text) => {
  if (!text) return ''
  return text
    .replace(/§a/g, '<span style="color: #55ff55">')
    .replace(/§b/g, '<span style="color: #55ffff">')
    .replace(/§c/g, '<span style="color: #ff5555">')
    .replace(/§e/g, '<span style="color: #ffff55">')
    .replace(/§f/g, '<span style="color: #ffffff">')
    .replace(/§7/g, '<span style="color: #aaaaaa">')
    .replace(/\n/g, '<br>')
}
</script>

<template>
  <div class="mc-multiplayer-page" :style="{ backgroundImage: `url(${baseUrl}images/homeBG.png)` }">
    <div class="bg-overlay"></div>

    <template v-if="viewState === 0">
      <div class="header-bar">
        <h1 class="page-title">{{ t('mc.messages.title') }}</h1>
      </div>

      <div class="list-container">
        <div class="server-list-wrapper">
          <div v-if="isLoading" class="scanning-text">
            {{ t('mc.messages.subtitle') }}
          </div>

          <template v-else>
            <div 
              v-for="msg in messages" 
              :key="msg.id"
              class="server-entry"
              :class="{ 'selected': selectedId === msg.id }"
              @click="selectServer(msg.id)"
              @dblclick="joinServer"
            >
              <div class="server-icon">
                <img v-if="msg.icon" :src="msg.icon" class="icon-img" />
                <div v-else class="icon-placeholder">?</div>
              </div>

              <div class="server-info">
                <div class="row-top">
                  <span class="server-name">{{ msg.author }}</span>
                  <div class="connection-info">
                    <span class="player-count">{{ msg.onlinePlayers }}/{{ msg.maxPlayers }}</span>
                    <div class="signal-bars" :class="getSignalClass(msg.ping)">
                      <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                    </div>
                  </div>
                </div>
                
                <div class="row-bottom">
                  <div class="motd-text" v-html="parseMotd(msg.content)"></div>
                </div>
              </div>
            </div>
            
            <div class="server-entry empty" v-for="n in 3" :key="'e'+n"></div>
          </template>
        </div>
      </div>

      <div class="footer-bar" :style="{ backgroundImage: `url(${baseUrl}images/homeBG.png)` }">
        <div class="btn-row">
          <button class="mc-btn lg" :disabled="!selectedId" @click="joinServer">
            {{ t('mc.messages.btn_connect') }}
          </button>
          
          <div class="flex-gap">
            <button class="mc-btn" @click="openAddModal">{{ t('mc.messages.btn_add') }}</button>
            <button class="mc-btn">{{ t('mc.messages.btn_edit') }}</button>
          </div>
          
          <div class="flex-gap">
            <button class="mc-btn">{{ t('mc.messages.btn_delete') }}</button>
            <button class="mc-btn" @click="goBack">{{ t('mc.messages.btn_cancel') }}</button>
          </div>
        </div>
      </div>
    </template>

    <template v-if="viewState === 1">
      <div class="connecting-screen">
        <div class="connect-box">
          <div class="connect-title">{{ connectionStatus }}</div>
          <button class="mc-btn cancel-connect" @click="viewState = 0">{{ t('mc.messages.btn_cancel') }}</button>
        </div>
      </div>
    </template>

    <template v-if="viewState === 2 && currentMessage">
      <div class="in-game-screen">
        <div class="chat-container">
          <div class="chat-box">
            <div class="chat-line system">
              <span class="yellow">{{ currentMessage.author }} joined the game</span>
            </div>
            
            <div class="chat-line message">
              <span class="player-name">&lt;{{ currentMessage.author }}&gt;</span>
              <span class="msg-content" v-html="formatColor(currentMessage.content)"></span>
            </div>

            <div class="chat-line reply" v-if="currentMessage.reply">
              <span class="player-name admin">&lt;biscuit&gt;</span>
              <span class="msg-content">{{ currentMessage.reply }}</span>
            </div>
          </div>

          <div class="chat-input-bar">
            <span>> Press ESC to disconnect</span>
            <span class="cursor">_</span>
          </div>
        </div>

        <div class="game-menu-btn">
          <button class="mc-btn" @click="disconnect">Disconnect</button>
        </div>
      </div>
    </template>

    <div v-if="showAddModal" class="modal-overlay">
      <div class="mc-modal">
        <h2 class="modal-title">{{ t('mc.messages.dialog_title') }}</h2>
        <div class="form-group">
          <label>{{ t('mc.messages.label_name') }}</label>
          <input type="text" v-model="form.nickname" class="mc-input" autofocus />
        </div>
        <div class="form-group">
          <label>{{ t('mc.messages.label_ip') }}</label>
          <textarea v-model="form.content" class="mc-input textarea" rows="3"></textarea>
        </div>
        <div class="modal-buttons">
          <button class="mc-btn" @click="submitMessage">{{ t('mc.messages.btn_done') }}</button>
          <button class="mc-btn" @click="closeAddModal">{{ t('mc.messages.btn_cancel') }}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.mc-multiplayer-page {
  position: fixed; inset: 0;
  background-size: cover; background-position: center;
  font-family: 'VT323', monospace; color: #fff;
  display: flex; flex-direction: column;
}

.bg-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 0; }

/* === 列表样式 (复用) === */
.header-bar { height: 60px; display: flex; align-items: center; justify-content: center; z-index: 10; margin-top: 10px; }
.page-title { font-size: 2rem; text-shadow: 2px 2px 0 #333; margin: 0; }

.list-container { flex: 1; width: 100%; position: relative; z-index: 10; display: flex; justify-content: center; overflow-y: auto; padding: 10px 0; background: rgba(0,0,0,0.4); box-shadow: inset 0 0 20px #000; }
.list-container::-webkit-scrollbar { width: 10px; background: #000; border-left: 2px solid #888; }
.list-container::-webkit-scrollbar-thumb { background: #ccc; border: 2px solid #fff; border-right-color: #555; border-bottom-color: #555; }

.server-list-wrapper { width: 100%; max-width: 800px; padding: 0 10px; display: flex; flex-direction: column; gap: 4px; }
.scanning-text { text-align: center; color: #aaa; margin-top: 50px; font-size: 1.4rem; animation: pulse 1s infinite; }

.server-entry { height: 96px; background: rgba(0,0,0,0.5); border: 2px solid transparent; display: flex; align-items: center; gap: 12px; padding: 8px; cursor: pointer; }
.server-entry:hover { border-color: #888; background: #000; }
.server-entry.selected { border: 2px solid #fff; background: #000; z-index: 2; }
.server-entry.empty { height: 96px; opacity: 0; pointer-events: none; }

.server-icon { width: 64px; height: 64px; border: 1px solid #aaa; flex-shrink: 0; }
.icon-img { width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated; }
.icon-placeholder { width: 100%; height: 100%; background: #333; display: flex; align-items: center; justify-content: center; color: #555; font-size: 2rem; }

.server-info { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
.row-top { display: flex; justify-content: space-between; align-items: flex-start; }
.server-name { font-size: 1.4rem; color: #fff; text-shadow: 1px 1px 0 #333; }
.connection-info { display: flex; align-items: center; gap: 8px; }
.player-count { color: #aaa; font-size: 1rem; }

.signal-bars { display: flex; align-items: flex-end; gap: 2px; height: 14px; width: 20px; }
.bar { width: 3px; background: #555; height: 100%; }
.signal-5 .bar { background: #00aa00; }
.signal-4 .bar:nth-child(5) { background: #555; } .signal-4 .bar:nth-child(-n+4) { background: #00aa00; }
.signal-3 .bar:nth-child(-n+3) { background: #ffff55; }
.signal-2 .bar:nth-child(-n+2) { background: #ffaa00; }

.motd-text { color: #888; font-size: 1.1rem; line-height: 1.2; overflow: hidden; }

.footer-bar { height: 140px; width: 100%; z-index: 20; display: flex; justify-content: center; align-items: center; background-size: cover; background-position: bottom; box-shadow: 0 -10px 20px rgba(0,0,0,0.5); }
.btn-row { display: flex; flex-direction: column; gap: 10px; width: 600px; }
.flex-gap { display: flex; justify-content: space-between; gap: 10px; }

.mc-btn { background: #777; border: 2px solid #fff; border-bottom-color: #333; border-right-color: #333; color: #fff; padding: 6px 0; width: 100%; cursor: pointer; font-family: inherit; font-size: 1.2rem; text-shadow: 1px 1px 0 #333; }
.mc-btn:hover { background: #888; color: #ffffa0; }
.mc-btn:active { border-color: #333 #333 #fff #fff; transform: translateY(2px); }
.mc-btn:disabled { color: #aaa; cursor: default; filter: brightness(0.7); transform: none; }

/* === 场景 2: 连接中 === */
.connecting-screen { position: fixed; inset: 0; background: url('/images/homeBG.png') center/cover; z-index: 50; display: flex; align-items: center; justify-content: center; }
.connect-box { text-align: center; width: 400px; }
.connect-title { font-size: 1.5rem; color: #fff; text-shadow: 2px 2px 0 #000; margin-bottom: 20px; }
.cancel-connect { width: 200px; margin: 0 auto; }

/* === 场景 3: 游戏内聊天 (详情页) === */
.in-game-screen { position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,0.3); /* 变亮一点，模拟进入世界 */ }
.chat-container { position: absolute; bottom: 80px; left: 20px; width: 600px; max-width: 90%; }
.chat-box { background: rgba(0,0,0,0.5); padding: 10px; border-radius: 4px; display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px; min-height: 200px; justify-content: flex-end; }

.chat-line { font-size: 1.3rem; line-height: 1.4; text-shadow: 1px 1px 0 #000; animation: fadeIn 0.3s; }
.chat-line.system { color: #ffff55; font-style: italic; }
.chat-line.message { color: #fff; }
.chat-line.reply { margin-top: 10px; padding-left: 20px; border-left: 2px solid #aaa; }

.player-name { color: #fff; margin-right: 5px; }
.player-name.admin { color: #ff5555; } /* Admin Red */
.yellow { color: #ffff55; }

.chat-input-bar { background: rgba(0,0,0,0.7); padding: 10px; border: 1px solid #aaa; color: #fff; font-size: 1.2rem; }
.cursor { animation: blink 1s infinite; }

.game-menu-btn { position: absolute; top: 20px; right: 20px; width: 150px; }

/* 弹窗 */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 100; display: flex; align-items: center; justify-content: center; }
.mc-modal { width: 500px; background: #c6c6c6; border: 2px solid #fff; outline: 2px solid #000; padding: 20px; display: flex; flex-direction: column; gap: 15px; color: #000; }
.modal-title { font-size: 1.5rem; margin: 0; text-align: center; }
.form-group label { display: block; color: #444; margin-bottom: 5px; font-size: 1.1rem; }
.mc-input { width: 100%; background: #000; border: 2px solid #a0a0a0; border-bottom-color: #fff; border-right-color: #fff; color: #fff; padding: 8px; font-family: inherit; font-size: 1.2rem; }
.mc-input.textarea { resize: vertical; min-height: 80px; }
.modal-buttons { display: flex; gap: 10px; margin-top: 10px; }

@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .server-list-wrapper, .btn-row, .mc-modal { width: 95%; }
  .chat-container { width: 95%; left: 2.5%; bottom: 60px; }
  .game-menu-btn { top: 10px; right: 10px; width: 100px; }
}
</style>