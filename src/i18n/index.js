import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    // 1. 通用部分
    common: {
      back: 'Return to Hub',
      admin: '[Admin]',
      location: 'Suzhou, China',
      wechat: 'WeChat',
      loading: 'Loading Terrain...'
    },
    // 2. 关于我页面 (独立命名空间)
    about: {
      stats_title: 'Statistics',
      adv_title: 'Advancements',
      mining_title: 'Skill Mining',
      gallery_title: 'Photo Gallery (Paintings)', // 新增照片墙标题
      
      // NPC 对话 (数组形式)
      npc_quotes: [
        "Haa... (Hello traveler)",
        "Hmm... (Nice code)",
        "Do you have any bugs to trade?",
        "Vue 3 is lighter than a feather.",
        "I used to be an adventurer like you."
      ],

      // 统计标签
      stat_code: 'Lines of Code',
      stat_bug: 'Bugs Fixed',
      stat_coffee: 'Coffee Consumed',
      stat_project: 'Projects Built',

      // 成就详情
      adv_edu_title: 'The Beginning',
      adv_edu_desc: 'Graduated from University',
      adv_job1_title: 'Iron Pickaxe',
      adv_job1_desc: 'First Internship',
      adv_job2_title: 'Diamond Hunter',
      adv_job2_desc: 'Promoted to Senior Dev',
      adv_goal_title: 'A Furious Cocktail',
      adv_goal_desc: 'Full Stack Mastery',
    },
    // 装备和物品保持不变 (可以归类到 common 或 items，这里暂存)
    items: {
      vue: 'Core Weapon',
      react: 'Dual Wield',
      ts: 'Type Safety',
      vite: 'Speed Potion',
      node: 'Redstone Power',
      docker: 'Shulker Box',
      figma: 'Pixel Art',
      git: 'Time Travel'
    }
  },
  zh: {
    common: {
      back: '返回大厅',
      admin: '[管理员]',
      location: '江苏 苏州',
      wechat: '微信号',
      loading: '正在生成地形...'
    },
    about: {
      stats_title: '统计信息',
      adv_title: '进度 (工作经历)',
      mining_title: '技能挖掘',
      gallery_title: '相册 (画廊)',
      
      // NPC 对话 (中文)
      npc_quotes: [
        "哈... (你好旅行者)",
        "恩... (代码写得不错)",
        "你有什么 Bug 要交易吗？",
        "Vue 3 比羽毛还轻...",
        "我以前和你一样也是个冒险家..."
      ],

      stat_code: '代码行数',
      stat_bug: '已修复 Bug',
      stat_coffee: '消耗咖啡',
      stat_project: '完成项目',

      adv_edu_title: '故事的开始',
      adv_edu_desc: '大学毕业',
      adv_job1_title: '铁镐时代',
      adv_job1_desc: '第一份实习工作',
      adv_job2_title: '钻石猎人',
      adv_job2_desc: '晋升高级开发',
      adv_goal_title: '狂乱的鸡尾酒',
      adv_goal_desc: '全栈大师成就',
    },
    items: {
      vue: '核心武器 | 熟练度 100%',
      react: '双持技能 | 熟练度 80%',
      ts: '类型安全附魔',
      vite: '极速构建药水',
      node: '服务端红石电路',
      docker: '容器化潜影盒',
      figma: '像素画板',
      git: '时光回溯指南针'
    }
  }
}

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

export default i18n