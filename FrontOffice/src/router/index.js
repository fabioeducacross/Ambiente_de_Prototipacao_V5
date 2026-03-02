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

// ─── Protótipo Isolado: Jornada Professor (/professor) ─────────────────────
const TeacherProtoLayout = () => import('../layouts/TeacherProtoLayout.vue')
const ProfessorDashboard = () => import('../views/professor/Dashboard.vue')
const ProfCalendario = () => import('../views/professor/Calendario.vue')
// Gestão
const ProfClasses = () => import('../views/teacher/records/Classes.vue')
const ProfStudents = () => import('../views/teacher/records/Students.vue')
const ProfGroups = () => import('../views/teacher/records/Groups.vue')

// Missões
const ProfNewMission = () => import('../views/teacher/missions/NewMission.vue')
const ProfMissionsList = () => import('../views/teacher/missions/MissionsList.vue')

// Relatórios
const ProfEvidenceReport = () => import('../views/teacher/reports/EvidenceReport.vue')
const ProfSkillReport = () => import('../views/teacher/reports/SkillReport.vue')
const ProfStudentAccess = () => import('../views/teacher/reports/StudentAccess.vue')
const ProfMissionReport = () => import('../views/teacher/reports/MissionReport.vue')

// Jogos
const ProfIslandConfig = () => import('../views/teacher/games/IslandConfig.vue')
const ProfIslandRanking = () => import('../views/teacher/games/IslandRanking.vue')

// Avaliações
const ProfDigitalEval = () => import('../views/teacher/evaluations/DigitalEvaluation.vue')
const ProfFluesc = () => import('../views/teacher/evaluations/FluEsc.vue')
const ProfWritingPhases = () => import('../views/teacher/evaluations/WritingPhases.vue')

// Expedição / Eventos
const ProfReadingExp = () => import('../views/teacher/ReadingExpedition.vue')
const ProfOlympiads = () => import('../views/teacher/events/Olympiads.vue')
const ProfExtreme = () => import('../views/teacher/events/Extreme.vue')

// Suporte / Conteúdo
const ProfSupportMaterials = () => import('../views/teacher/SupportMaterials.vue')
const ProfEducateca = () => import('../views/teacher/Educateca.vue')

