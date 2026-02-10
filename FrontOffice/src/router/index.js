import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Lazy load journey pages
const TeacherDashboard = () => import('../views/teacher/Dashboard.vue')
const StudentDashboard = () => import('../views/student/Dashboard.vue')
const AdministratorDashboard = () => import('../views/administrator/Dashboard.vue')
const CoordinatorDashboard = () => import('../views/coordinator/Dashboard.vue')
const DirectorDashboard = () => import('../views/director/Dashboard.vue')
const NetworkManagerDashboard = () => import('../views/network-manager/Dashboard.vue')

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
