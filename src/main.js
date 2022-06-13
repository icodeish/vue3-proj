import { createApp } from 'vue'
import App from './App.vue'
import router from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../src/assets/global.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app=createApp(App)
app.use(ElementPlus, {locale: zhCn,})
app.use(router)
// import urls from '../api/api.js'
// app.config.globalProperties.$urls=urls

// import request from '../api/request.js'
// app.config.globalProperties.$request=request
import axios from '../api/axiosInstance.js'
app.config.globalProperties.$axios=axios
app.mount('#app')
