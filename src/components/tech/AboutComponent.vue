<template>
  <div class="about-component">
    <div class="about-section">
      <div class="about-card">
        <div class="about-header">
          <h3 class="about-title">About Me</h3>
        </div>
        <div class="about-body">
          <p class="about-text">
            你好！我是 Biscuit，一名热爱技术的前端开发工程师。我喜欢折腾各种新技术，探索前端的无限可能。
          </p>
          <p class="about-text">
            这个博客是我记录学习心得、技术分享的地方。我希望通过分享自己的知识和经验，帮助更多的开发者成长。
          </p>
          <p class="about-text">
            除了编程，我还喜欢玩游戏、听音乐、看电影，偶尔也会出去旅行，感受不同地方的文化。
          </p>
        </div>
      </div>
    </div>

    <div class="tech-stack-section">
      <div class="section-header">
        <h3 class="section-title">Tech Stack</h3>
        <p class="section-description">我使用的技术栈</p>
      </div>
      <div class="tech-grid">
        <div 
          v-for="tech in techStack" 
          :key="tech.name"
          class="tech-card"
        >
          <span class="tech-icon">{{ tech.icon }}</span>
          <span class="tech-name">{{ tech.name }}</span>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="section-header">
        <h3 class="section-title">Stats</h3>
        <p class="section-description">博客统计</p>
      </div>
      <div class="stats-grid">
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="stat-card"
        >
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="contact-section">
      <div class="section-header">
        <h3 class="section-title">Contact</h3>
        <p class="section-description">联系方式</p>
      </div>
      <div class="contact-grid">
        <div 
          v-for="contact in contactInfo" 
          :key="contact.type"
          class="contact-card"
        >
          <a :href="contact.url" :title="contact.title" class="contact-link" target="_blank" rel="noopener noreferrer">
            <span class="contact-icon">{{ contact.icon }}</span>
            <span class="contact-info">{{ contact.value }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 技术栈数据
const techStack = [
  { name: 'Vue 3', icon: '⚡' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Vite', icon: '🔥' },
  { name: 'Vue Router', icon: '🛣️' },
  { name: 'Vue I18n', icon: '🌍' }
]

// 统计信息
const stats = [
  { label: 'Articles', value: '42' },
  { label: 'Posts', value: '128' },
  { label: 'Followers', value: '256' },
  { label: 'Views', value: '10k+' }
]

// 联系信息
const contactInfo = [
  {
    type: 'email',
    icon: '📧',
    value: 'contact@example.com',
    url: 'mailto:contact@example.com',
    title: 'Send me an email'
  },
  {
    type: 'github',
    icon: '🐱',
    value: 'github.com/username',
    url: 'https://github.com/username',
    title: 'Visit my GitHub'
  },
  {
    type: 'twitter',
    icon: '🐦',
    value: 'twitter.com/username',
    url: 'https://twitter.com/username',
    title: 'Follow me on Twitter'
  }
]
</script>

<style scoped>
.about-component {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
  animation-delay: 0.2s;
}

.about-section {
  margin-bottom: 30px;
}

.about-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.about-card:hover {
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.2);
  transform: translateY(-5px);
}

.about-header {
  padding: 20px;
  background: rgba(0, 255, 200, 0.05);
  border-bottom: 1px solid rgba(0, 255, 200, 0.1);
}

.about-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.5);
}

.about-body {
  padding: 20px;
}

.about-text {
  font-size: 0.85rem;
  color: #e0e0e0;
  margin: 0 0 15px 0;
  line-height: 1.6;
}

.about-text:last-child {
  margin-bottom: 0;
}

.tech-stack-section {
  margin-bottom: 30px;
}

.section-header {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 5px 0;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.5);
}

.section-description {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
}

.tech-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tech-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
  transform: translateY(-5px);
  background: rgba(0, 255, 200, 0.05);
}

.tech-icon {
  font-size: 2rem;
}

.tech-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
}

.stats-section {
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.stat-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 8px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
  transform: translateY(-5px);
  background: rgba(0, 255, 200, 0.05);
}

.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: #00ffc8;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.6);
}

.stat-label {
  font-size: 0.85rem;
  color: #888;
  text-align: center;
}

.contact-section {
  margin-bottom: 30px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.contact-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
  transform: translateY(-5px);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  text-decoration: none;
  color: #e0e0e0;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: rgba(0, 255, 200, 0.05);
}

.contact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-info {
  font-size: 0.85rem;
  flex: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-card {
    padding: 15px;
  }
  
  .stat-card {
    padding: 20px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .contact-link {
    padding: 12px 15px;
  }
}
</style>