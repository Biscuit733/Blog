import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/Blog/',  // <--- 加上这一行！注意前后都有斜杠，名字要和仓库名一致
  plugins: [vue()],
  // 配置别名的核心配置项
  resolve: {
    alias: {
      // 配置 @ 指向 项目根目录下的 src 文件夹
      '@': path.resolve(__dirname, './src')
    }
  },
  // 3. 配置 启动端口号 + 服务器相关 【核心】
  server: {
    port: 9733, // ✅ 自定义启动端口号，改成你想要的数字即可
    open: true, // ✅ 启动项目后，自动打开浏览器页面（可选，推荐开启）
    host: '0.0.0.0' // ✅ 允许局域网访问（比如手机/另一台电脑访问你的项目）
  }
})
