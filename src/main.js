import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import AppNavbar from './components/AppNavbar.vue'

const app = createApp(App)
app.use(router)
app.component('AppNavbar', AppNavbar)
app.mount('#app')
