<template>
  <router-view></router-view>
</template>

<script setup>
// 这里不需要写什么逻辑了
</script>

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