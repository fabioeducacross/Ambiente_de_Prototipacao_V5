import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Lazy load - Módulo Calendário
const TeacherCalendar = () => import('../views/teacher/Calendar.vue')
const TeacherCalendarFigma = () => import('../views/teacher/CalendarFigma.vue')

// Lazy load - Módulo Sistema de Ensino
const TeacherSistemaEnsino = () => import('../modules/sistema-de-ensino/views/SistemaEnsino.vue')

// Lazy load - Views globais
const TeacherDashboard = () => import('../views/teacher/Dashboard.vue')
const StudentDashboard = () => import('../views/student/Dashboard.vue')
const AdministratorDashboard = () => import('../views/administrator/Dashboard.vue')
const CoordinatorDashboard = () => import('../views/coordinator/Dashboard.vue')
const DirectorDashboard = () => import('../views/director/Dashboard.vue')
const NetworkManagerDashboard = () => import('../views/network-manager/Dashboard.vue')
const About = () => import('../views/About.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Educacross - Protótipos de Jornadas' }
  },
  {
    path: '/teacher',
    name: 'TeacherDashboard',
    component: TeacherDashboard,
    meta: { title: 'Dashboard Professor | Educacross', persona: 'Professor' }
  },
  {
    path: '/teacher/calendar',
    name: 'TeacherCalendar',
    component: TeacherCalendar,
    meta: { title: 'Calendário | Educacross', persona: 'Professor', breadcrumb: 'Calendário' }
  },
  {
    path: '/teacher/calendar-figma',
    name: 'TeacherCalendarFigma',
    component: TeacherCalendarFigma,
    meta: { title: 'Calendário Unificado | Educacross', persona: 'Professor', breadcrumb: 'Calendário' }
  },
  {
    path: '/teacher/trilhas-az',
    name: 'TeacherSistemaEnsino',
    component: TeacherSistemaEnsino,
    meta: { title: 'Sistema de ensino | Educacross', persona: 'Professor', breadcrumb: 'Sistema de ensino' }
  },
  {
    path: '/student',
    name: 'StudentDashboard',
    component: StudentDashboard,
    meta: { title: 'Dashboard Aluno | Educacross', persona: 'Aluno' }
  },
  {
    path: '/administrator',
    name: 'AdministratorDashboard',
    component: AdministratorDashboard,
    meta: { title: 'Dashboard Administrador | Educacross', persona: 'Administrador' }
  },
  {
    path: '/coordinator',
    name: 'CoordinatorDashboard',
    component: CoordinatorDashboard,
    meta: { title: 'Dashboard Coordenador | Educacross', persona: 'Coordenador' }
  },
  {
    path: '/director',
    name: 'DirectorDashboard',
    component: DirectorDashboard,
    meta: { title: 'Dashboard Diretor | Educacross', persona: 'Diretor' }
  },
  {
    path: '/network-manager',
    name: 'NetworkManagerDashboard',
    component: NetworkManagerDashboard,
    meta: { title: 'Dashboard Gestor de Rede | Educacross', persona: 'Gestor de Rede' }
  },
  {
    path: '/sobre',
    name: 'About',
    component: About,
    meta: { title: 'Sobre o Ambiente | Educacross' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Update page title on navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Educacross FrontOffice'
  next()
})

export default router

