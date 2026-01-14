import { createApp } from 'vue'
import './style.css' // 默认的样式
import App from './App.vue'
import router from './router' // 引入路由

const app = createApp(App)

app.use(router) // 挂载
app.mount('#app')