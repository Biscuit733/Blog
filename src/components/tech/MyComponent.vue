<template>
  <div class="my-component">
    <div class="profile-section">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <div class="avatar-circle">
              <span class="avatar-text">B</span>
            </div>
          </div>
          <div class="profile-info">
            <h3 class="profile-name">Biscuit</h3>
            <p class="profile-title">Frontend Developer</p>
            <p class="profile-description">热爱技术，喜欢折腾，正在将屎山雕琢成艺术品的路上...</p>
          </div>
        </div>
        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">China</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Occupation:</span>
            <span class="detail-value">Software Engineer</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email:</span>
            <span class="detail-value">contact@example.com</span>
          </div>
        </div>
      </div>
    </div>

    <div class="skills-section">
      <div class="section-header">
        <h3 class="section-title">Skills</h3>
        <p class="section-description">我的技术栈</p>
      </div>
      <div class="skills-grid">
        <div 
          v-for="skill in skills" 
          :key="skill.name"
          class="skill-card"
        >
          <div class="skill-header">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-level">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar">
            <div 
              class="skill-progress"
              :style="{ width: skill.level + '%', backgroundColor: skill.color }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="hobbies-section">
      <div class="section-header">
        <h3 class="section-title">Hobbies</h3>
        <p class="section-description">我的兴趣爱好</p>
      </div>
      <div class="hobbies-grid">
        <div 
          v-for="hobby in hobbies" 
          :key="hobby.name"
          class="hobby-card"
        >
          <span class="hobby-icon">{{ hobby.icon }}</span>
          <span class="hobby-name">{{ hobby.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 技能数据
const skills = [
  { name: 'HTML5', level: 90, color: '#e34f26' },
  { name: 'CSS3', level: 85, color: '#1572b6' },
  { name: 'JavaScript', level: 80, color: '#f7df1e' },
  { name: 'Vue.js', level: 75, color: '#4fc08d' },
  { name: 'Python', level: 70, color: '#3776ab' },
  { name: 'UI/UX Design', level: 65, color: '#646cff' }
]

// 兴趣爱好
const hobbies = [
  { name: 'Gaming', icon: '🎮' },
  { name: 'Coding', icon: '💻' },
  { name: 'Reading', icon: '📚' },
  { name: 'Music', icon: '🎵' },
  { name: 'Movies', icon: '🎬' },
  { name: 'Travel', icon: '✈️' }
]
</script>

<style scoped>
.my-component {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
  animation-delay: 0.2s;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.2);
  transform: translateY(-5px);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: rgba(0, 255, 200, 0.05);
  border-bottom: 1px solid rgba(0, 255, 200, 0.1);
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffc8, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.5);
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 200, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(0, 255, 200, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 200, 0);
  }
}

.avatar-text {
  font-size: 2rem;
  font-weight: 900;
  color: #050505;
  font-family: 'Orbitron', sans-serif;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 5px 0;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 10px rgba(0, 255, 200, 0.6);
}

.profile-title {
  font-size: 1rem;
  color: #00ffc8;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.profile-description {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
  line-height: 1.4;
}

.profile-details {
  padding: 20px 25px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.1);
}

.detail-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.detail-label {
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
}

.detail-value {
  font-size: 0.85rem;
  color: #e0e0e0;
}

.skills-section {
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.skill-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 8px;
  padding: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.skill-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
  transform: translateY(-3px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.skill-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
}

.skill-level {
  font-size: 0.85rem;
  color: #00ffc8;
  font-weight: 600;
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: rgba(0, 255, 200, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 1.5s ease;
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
}

.hobbies-section {
  margin-bottom: 30px;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.hobby-card {
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

.hobby-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
  transform: translateY(-5px);
  background: rgba(0, 255, 200, 0.05);
}

.hobby-icon {
  font-size: 2rem;
}

.hobby-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .profile-avatar {
    margin-top: 10px;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .hobbies-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .skill-card {
    padding: 12px;
  }
  
  .hobby-card {
    padding: 15px;
  }
}
</style>