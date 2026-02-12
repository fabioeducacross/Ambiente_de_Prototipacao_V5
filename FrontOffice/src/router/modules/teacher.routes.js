/**
 * Rotas do módulo Professor (FrontOffice)
 * Estrutura: views/teacher/{module}/{file}.vue
 * Total: 44 rotas organizadas por menu da sidebar
 */

const teacherRoutes = [
  // ========================================
  // Painel Inicial
  // ========================================
  {
    path: '/teacher',
    name: 'TeacherDashboard',
    component: () => import('@/views/teacher/Dashboard.vue'),
    meta: {
      title: 'Painel Inicial | Educacross',
      persona: 'Professor',
      breadcrumb: 'Painel Inicial'
    }
  },

  // ========================================
  // Relatórios gerais
  // ========================================
  {
    path: '/teacher/reports/access',
    name: 'TeacherReportsAccess',
    component: () => import('@/views/teacher/reports/Access.vue'),
    meta: {
      title: 'Relatórios - Acessos | Educacross',
      persona: 'Professor',
      breadcrumb: 'Relatórios > Acessos'
    }
  },
  {
    path: '/teacher/reports/evidence',
    name: 'TeacherReportsEvidence',
    component: () => import('@/views/teacher/reports/Evidence.vue'),
    meta: {
      title: 'Relatórios - Evidências | Educacross',
      persona: 'Professor',
      breadcrumb: 'Relatórios > Evidências de Aprendizagem'
    }
  },
  {
    path: '/teacher/reports/skills',
    name: 'TeacherReportsSkills',
    component: () => import('@/views/teacher/reports/Skills.vue'),
    meta: {
      title: 'Relatórios - Habilidades | Educacross',
      persona: 'Professor',
      breadcrumb: 'Relatórios > Habilidades'
    }
  },

  // ========================================
  // Calendário
  // ========================================
  {
    path: '/teacher/calendar',
    name: 'TeacherCalendar',
    component: () => import('@/views/teacher/Calendar.vue'),
    meta: {
      title: 'Calendário | Educacross',
      persona: 'Professor',
      breadcrumb: 'Calendário'
    }
  },

  // ========================================
  // Missões da Escola
  // ========================================
  {
    path: '/teacher/missions',
    name: 'TeacherMissions',
    component: () => import('@/views/teacher/missions/Index.vue'),
    meta: {
      title: 'Missões da Escola | Educacross',
      persona: 'Professor',
      breadcrumb: 'Missões da Escola'
    }
  },
  {
    path: '/teacher/missions/create',
    name: 'TeacherMissionsCreate',
    component: () => import('@/views/teacher/missions/Create.vue'),
    meta: {
      title: 'Criar Missão | Educacross',
      persona: 'Professor',
      breadcrumb: 'Missões da Escola > Criar Missão'
    }
  },
  {
    path: '/teacher/missions/reviews',
    name: 'TeacherMissionsReviews',
    component: () => import('@/views/teacher/missions/Reviews.vue'),
    meta: {
      title: 'Revisões | Educacross',
      persona: 'Professor',
      breadcrumb: 'Missões da Escola > Revisões'
    }
  },

  // ========================================
  // Trilhas
  // ========================================
  {
    path: '/teacher/trails',
    name: 'TeacherTrails',
    component: () => import('@/views/teacher/trails/Index.vue'),
    meta: {
      title: 'Trilhas | Educacross',
      persona: 'Professor',
      breadcrumb: 'Trilhas'
    }
  },
  {
    path: '/teacher/trails/bncc',
    name: 'TeacherTrailsBNCC',
    component: () => import('@/views/teacher/trails/BNCC.vue'),
    meta: {
      title: 'Trilhas - BNCC | Educacross',
      persona: 'Professor',
      breadcrumb: 'Trilhas > Trilhas BNCC'
    }
  },
  {
    path: '/teacher/trails/saeb',
    name: 'TeacherTrailsSAEB',
    component: () => import('@/views/teacher/trails/SAEB.vue'),
    meta: {
      title: 'Trilhas - SAEB | Educacross',
      persona: 'Professor',
      breadcrumb: 'Trilhas > Trilhas SAEB'
    }
  },
  {
    path: '/teacher/trails/program32',
    name: 'TeacherTrailsProgram32',
    component: () => import('@/views/teacher/trails/Program32.vue'),
    meta: {
      title: 'Trilhas - Programa 32 | Educacross',
      persona: 'Professor',
      breadcrumb: 'Trilhas > Programa 32'
    }
  },
  {
    path: '/teacher/trails/super-ensino',
    name: 'TeacherTrailsSuperEnsino',
    component: () => import('@/views/teacher/trails/SuperEnsino.vue'),
    meta: {
      title: 'Trilhas - Super Ensino | Educacross',
      persona: 'Professor',
      breadcrumb: 'Trilhas > Super Ensino'
    }
  },
  {
    path: '/teacher/trails/coc',
    name: 'TeacherTrailsCOC',
    component: () => import('@/views/teacher/trails/COC.vue'),
    meta: {
      title: 'Trilhas - COC | Educacross',
      persona: 'Professor',
      breadcrumb: 'Trilhas > COC'
    }
  },

  // ========================================
  // Avaliações
  // ========================================
  {
    path: '/teacher/evaluations',
    name: 'TeacherEvaluations',
    component: () => import('@/views/teacher/evaluations/Index.vue'),
    meta: {
      title: 'Avaliações | Educacross',
      persona: 'Professor',
      breadcrumb: 'Avaliações'
    }
  },
  {
    path: '/teacher/evaluations/diagnostic',
    name: 'TeacherEvaluationsDiagnostic',
    component: () => import('@/views/teacher/evaluations/Diagnostic.vue'),
    meta: {
      title: 'Avaliações - Diagnósticas | Educacross',
      persona: 'Professor',
      breadcrumb: 'Avaliações > Avaliações Diagnósticas'
    }
  },
  {
    path: '/teacher/evaluations/summative',
    name: 'TeacherEvaluationsSummative',
    component: () => import('@/views/teacher/evaluations/Summative.vue'),
    meta: {
      title: 'Avaliações - Somativas | Educacross',
      persona: 'Professor',
      breadcrumb: 'Avaliações > Avaliações Somativas'
    }
  },
  {
    path: '/teacher/evaluations/mock',
    name: 'TeacherEvaluationsMock',
    component: () => import('@/views/teacher/evaluations/Mock.vue'),
    meta: {
      title: 'Avaliações - Simulados | Educacross',
      persona: 'Professor',
      breadcrumb: 'Avaliações > Simulados'
    }
  },
  {
    path: '/teacher/evaluations/reading-fluency',
    name: 'TeacherEvaluationsReadingFluency',
    component: () => import('@/views/teacher/evaluations/ReadingFluency.vue'),
    meta: {
      title: 'Avaliações - Fluência Leitora | Educacross',
      persona: 'Professor',
      breadcrumb: 'Avaliações > Fluência Leitora'
    }
  },
  {
    path: '/teacher/evaluations/writing-tests',
    name: 'TeacherEvaluationsWritingTests',
    component: () => import('@/views/teacher/evaluations/WritingTests.vue'),
    meta: {
      title: 'Avaliações - Testes de Escrita | Educacross',
      persona: 'Professor',
      breadcrumb: 'Avaliações > Testes de Escrita'
    }
  },

  // ========================================
  // Olimpíadas
  // ========================================
  {
    path: '/teacher/olympics',
    name: 'TeacherOlympics',
    component: () => import('@/views/teacher/olympics/Index.vue'),
    meta: {
      title: 'Olimpíadas | Educacross',
      persona: 'Professor',
      breadcrumb: 'Olimpíadas'
    }
  },

  // ========================================
  // Educateca
  // ========================================
  {
    path: '/teacher/educateca',
    name: 'TeacherEducateca',
    component: () => import('@/views/teacher/educateca/Index.vue'),
    meta: {
      title: 'Educateca | Educacross',
      persona: 'Professor',
      breadcrumb: 'Educateca'
    }
  },

  // ========================================
  // Expedições
  // ========================================
  {
    path: '/teacher/expeditions',
    name: 'TeacherExpeditions',
    component: () => import('@/views/teacher/expeditions/Index.vue'),
    meta: {
      title: 'Expedições | Educacross',
      persona: 'Professor',
      breadcrumb: 'Expedições'
    }
  },
  {
    path: '/teacher/expeditions/reading',
    name: 'TeacherExpeditionsReading',
    component: () => import('@/views/teacher/expeditions/Reading.vue'),
    meta: {
      title: 'Expedição Leitura | Educacross',
      persona: 'Professor',
      breadcrumb: 'Expedições > Expedição Leitura'
    }
  },
  {
    path: '/teacher/expeditions/learning',
    name: 'TeacherExpeditionsLearning',
    component: () => import('@/views/teacher/expeditions/Learning.vue'),
    meta: {
      title: 'Expedição Aprendizagem | Educacross',
      persona: 'Professor',
      breadcrumb: 'Expedições > Expedição Aprendizagem'
    }
  },

  // ========================================
  // Formação e Apoio
  // ========================================
  {
    path: '/teacher/training/materials',
    name: 'TeacherTrainingMaterials',
    component: () => import('@/views/teacher/training/Materials.vue'),
    meta: {
      title: 'Ajudas e Materiais | Educacross',
      persona: 'Professor',
      breadcrumb: 'Formação e Apoio > Ajudas e Materiais'
    }
  },
  {
    path: '/teacher/training/academy',
    name: 'TeacherTrainingAcademy',
    component: () => import('@/views/teacher/training/Academy.vue'),
    meta: {
      title: 'Academia Educacross | Educacross',
      persona: 'Professor',
      breadcrumb: 'Formação e Apoio > Academia Educacross'
    }
  },

  // ========================================
  // Jornada Super
  // ========================================
  {
    path: '/teacher/super-journey/challenges',
    name: 'TeacherSuperJourneyChallenges',
    component: () => import('@/views/teacher/super-journey/Challenges.vue'),
    meta: {
      title: 'Jornada Super - Desafios | Educacross',
      persona: 'Professor',
      breadcrumb: 'Jornada Super > Desafios'
    }
  },
  {
    path: '/teacher/super-journey/ranking',
    name: 'TeacherSuperJourneyRanking',
    component: () => import('@/views/teacher/super-journey/Ranking.vue'),
    meta: {
      title: 'Jornada Super - Ranking | Educacross',
      persona: 'Professor',
      breadcrumb: 'Jornada Super > Ranking'
    }
  },
  {
    path: '/teacher/super-journey/store',
    name: 'TeacherSuperJourneyStore',
    component: () => import('@/views/teacher/super-journey/Store.vue'),
    meta: {
      title: 'Jornada Super - Loja | Educacross',
      persona: 'Professor',
      breadcrumb: 'Jornada Super > Loja'
    }
  },
  {
    path: '/teacher/super-journey/specials',
    name: 'TeacherSuperJourneySpecials',
    component: () => import('@/views/teacher/super-journey/Specials.vue'),
    meta: {
      title: 'Jornada Super - Especiais | Educacross',
      persona: 'Professor',
      breadcrumb: 'Jornada Super > Especiais'
    }
  },

  // ========================================
  // Administração
  // ========================================
  {
    path: '/teacher/administration/students',
    name: 'TeacherAdministrationStudents',
    component: () => import('@/views/teacher/administration/Students.vue'),
    meta: {
      title: 'Administração - Alunos | Educacross',
      persona: 'Professor',
      breadcrumb: 'Administração > Alunos'
    }
  },
  {
    path: '/teacher/administration/permissions',
    name: 'TeacherAdministrationPermissions',
    component: () => import('@/views/teacher/administration/Permissions.vue'),
    meta: {
      title: 'Administração - Permissões | Educacross',
      persona: 'Professor',
      breadcrumb: 'Administração > Permissões'
    }
  }
]

export default teacherRoutes
