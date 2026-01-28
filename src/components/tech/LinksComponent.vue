<template>
  <div class="links-component">
    <div v-for="category in linkCategories" :key="category.id" class="category-section">
      <div class="category-header">
        <h3 class="category-title">{{ category.name }}</h3>
        <p class="category-description">{{ category.description }}</p>
      </div>
      <div class="link-grid">
        <div 
          v-for="link in category.links" 
          :key="link.id"
          class="link-card"
          :style="{ borderColor: link.color }"
        >
          <a :href="link.url" :title="link.description" class="link-content" target="_blank" rel="noopener noreferrer">
            <span class="link-icon">{{ link.icon }}</span>
            <div class="link-info">
              <span class="link-name">{{ link.name }}</span>
              <span class="link-description">{{ link.description }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 链接分类数据
const linkCategories = [
  {
    id: 'friends',
    name: 'Friends',
    description: '我的朋友们',
    links: [
      {
        id: 1,
        name: 'Overthinker',
        url: 'https://www.overthinker13.cn/',
        description: '过度思考者的博客',
        icon: '🌐',
        color: '#00ffc8'
      },
      {
        id: 2,
        name: 'Example Blog',
        url: 'https://example.com/',
        description: '示例博客网站',
        icon: '📝',
        color: '#ff6b6b'
      },
      {
        id: 3,
        name: 'Tech Hub',
        url: 'https://techhub.com/',
        description: '技术爱好者聚集地',
        icon: '💻',
        color: '#4ecdc4'
      },
      {
        id: 4,
        name: 'Design Studio',
        url: 'https://designstudio.com/',
        description: '创意设计工作室',
        icon: '🎨',
        color: '#f9ca24'
      }
    ]
  },
  {
    id: 'resources',
    name: 'Resources',
    description: '开发资源',
    links: [
      {
        id: 5,
        name: 'GitHub',
        url: 'https://github.com/',
        description: '代码托管平台',
        icon: '🐱',
        color: '#333333'
      },
      {
        id: 6,
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/',
        description: '程序员问答社区',
        icon: '❓',
        color: '#f48024'
      },
      {
        id: 7,
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        description: 'Web 开发文档',
        icon: '📚',
        color: '#006699'
      },
      {
        id: 8,
        name: 'Vue.js',
        url: 'https://vuejs.org/',
        description: '渐进式 JavaScript 框架',
        icon: '💚',
        color: '#4fc08d'
      }
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    description: '开发工具',
    links: [
      {
        id: 9,
        name: 'Figma',
        url: 'https://www.figma.com/',
        description: '协作设计工具',
        icon: '🎨',
        color: '#f24e1e'
      },
      {
        id: 10,
        name: 'VS Code',
        url: 'https://code.visualstudio.com/',
        description: '代码编辑器',
        icon: '💻',
        color: '#007acc'
      },
      {
        id: 11,
        name: 'Postman',
        url: 'https://www.postman.com/',
        description: 'API 测试工具',
        icon: '🌐',
        color: '#ff6c37'
      },
      {
        id: 12,
        name: 'Notion',
        url: 'https://www.notion.so/',
        description: '协作笔记工具',
        icon: '📝',
        color: '#2e2e2e'
      }
    ]
  }
]
</script>

<style scoped>
.links-component {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
  animation-delay: 0.2s;
}

.category-section {
  margin-bottom: 30px;
}

.category-header {
  margin-bottom: 15px;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 5px 0;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.5px;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.5);
}

.category-description {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.link-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
}

.link-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  text-decoration: none;
  color: #e0e0e0;
  transition: all 0.3s ease;
}

.link-content:hover {
  background: rgba(0, 255, 200, 0.05);
}

.link-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.link-info {
  flex: 1;
  min-width: 0;
}

.link-name {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 3px;
  color: #ffffff;
}

.link-description {
  display: block;
  font-size: 0.8rem;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .link-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }
  
  .link-content {
    padding: 12px;
    gap: 10px;
  }
  
  .link-icon {
    font-size: 1.2rem;
  }
  
  .link-name {
    font-size: 0.9rem;
  }
  
  .link-description {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>