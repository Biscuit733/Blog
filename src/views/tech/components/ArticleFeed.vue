<script setup>
import CyberCard from './CyberCard.vue'

const articles = [
  { id: 1, title: '★ :-D 简单自我介绍一下', date: '2025-09-08', tag: '生活随笔', desc: '一个在大学的海洋中挣扎求生的过度思考者，正在将屎山雕琢成艺术品的路上...' },
  { id: 2, title: '基于Websocket制作的网页聊天室', date: '2025-12-15', tag: 'Spring Web', desc: '一个基于Java websocket开发的网页聊天室，支持多人在线即时通讯...' },
  { id: 3, title: '七大排序算法奇幻之旅', date: '2025-08-22', tag: '数据结构', desc: '排序算法的使用指南，包含冒泡、快排、归并等经典算法图解...' }
]
</script>

<template>
  <div class="feed-col">
    
    <CyberCard class="mb-20 msg-board">
      <div class="msg-content">
        <h3 class="title-bar">📌 Message Board</h3>
        <div class="meta">
          <span>📅 2025-09-10</span>
          <span class="tag"># 留言板</span>
        </div>
        <p class="msg-text">快来! ヾ(≧▽≦*)o <br>在这里留下你的足迹吧...</p>
      </div>
      <div class="msg-bg-text">BOARD</div>
    </CyberCard>

    <CyberCard v-for="post in articles" :key="post.id" class="mb-20 article-card">
      <div class="info">
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-meta">
          <span class="date">📅 {{ post.date }}</span>
          <span class="tag"># {{ post.tag }}</span>
        </div>
        <p class="desc">{{ post.desc }}</p>
      </div>
      <div class="thumb">
        <div class="img-box">IMG</div>
      </div>
    </CyberCard>

  </div>
</template>

<style scoped>
* { font-family: Consolas, "JetBrains Mono", monospace; }

.feed-col { display: flex; flex-direction: column; gap: 20px; }
.mb-20 { margin-bottom: 20px; }

/* 通用标题 */
.title-bar { 
  font-size: 18px; color: #00FFFF; 
  text-shadow: 0 0 4px #00FFFF;
  border-bottom: 1px solid rgba(0,255,255,0.2); padding-bottom: 10px; margin-bottom: 12px;
}

/* --- 留言板 --- */
.msg-board {
  position: relative;
  display: flex; justify-content: space-between; align-items: center;
  overflow: hidden;
}
.meta { font-size: 0.85rem; color: #94a3b8; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
.msg-text { color: #e5e5e5; font-size: 1rem; line-height: 1.6; }
.msg-bg-text { 
  position: absolute; right: 10px; bottom: -10px;
  font-size: 3.5rem; font-weight: 900; 
  color: transparent; 
  -webkit-text-stroke: 1px rgba(0,255,255,0.15);
  pointer-events: none;
}

/* --- 文章卡片 --- */
.article-card { display: flex; gap: 20px; align-items: flex-start; }
.info { flex: 1; }

.post-title { 
  font-size: 1.2rem; color: #00FFFF; margin: 0 0 10px 0; 
  text-shadow: 0 0 2px rgba(0,255,255,0.3);
  transition: all 0.2s; cursor: pointer;
}
.post-title:hover { text-shadow: 0 0 8px #00FFFF; }

.post-meta { font-size: 0.85rem; color: #94a3b8; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }

.tag { 
  background: #000; 
  border: 1px solid rgba(0,255,255,0.3);
  color: #00FFFF; 
  padding: 2px 8px; border-radius: 3px; font-size: 0.75rem;
}

.desc { font-size: 0.95rem; color: #e5e5e5; line-height: 1.6; }

.thumb { width: 120px; flex-shrink: 0; }
.img-box { 
  width: 100%; height: 85px; 
  background: #000; border-radius: 4px; 
  border: 1px solid rgba(0,255,255,0.2); 
  display: flex; align-items: center; justify-content: center; 
  color: #00FFFF; opacity: 0.5;
  transition: 0.3s;
}
.article-card:hover .img-box { border-color: #00FFFF; opacity: 1; box-shadow: 0 0 8px rgba(0,255,255,0.2); }
</style>