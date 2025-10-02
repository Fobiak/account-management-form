import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persistedstate'
import './styles/main.css'

const app = createApp(App)

app.use(ElementPlus)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)


app.mount('#app')