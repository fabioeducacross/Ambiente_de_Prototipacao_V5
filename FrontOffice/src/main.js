import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Bootstrap + BootstrapVue 3
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

// Flatpickr (date picker)
import 'flatpickr/dist/flatpickr.css'

// Estilos customizados (deve vir por último para sobrescrever)
import './style.css'

const app = createApp(App)
app.use(router)
app.use(createBootstrap())
app.mount('#app')
