<script setup>
import CyberCard from './CyberCard.vue'
</script>

<template>
  <div class="left-sidebar">
    
    <CyberCard class="mb-18">
      <div class="book-cover">
        <span class="icon">📖</span>
      </div>
      <h3 class="name">Overthinker</h3>
      <p class="quote">"无所谓，跳探戈不像人生，一步跳错了，继续跳就行了"</p>
      <div class="social-row">
        <button class="icon-btn">B</button>
        <button class="icon-btn">G</button>
        <button class="icon-btn">✉</button>
      </div>
    </CyberCard>

    <CyberCard class="mb-18">
      <h4 class="title-bar">📣 公告</h4>
      <p class="text-content">欢迎来到我的赛博空间！这里记录我的开发日志与生活。</p>
      <button class="more-btn">了解更多</button>
    </CyberCard>

    <CyberCard>
      <h4 class="title-bar">🏷️ 分类</h4>
      <ul class="list">
        <li><span>JavaSE</span> <span class="badge">12</span></li>
        <li><span>数据结构</span> <span class="badge">8</span></li>
        <li><span>生活随笔</span> <span class="badge">1</span></li>
      </ul>
    </CyberCard>

  </div>
</template>

<style scoped>
/* 全局字体强制等宽 */
* { font-family: Consolas, "JetBrains Mono", monospace; }

.left-sidebar { display: flex; flex-direction: column; gap: 18px; }
.mb-18 { margin-bottom: 18px; }

/* --- 模块通用标题 --- */
.title-bar { 
  font-size: 16px; 
  color: #00FFFF; 
  text-shadow: 0 0 4px #00FFFF, 0 0 8px rgba(0,255,255,0.3);
  border-bottom: 1px solid rgba(0,255,255,0.2);
  padding-bottom: 8px;
  margin: 0 0 10px 0;
  font-weight: bold;
}

/* --- 个人信息卡片 --- */
.book-cover { 
  width: 100%; aspect-ratio: 1; background: #000; 
  border: 1px solid rgba(0,255,255,0.3);
  border-radius: 4px; 
  display: flex; align-items: center; justify-content: center; font-size: 3rem;
  margin-bottom: 15px;
  box-shadow: 0 0 10px rgba(0,255,255,0.05);
}
.name { 
  color: #00FFFF; text-align: center; font-size: 1.2rem; margin-bottom: 8px; 
  text-shadow: 0 0 5px rgba(0,255,255,0.5);
}
.quote { 
  font-size: 0.85rem; color: #94a3b8; text-align: center; margin-bottom: 15px; line-height: 1.5; 
}
.social-row { display: flex; gap: 10px; justify-content: center; }
.icon-btn { 
  width: 32px; height: 32px; border-radius: 50%; 
  background: #000; border: 1px solid rgba(0,255,255,0.3); 
  color: #00FFFF; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.icon-btn:hover { 
  background: rgba(0,255,255,0.1); 
  border-color: #00FFFF; 
  box-shadow: 0 0 8px rgba(0,255,255,0.4);
}

/* --- 文本内容 --- */
.text-content { font-size: 0.9rem; color: #e5e5e5; margin-bottom: 15px; line-height: 1.6; }

/* --- 通用按钮 --- */
.more-btn { 
  width: 100%; padding: 8px; 
  background: #000; 
  border: 1px solid rgba(0,255,255,0.4); 
  border-radius: 4px;
  color: #00FFFF; font-size: 0.9rem; cursor: pointer; transition: 0.2s;
  font-family: inherit;
}
.more-btn:hover { 
  background: rgba(0,255,255,0.1); 
  border-color: #00FFFF; 
  box-shadow: 0 0 5px rgba(0,255,255,0.2);
}

/* --- 列表与标签 --- */
.list { list-style: none; padding: 0; margin: 0; }
.list li { 
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 5px; 
  border-bottom: 1px solid rgba(0,255,255,0.1); 
  font-size: 0.9rem; color: #e5e5e5;
  transition: color 0.2s;
  cursor: pointer;
}
.list li:last-child { border-bottom: none; }
.list li:hover { color: #00FFFF; }
.list li:hover span:first-child { border-left: 2px solid #00FFFF; padding-left: 6px; margin-left: -8px; transition: all 0.2s; }

.badge { 
  background: #000; 
  border: 1px solid rgba(0,255,255,0.3);
  padding: 2px 8px; border-radius: 4px; 
  font-size: 0.75rem; color: #00FFFF; 
  text-shadow: 0 0 2px #00FFFF;
}
</style>