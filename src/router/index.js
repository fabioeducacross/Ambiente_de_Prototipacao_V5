import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import JourneyList from '../views/JourneyList.vue'
import JourneyDetail from '../views/JourneyDetail.vue'

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
  {
    path: '/teacher/calendar',
    name: 'TeacherCalendar',
    component: () => import('../views/teacher/Calendar.vue'),
    meta: {
      title: 'Calendário | Educacross',
      persona: 'Professor',
      breadcrumb: 'Calendário'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
