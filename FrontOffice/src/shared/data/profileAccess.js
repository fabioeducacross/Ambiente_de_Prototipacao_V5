export const profileAccessList = [
    {
        id: 'teacher',
        accessContextId: 'school-teacher-main',
        source: 'school',
        calendarExperience: 'operational',
        preferredRoutes: ['/professor/calendario', '/professor'],
        name: 'Professor',
        roleLabel: 'Professor',
        icon: 'school',
        accentColor: 'var(--primary)',
        artwork: '/assets/profiles/teacher.svg',
        cardVariant: 'staff',
        menuTheme: 'teacher',
        defaultRoute: '/professor',
        routePrefixes: ['/teacher'],
        description: 'Acompanhe turmas, calendário, missões e relatórios pedagógicos.'
    },
    {
        id: 'student',
        accessContextId: 'family-student-main',
        source: 'family',
        calendarExperience: 'student',
        preferredRoutes: [],
        name: 'Aluno',
        roleLabel: 'Aluno',
        icon: 'joystick',
        accentColor: 'var(--info)',
        artwork: null,
        cardVariant: 'student',
        menuTheme: 'responsible',
        defaultRoute: null,
        routePrefixes: ['/student'],
        description: 'Valide a experiência de jogo, missões e progresso do estudante.'
    },
    {
        id: 'coordinator',
        accessContextId: 'school-coordinator-main',
        source: 'school',
        calendarExperience: 'oversight',
        preferredRoutes: ['/professor/calendario', '/professor'],
        name: 'Coordenador',
        roleLabel: 'Coordenador',
        icon: 'account_tree',
        accentColor: 'var(--success)',
        artwork: '/assets/profiles/coordinator.svg',
        cardVariant: 'staff',
        menuTheme: 'admin',
        defaultRoute: '/professor',
        routePrefixes: ['/coordinator'],
        description: 'Teste a visão de acompanhamento pedagógico e suporte aos professores.'
    },
    {
        id: 'director',
        accessContextId: 'school-director-main',
        source: 'school',
        calendarExperience: 'executive',
        preferredRoutes: ['/professor/calendario', '/professor'],
        name: 'Diretor',
        roleLabel: 'Diretor',
        icon: 'apartment',
        accentColor: 'var(--warning)',
        artwork: '/assets/profiles/principal.svg',
        cardVariant: 'staff',
        menuTheme: 'admin',
        defaultRoute: '/professor',
        routePrefixes: ['/director'],
        description: 'Explore indicadores estratégicos e jornadas gerenciais da escola.'
    },
    {
        id: 'administrator',
        accessContextId: 'school-administrator-main',
        source: 'school',
        calendarExperience: 'technical',
        preferredRoutes: ['/professor/calendario', '/professor'],
        name: 'Administrador',
        roleLabel: 'Administrador',
        icon: 'settings',
        accentColor: 'var(--danger)',
        artwork: '/assets/profiles/admin.svg',
        cardVariant: 'staff',
        menuTheme: 'admin',
        defaultRoute: '/professor',
        routePrefixes: ['/administrator'],
        description: 'Revise configurações, usuários e fluxos operacionais do sistema.'
    },
    {
        id: 'network-manager',
        accessContextId: 'school-network-manager-main',
        source: 'school',
        calendarExperience: 'network',
        preferredRoutes: ['/professor/calendario', '/professor'],
        name: 'Gestor de Rede',
        roleLabel: 'Gestor de Rede',
        icon: 'language',
        accentColor: 'var(--primary-light)',
        artwork: '/assets/profiles/network-manager.svg',
        cardVariant: 'staff',
        menuTheme: 'admin',
        defaultRoute: '/professor',
        routePrefixes: ['/network-manager'],
        description: 'Valide jornadas multi-escola, comparativos e visão consolidada da rede.'
    }
]

export const getProfileAccessById = (profileId) => {
    return profileAccessList.find((profile) => profile.id === profileId) || null
}

export const getProfileAccessContextById = (accessContextId) => {
    return profileAccessList.find((profile) => profile.accessContextId === accessContextId) || null
}

export const listProfileAccessContexts = () => {
    return profileAccessList.map((profile) => ({
        ...profile,
        userId: profile.accessContextId,
    }))
}

export const resolveProfileAccessByPath = (path = '') => {
    return profileAccessList.find((profile) =>
        profile.routePrefixes.some((prefix) => path.startsWith(prefix))
    ) || null
}