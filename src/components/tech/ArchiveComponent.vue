<template>
  <div class="archive-component">
    <div class="card archive-card">
      <div class="card-header">
        <span class="card-title">Article Archive</span>
      </div>
      <div class="card-body">
        <div v-for="(yearGroup, year) in groupedArticles" :key="year" class="year-group">
          <div class="year-header">{{ year }}</div>
          <div v-for="(monthGroup, month) in yearGroup" :key="month" class="month-group">
            <div class="month-header">{{ getMonthName(parseInt(month) - 1) }}</div>
            <ul class="article-list">
              <li v-for="article in monthGroup" :key="article.id" class="article-item">
                <a href="#" class="article-link">
                  <span class="article-title">{{ article.title }}</span>
                  <span class="article-meta">{{ article.date }} · {{ article.wordCount }} words · {{ article.readTime }} min read</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 文章数据
const articles = [
  {
    id: 1,
    title: '🌟:-D简单自我介绍一下',
    date: '2025-09-08',
    wordCount: 308,
    readTime: 2,
    content: '一个在大学的海洋中挣扎求生的过度思考者，正在将屎山雕琢成艺术品的路上...'
  },
  {
    id: 2,
    title: '⚡ 优先级队列（堆！堆！堆！）',
    date: '2025-08-12',
    wordCount: 1681,
    readTime: 8,
    content: '本文将系统性地介绍优先级队列（Priority Queue）就是这样一个不讲武德的数据结构，它不遵循FIFO（先进先出），而是谁优先级高谁先出。'
  },
  {
    id: 3,
    title: '🌳二叉树从基础概念到应用实践',
    date: '2025-04-27',
    wordCount: 1362,
    readTime: 7,
    content: '本文将系统性地介绍二叉树的核心知识点，包括基本概念、性质、存储方式、遍历方法以及常见面试题解析。'
  },
  {
    id: 4,
    title: '🚀 从零开始搭建React项目',
    date: '2024-12-15',
    wordCount: 2100,
    readTime: 10,
    content: '详细介绍如何使用Vite从零搭建一个React项目，包括路由、状态管理、样式方案等。'
  },
  {
    id: 5,
    title: '🐍 Python装饰器的高级应用',
    date: '2024-11-20',
    wordCount: 1850,
    readTime: 9,
    content: '深入探讨Python装饰器的工作原理和高级应用场景，包括参数传递、嵌套装饰器等。'
  }
]

// 按年/月分组文章
const groupedArticles = computed(() => {
  const groups = {}
  articles.forEach(article => {
    const year = article.date.substring(0, 4)
    const month = article.date.substring(5, 7)
    if (!groups[year]) groups[year] = {}
    if (!groups[year][month]) groups[year][month] = []
    groups[year][month].push(article)
  })
  // 按年份降序排序
  return Object.fromEntries(
    Object.entries(groups).sort(([a], [b]) => b - a)
  )
})

// 获取月份名称
const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[monthIndex]
}
</script>

<style scoped>
.archive-component {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
  animation-delay: 0.2s;
}

.archive-card {
  background: rgba(5, 5, 5, 0.8);
  border: 1px solid rgba(0, 255, 200, 0.2);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.archive-card:hover {
  box-shadow: 0 0 15px rgba(0, 255, 200, 0.2);
}

.card-header {
  padding: 15px 20px;
  background: rgba(0, 255, 200, 0.05);
  border-bottom: 1px solid rgba(0, 255, 200, 0.1);
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #00ffc8;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.5px;
}

.card-body {
  padding: 20px;
}

.year-group {
  margin-bottom: 20px;
}

.year-header {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.5);
}

.month-group {
  margin-bottom: 15px;
}

.month-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: #00ffc8;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 3px solid #00ffc8;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-item {
  margin-bottom: 10px;
  padding-left: 20px;
}

.article-link {
  display: block;
  text-decoration: none;
  color: #e0e0e0;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  line-height: 1.4;
}

.article-link:hover {
  color: #00ffc8;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.6);
  transform: translateX(5px);
}

.article-title {
  display: block;
  margin-bottom: 3px;
}

.article-meta {
  display: block;
  font-size: 0.75rem;
  color: #888;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-body {
    padding: 15px;
  }
  
  .year-header {
    font-size: 1rem;
  }
  
  .month-header {
    font-size: 0.85rem;
  }
  
  .article-link {
    font-size: 0.8rem;
  }
  
  .article-meta {
    font-size: 0.7rem;
  }
}
</style>