import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import JourneyList from '../views/JourneyList.vue'
import JourneyDetail from '../views/JourneyDetail.vue'
import teacherRoutes from './modules/teacher.routes'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/jornadas',
    name: 'JourneyList',
    component: JourneyList
  },
  {
    path: '/jornada/:id',
    name: 'JourneyDetail',
    component: JourneyDetail
  },
  // Rotas do módulo Professor (44 rotas organizadas por funcionalidade)
  ...teacherRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