// Programas
const ProfAlfabetiza = () => import('../views/teacher/programs/AlfabetizaManaus.vue')
const ProfLetrar = () => import('../views/teacher/programs/Letrar.vue')
const ProfSuperEnsinoJP = () => import('../views/teacher/programs/SuperEnsinoJP.vue')
const ProfSuperEnsinoMAN = () => import('../views/teacher/programs/SuperEnsinoManaus.vue')
const ProfHighFive = () => import('../views/teacher/programs/HighFive.vue')
// ───────────────────────────────────────────────────────────────────────────

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
  },

  // ─── Protótipo Isolado: Jornada Professor ───────────────────────────────
  {
    path: '/professor',
    component: TeacherProtoLayout,
    children: [
      { path: '', name: 'ProfessorDashboard', component: ProfessorDashboard, meta: { title: 'Professor | Educacross', breadcrumb: 'Professor' } },
      { path: 'calendario', name: 'ProfCalendario', component: ProfCalendario, meta: { title: 'Calendário | Professor', breadcrumb: [{ text: 'Relatórios Gerais', to: '/professor/relatorios/evidencias' }, { text: 'Calendário', active: true }] } },
      // Gestão
      { path: 'turmas', name: 'ProfClasses', component: ProfClasses, meta: { title: 'Turmas | Professor', breadcrumb: 'Turmas' } },
      { path: 'alunos', name: 'ProfStudents', component: ProfStudents, meta: { title: 'Alunos | Professor', breadcrumb: [{ text: 'Gestão (Escola / Turmas)', to: '/professor/turmas' }, { text: 'Alunos', active: true }] } },
      { path: 'grupos', name: 'ProfGroups', component: ProfGroups, meta: { title: 'Grupos | Professor', breadcrumb: [{ text: 'Gestão (Escola / Turmas)', to: '/professor/turmas' }, { text: 'Grupos', active: true }] } },
      // Missões
      { path: 'missoes/criar', name: 'ProfNewMission', component: ProfNewMission, meta: { title: 'Nova Missão | Professor', breadcrumb: [{ text: 'Missões da Escola', to: '/professor/missoes' }, { text: 'Nova Missão', active: true }] } },
      { path: 'missoes', name: 'ProfMissions', component: ProfMissionsList, meta: { title: 'Missões | Professor', breadcrumb: [{ text: 'Missões da Escola', to: '/professor/missoes' }, { text: 'Missões', active: true }] } },
      // Relatórios
      { path: 'relatorios/evidencias', name: 'ProfEvidenceReport', component: ProfEvidenceReport, meta: { title: 'Evidências | Professor', breadcrumb: [{ text: 'Relatórios Gerais', to: '/professor/relatorios/evidencias' }, { text: 'Relatório de Evidências', active: true }] } },
      { path: 'relatorios/habilidades', name: 'ProfSkillReport', component: ProfSkillReport, meta: { title: 'Habilidades | Professor', breadcrumb: [{ text: 'Relatórios Gerais', to: '/professor/relatorios/evidencias' }, { text: 'Habilidades', active: true }] } },
      { path: 'relatorios/acesso-alunos', name: 'ProfStudentAccess', component: ProfStudentAccess, meta: { title: 'Acesso de Alunos | Professor', breadcrumb: [{ text: 'Relatórios Gerais', to: '/professor/relatorios/evidencias' }, { text: 'Acesso de Alunos', active: true }] } },
      { path: 'missoes/:missionId/relatorio', name: 'ProfMissionReport', component: ProfMissionReport, meta: { title: 'Relatório da Missão | Professor', breadcrumb: [{ text: 'Missões da Escola', to: '/professor/missoes' }, { text: 'Missões', to: '/professor/missoes' }, { text: 'Relatório da Missão', active: true }] } },
      // Jogos
      { path: 'jogos/config-ilha', redirect: '/professor/explorar-jogos/configuracao' },
      { path: 'explorar-jogos/configuracao', name: 'ProfIslandConfig', component: ProfIslandConfig, meta: { title: 'Config. Ilha | Professor', breadcrumb: [{ text: 'Explorar Jogos', to: '/professor/explorar-jogos/configuracao' }, { text: 'Configurações da Ilha', active: true }] } },
      { path: 'jogos/ranking', name: 'ProfIslandRanking', component: ProfIslandRanking, meta: { title: 'Ranking Ilha | Professor', breadcrumb: [{ text: 'Explorar Jogos', to: '/professor/explorar-jogos/configuracao' }, { text: 'Ranking de Conquistas', active: true }] } },
      // Avaliações
      { path: 'avaliacoes/digital', name: 'ProfDigitalEval', component: ProfDigitalEval, meta: { title: 'Avaliação Digital | Professor', breadcrumb: [{ text: 'Avaliações', to: '/professor/avaliacoes/digital' }, { text: 'Avaliação Digital', active: true }] } },
      { path: 'avaliacoes/flue-esc', name: 'ProfFluesc', component: ProfFluesc, meta: { title: 'FluEsc | Professor', breadcrumb: [{ text: 'Avaliações', to: '/professor/avaliacoes/digital' }, { text: 'FluEsc', active: true }] } },
      { path: 'avaliacoes/fases-escrita', name: 'ProfWritingPhases', component: ProfWritingPhases, meta: { title: 'Fases da Escrita | Professor', breadcrumb: [{ text: 'Avaliações', to: '/professor/avaliacoes/digital' }, { text: 'Fases da Escrita', active: true }] } },
      // Expedição / Eventos
      { path: 'expedicao-leitura', name: 'ProfReadingExp', component: ProfReadingExp, meta: { title: 'Expedição de Leitura | Professor', breadcrumb: [{ text: 'Expedições', to: '/professor/expedicao-leitura' }, { text: 'Expedição Leitura', active: true }] } },
      { path: 'eventos/olimpiadas', name: 'ProfOlympiads', component: ProfOlympiads, meta: { title: 'Olimpíadas | Professor', breadcrumb: [{ text: 'Eventos', to: '/professor/eventos/olimpiadas' }, { text: 'Olimpíadas', active: true }] } },
      { path: 'eventos/extreme', name: 'ProfExtreme', component: ProfExtreme, meta: { title: 'Extreme | Professor', breadcrumb: [{ text: 'Eventos', to: '/professor/eventos/olimpiadas' }, { text: 'Educacross Extreme', active: true }] } },
      // Suporte / Conteúdo
      { path: 'ajudas-materiais', name: 'ProfSupportMaterials', component: ProfSupportMaterials, meta: { title: 'Materiais de Apoio | Professor', breadcrumb: [{ text: 'Formação e Apoio', to: '/professor/ajudas-materiais' }, { text: 'Ajudas e Materiais', active: true }] } },
      { path: 'educateca', name: 'ProfEducateca', component: ProfEducateca, meta: { title: 'Educateca | Professor', breadcrumb: 'Educateca' } },
      // Programas
      { path: 'programas/alfabetiza-manaus', name: 'ProfAlfabetiza', component: ProfAlfabetiza, meta: { title: 'Alfabetiza Manaus | Professor', breadcrumb: [{ text: 'Programas / Sistemas (Atalhos)', to: '/professor/programas/alfabetiza-manaus' }, { text: 'Alfabetiza Manaus', active: true }] } },
      { path: 'programas/letrar', name: 'ProfLetrar', component: ProfLetrar, meta: { title: 'Letrar | Professor', breadcrumb: [{ text: 'Programas / Sistemas (Atalhos)', to: '/professor/programas/alfabetiza-manaus' }, { text: 'Letrar+JP', active: true }] } },
      { path: 'programas/super-ensino-jp', name: 'ProfSuperEnsinoJP', component: ProfSuperEnsinoJP, meta: { title: 'Super Ensino JP | Professor', breadcrumb: [{ text: 'Programas / Sistemas (Atalhos)', to: '/professor/programas/alfabetiza-manaus' }, { text: 'Super Ensino João Pessoa', active: true }] } },
      { path: 'programas/super-ensino-manaus', name: 'ProfSuperEnsinoMAN', component: ProfSuperEnsinoMAN, meta: { title: 'Super Ensino Manaus | Professor', breadcrumb: [{ text: 'Programas / Sistemas (Atalhos)', to: '/professor/programas/alfabetiza-manaus' }, { text: 'Super Ensino Manaus', active: true }] } },
      { path: 'programas/high-five', name: 'ProfHighFive', component: ProfHighFive, meta: { title: 'High Five | Professor', breadcrumb: [{ text: 'Programas / Sistemas (Atalhos)', to: '/professor/programas/alfabetiza-manaus' }, { text: 'High Five', active: true }] } },
    ]
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

