import type { Journey } from '../types/journey'

export interface PersonaJourneys {
    id: string
    name: string
    icon: string
    color: string
    description: string
    route?: string
    journeys: Journey[]
}

export const personasJourneys: PersonaJourneys[] = [
    {
        id: 'teacher',
        name: 'Professor',
        icon: 'manage_accounts',
        color: '#7367F0',
        description: 'Gestao de turmas, missoes e acompanhamento de alunos',
        route: '/teacher',
        journeys: [
            {
                id: 'PROF-PROT-001',
                label: 'Dashboard Professor',
                icon: 'view_sidebar',
                route: '/professor',
                experienceTarget: '/professor',
                status: 'Ativo',
                jtbd: 'Centralizar o acesso rapido do professor para as jornadas prioritarias do dia.',
                checklist: [
                    'Validar hierarquia de navegacao entre menu e conteudo principal',
                    'Conferir consistencia dos estados ativo e hover nos itens',
                    'Testar responsividade da barra lateral em telas pequenas'
                ],
                owner: 'Squad FrontOffice',
                lastUpdate: '2026-03-05',
                nextStep: 'Consolidar feedback de usabilidade com 2 professores piloto.'
            },
            {
                id: 'PROF-CAL-001',
                label: 'Calendario de Eventos',
                icon: 'calendar_month',
                route: '/professor/calendario',
                experienceTarget: '/professor/calendario',
                status: 'Ativo',
                jtbd: 'Planejar a rotina pedagogica semanal com visao clara de eventos e conflitos.',
                checklist: [
                    'Garantir exibicao de eventos multi-dia sem sobreposicao incorreta',
                    'Validar criacao e edicao pelo drawer de evento',
                    'Confirmar filtros de periodo em desktop e mobile'
                ],
                owner: 'Modulo Calendario',
                lastUpdate: '2026-03-05',
                nextStep: 'Executar rodada de refinamento visual com base no snapshot atual.'
            },
            {
                id: 'PROF-001',
                label: 'Livros do Sistema Educacional',
                icon: 'menu_book',
                route: '/teacher/trilhas-az',
                experienceTarget: '/teacher/trilhas-az',
                status: 'Ativo',
                jtbd: 'Acessar trilhas organizadas para planejar a aplicacao pedagogica por etapa.',
                checklist: [
                    'Checar ordenacao das trilhas por eixo e serie',
                    'Validar estados de carregamento e vazio',
                    'Confirmar navegacao para detalhes da trilha selecionada'
                ],
                owner: 'Modulo Sistema de Ensino',
                lastUpdate: '2026-03-05',
                nextStep: 'Detalhar criterios de curadoria para publicacao de novas trilhas.'
            },
            {
                id: 'PROF-PROT-002',
                label: 'Missoes da Escola',
                icon: 'flag',
                route: '/professor/missoes',
                experienceTarget: '/professor/missoes',
                status: 'Ativo',
                jtbd: 'Priorizar intervencoes pedagogicas com base no status atual das missoes.',
                checklist: [
                    'Validar filtros de status por turma',
                    'Conferir destaque de prazo critico e pendencias',
                    'Testar abertura de detalhes sem perda de contexto'
                ],
                owner: 'Squad Missoes',
                lastUpdate: '2026-03-05',
                nextStep: 'Ajustar indicadores de urgencia com base em regras de negocio.'
            },
            { id: 'PROF-002', label: 'Missoes do Livro do Sistema Educacional', icon: 'flag', route: null, status: 'Planejado' },
            { id: 'PROF-003', label: 'Missoes Personalizadas', icon: 'assignment_add', route: null, status: 'Planejado' },
            { id: 'PROF-004', label: 'Gestao de Eventos', icon: 'event_note', route: null, status: 'Planejado' }
        ]
    },
    {
        id: 'student',
        name: 'Aluno',
        icon: 'school',
        color: '#00CFE8',
        description: 'Missoes, conquistas e progresso individual',
        journeys: [
            { id: 'ALUNO-001', label: 'Acessar Missoes', icon: 'flag', route: null, status: 'Planejado' },
            { id: 'ALUNO-002', label: 'Completar Atividades', icon: 'task_alt', route: null, status: 'Planejado' },
            { id: 'ALUNO-003', label: 'Ver Conquistas', icon: 'emoji_events', route: null, status: 'Planejado' },
            { id: 'ALUNO-004', label: 'Receber Feedback', icon: 'reviews', route: null, status: 'Planejado' }
        ]
    },
    {
        id: 'coordinator',
        name: 'Coordenador',
        icon: 'account_tree',
        color: '#28C76F',
        description: 'Coordenacao pedagogica e gestao de turmas',
        journeys: [
            { id: 'COORD-001', label: 'Gestao Pedagogica', icon: 'account_tree', route: null, status: 'Planejado' },
            { id: 'COORD-002', label: 'Suporte a Professores', icon: 'support_agent', route: null, status: 'Planejado' },
            { id: 'COORD-003', label: 'Analise de Turmas', icon: 'bar_chart', route: null, status: 'Planejado' }
        ]
    },
    {
        id: 'director',
        name: 'Diretor',
        icon: 'apartment',
        color: '#FF9F43',
        description: 'Gestao escolar e indicadores estrategicos',
        journeys: [
            { id: 'DIR-001', label: 'Indicadores Estrategicos', icon: 'insights', route: null, status: 'Planejado' },
            { id: 'DIR-002', label: 'Gestao de Recursos', icon: 'inventory_2', route: null, status: 'Planejado' },
            { id: 'DIR-003', label: 'Relatorios Gerenciais', icon: 'summarize', route: null, status: 'Planejado' }
        ]
    },
    {
        id: 'administrator',
        name: 'Administrador',
        icon: 'settings',
        color: '#EA5455',
        description: 'Configuracao do sistema e gestao de usuarios',
        journeys: [
            { id: 'ADM-001', label: 'Gerenciar Usuarios', icon: 'manage_accounts', route: null, status: 'Planejado' },
            { id: 'ADM-002', label: 'Configurar Sistema', icon: 'build', route: null, status: 'Planejado' },
            { id: 'ADM-003', label: 'Logs e Auditoria', icon: 'policy', route: null, status: 'Planejado' }
        ]
    },
    {
        id: 'network-manager',
        name: 'Gestor de Rede',
        icon: 'language',
        color: '#9E95F5',
        description: 'Gestao de multiplas escolas e indicadores de rede',
        journeys: [
            { id: 'REDE-001', label: 'Visao Geral da Rede', icon: 'hub', route: null, status: 'Planejado' },
            { id: 'REDE-002', label: 'Comparacoes', icon: 'compare_arrows', route: null, status: 'Planejado' },
            { id: 'REDE-003', label: 'Planejamento Estrategico', icon: 'route', route: null, status: 'Planejado' }
        ]
    }
]
