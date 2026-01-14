import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    mc: {
      // 导航
      back: 'Return to Hub',
      
      // About Page
      status: 'STATUS',
      equipment: 'EQUIPMENT',
      skills: 'SKILL TREE',
      
      // Article Page
      quest_board: 'Quest Board (Articles)',
      quest_reward: 'Reward: Knowledge',
      read_more: 'Accept Quest',
      published: 'Published',
      
      // 之前的数据...
      role: 'Role',
      skill: 'Skill',
      stability: 'Stability',
      speed: 'Speed',
      location: 'Suzhou, China',
      wechat: 'WeChat',
      admin: '[Admin]'
    },
    // 保持之前的 armor 和 items 翻译不变...
    armor: {
      helmet_name: 'Diamond Helmet',
      helmet_desc: 'Tech Lead',
      chest_name: 'Elytra',
      chest_desc: 'Architecture',
      legs_name: 'Netherite Leggings',
      legs_desc: '99.9%',
      boots_name: 'Golden Boots',
      boots_desc: 'Agile Dev'
    },
    items: {
      vue: 'Core Weapon',
      react: 'Dual Wield',
      ts: 'Type Safety',
      vite: 'Speed Potion',
      node: 'Redstone Power',
      docker: 'Shulker Box',
      figma: 'Pixel Art',
      git: 'Time Travel',
      coffee: 'Restores Energy'
    }
  },
  zh: {
    mc: {
      // 导航
      back: '返回大厅',
      
      // About Page
      status: '玩家状态',
      equipment: '当前装备',
      skills: '技能树',
      
      // Article Page
      quest_board: '冒险者公会 (文章列表)',
      quest_reward: '任务奖励: 知识 +1',
      read_more: '接受任务',
      published: '发布于',
      
      // 之前的数据...
      role: '职业',
      skill: '技能',
      stability: '稳定性',
      speed: '敏捷度',
      location: '江苏 苏州',
      wechat: '微信号',
      admin: '[管理员]'
    },
    // 保持 armor 和 items 不变...
    armor: {
      helmet_name: '钻石头盔',
      helmet_desc: '技术负责人 (Tech Lead)',
      chest_name: '鞘翅',
      chest_desc: '架构设计 (Architecture)',
      legs_name: '下界合金护腿',
      legs_desc: '系统稳定性 99.9%',
      boots_name: '金靴子',
      boots_desc: '敏捷开发 (Agile)'
    },
    items: {
      vue: '核心武器 | 熟练度 100%',
      react: '双持技能 | 熟练度 80%',
      ts: '类型安全附魔',
      vite: '极速构建药水',
      node: '服务端红石电路',
      docker: '容器化潜影盒',
      figma: '像素画板',
      git: '时光回溯指南针',
      coffee: '回复 20 点精力值'
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