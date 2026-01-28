<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// import McCursor from './components/McCursor.vue' // 引入刚才写的组件
import McCursor from './components/mc/McCursor.vue'

const route = useRoute()

// 判断是否是 MC 风格页面
// 只要路由路径里包含 '/mc' 就认为是 MC 页面
const isMcPage = computed(() => {
  return route.path.startsWith('/mc')
})
</script>

<template>
  <McCursor v-if="isMcPage" />
  
  <router-view />
</template>

<style>
/* 全局样式控制
  利用刚才路由里的 body.className 切换逻辑 
*/

/* 1. 默认/入口页样式 */
body.default {
  margin: 0;
  background-color: #000;
  color: #fff;
}

/* 2. MC 像素世界样式 (Scoped 里的样式只能管组件内，全局字体得在这里定义) */
body.pixel {
  margin: 0;
  background-color: #1a1a1a;
  /* 只有在 /mc 页面，这个字体才会生效 */
  font-family: 'VT323', monospace; 
}

/* 3. 现代科技样式 */
body.modern {
  margin: 0;
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
}
</style>