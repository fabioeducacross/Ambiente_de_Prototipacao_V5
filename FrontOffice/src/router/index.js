import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Import modular routes
import teacherRoutes from './modules/teacher.routes'

// Lazy load journey pages (other personas)
const StudentDashboard = () => import('../views/student/Dashboard.vue')
const StudentCalendar = () => import('../views/student/Calendar.vue')

const AdministratorDashboard = () => import('../views/administrator/Dashboard.vue')
const AdministratorCalendar = () => import('../views/administrator/Calendar.vue')

const CoordinatorDashboard = () => import('../views/coordinator/Dashboard.vue')
const CoordinatorCalendar = () => import('../views/coordinator/Calendar.vue')

const DirectorDashboard = () => import('../views/director/Dashboard.vue')
const DirectorCalendar = () => import('../views/director/Calendar.vue')

const NetworkManagerDashboard = () => import('../views/network-manager/Dashboard.vue')
const NetworkManagerCalendar = () => import('../views/network-manager/Calendar.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Educacross - Protótipos de Jornadas' }
  },
  
  // ========================================
  // Teacher Routes (modular - 44 routes)
  // ========================================
  ...teacherRoutes,
  
  // ========================================
  // Student Routes
  // ========================================
  {
    path: '/student',
    name: 'StudentDashboard',
    component: StudentDashboard,
    meta: { title: 'Dashboard Aluno | Educacross', persona: 'Aluno' }
  },
  {
    path: '/student/calendar',
    name: 'StudentCalendar',
    component: StudentCalendar,
    meta: { title: 'Calendário | Educacross', persona: 'Aluno' }
  },
  
  // ========================================
  // Administrator Routes
  // ========================================
  {
    path: '/administrator',
    name: 'AdministratorDashboard',
    component: AdministratorDashboard,
    meta: { title: 'Dashboard Administrador | Educacross', persona: 'Administrador' }
  },
  {
    path: '/administrator/calendar',
    name: 'AdministratorCalendar',
    component: AdministratorCalendar,
    meta: { title: 'Calendário Administrativo | Educacross', persona: 'Administrador' }
  },
  
  // ========================================
  // Coordinator Routes
  // ========================================
  {
    path: '/coordinator',
    name: 'CoordinatorDashboard',
    component: CoordinatorDashboard,
    meta: { title: 'Dashboard Coordenador | Educacross', persona: 'Coordenador' }
  },
  {
    path: '/coordinator/calendar',
    name: 'CoordinatorCalendar',
    component: CoordinatorCalendar,
    meta: { title: 'Calendário Pedagógico | Educacross', persona: 'Coordenador' }
  },
  
  // ========================================
  // Director Routes
  // ========================================
  {
    path: '/director',
    name: 'DirectorDashboard',
    component: DirectorDashboard,
    meta: { title: 'Dashboard Diretor | Educacross', persona: 'Diretor' }
  },
  {
    path: '/director/calendar',
    name: 'DirectorCalendar',
    component: DirectorCalendar,
    meta: { title: 'Calendário da Escola | Educacross', persona: 'Diretor' }
  },
  
  // ========================================
  // Network Manager Routes
  // ========================================
  {
    path: '/network-manager',
    name: 'NetworkManagerDashboard',
    component: NetworkManagerDashboard,
    meta: { title: 'Dashboard Gestor de Rede | Educacross', persona: 'Gestor de Rede' }
  },
  {
    path: '/network-manager/calendar',
    name: 'NetworkManagerCalendar',
    component: NetworkManagerCalendar,
    meta: { title: 'Calendário da Rede | Educacross', persona: 'Gestor de Rede' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title on navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Educacross FrontOffice'
  next()
})

export default router
