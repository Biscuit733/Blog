import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/Blog/',  // <--- 加上这一行！注意前后都有斜杠，名字要和仓库名一致
  plugins: [vue()],
})
