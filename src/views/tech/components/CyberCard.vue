<template>
  <div class="cyber-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.cyber-card {
  position: relative;
  /* 全局模块背景：半透黑 */
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  /* 边框：荧光青半透明 */
  border: 1px solid rgba(0, 255, 255, 0.25);
  
  /* 圆角与内边距 */
  border-radius: 6px;
  padding: 12px 15px;
  
  /* 字体与颜色 */
  color: #e5e5e5;
  font-family: Consolas, "JetBrains Mono", monospace, "微软雅黑";
  
  /* 默认阴影：轻微外发光 */
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.1);
  
  transition: all 0.3s ease;
  overflow: hidden;
}

/* Hover 交互：仅增强边框和光晕，无位移 */
.cyber-card:hover {
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.2);
}
</style>