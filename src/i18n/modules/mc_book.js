// src/i18n/modules/mc_book.js
export default {
  zh: {
    by: "作者：",
    page: "页数",
    btn_done: "完成",
    btn_next: "下一页",
    btn_prev: "上一页",
    
    // 模拟文章内容 (后期接后端)
    demo_title: "Vue 3.0 深度解析",
    demo_author: "biscuit",
    demo_content_p1: "Vue 3 的 Composition API 是一次革命性的升级。它允许我们将逻辑关注点组织在一起，而不是被 Options API 强制拆分。\n\n在这本书中，我们将深入探讨响应式系统的重构...",
    demo_content_p2: "第二章：响应式原理\n\nVue 3 使用 Proxy 替代了 Object.defineProperty。这意味着我们可以直接监听数组索引的变化，以及对象属性的添加和删除。\n\n(翻页继续阅读...)"
  },
  en: {
    by: "by",
    page: "Page",
    btn_done: "Done",
    btn_next: "Next",
    btn_prev: "Prev",
    
    demo_title: "Vue 3.0 Deep Dive",
    demo_author: "biscuit",
    demo_content_p1: "The Composition API in Vue 3 is a revolutionary upgrade. It allows us to organize logical concerns together.\n\nIn this book, we will explore the refactoring of the reactivity system...",
    demo_content_p2: "Chapter 2: Reactivity\n\nVue 3 uses Proxy instead of Object.defineProperty. This means we can directly observe array index changes and property additions.\n\n(Turn page to continue...)"
  }
}