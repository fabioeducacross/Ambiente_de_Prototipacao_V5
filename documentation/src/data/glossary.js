/**
 * Glossário centralizado do handbook Educacross
 * ─────────────────────────────────────────────
 * Cada entrada é usada pelo componente <GlossaryTerm> para exibir
 * o popover inline nas páginas da wiki.
 *
 * Categorias:
 *   component  — componente Vue/Bootstrap/DS
 *   pattern    — padrão de design ou UX
 *   tech       — tecnologia, biblioteca ou ferramenta
 *   concept    — conceito de design system ou UX
 */

/** @type {Record<string, {term: string, category: string, short: string, context: string}>} */
const glossary = {

    // ── Componentes ──────────────────────────────────────────────────────────

    'drawer-hint': {
        term: 'drawer-hint',
        category: 'component',
        short: 'Faixa informativa compacta usada dentro de painéis laterais (drawers).',
        context:
            'Orienta o professor antes de executar uma ação dentro do drawer. ' +
            'Nunca é feedback de resultado. Não tem botão fechar. ' +
            'Variantes: padrão (roxo), neutro (ciano), warning (laranja).',
    },

    'BAlert': {
        term: 'BAlert',
        category: 'component',
        short: 'Componente de alerta de página do bootstrap-vue-next.',
        context:
            'Usado para avisos de limite, bloqueios e estados críticos no nível ' +
            'de página (fora de drawers). Requer :model-value="true" para manter ' +
            'visível. Conteúdo vai dentro de .alert-body.',
    },

    'GuidesLimitAlert': {
        term: 'GuidesLimitAlert',
        category: 'component',
        short: 'Componente de alerta de limite de guias, portado da produção.',
        context:
            'Encapsula a lógica de 3 layouts via BAlert: primary (< 26 guias), ' +
            'danger (26–39), danger com bloqueio (≥ 40). ' +
            'Referência: FrontOffice/src/components/missions/GuidesLimitAlert.vue.',
    },

    // ── Padrões ───────────────────────────────────────────────────────────────

    'callout': {
        term: 'callout',
        category: 'pattern',
        short: 'Mensagem persistente que orienta antes da ação do usuário.',
        context:
            'Padrão do Carbon Design System (IBM). Diferente de notificações, ' +
            'o callout não é disparado por resultado de ação, carrega com ' +
            'o conteúdo da página e não tem botão fechar. ' +
            'Equivalente ao drawer-hint no Educacross.',
    },

    'inline-notification': {
        term: 'inline notification',
        category: 'pattern',
        short: 'Notificação inline disparada após resultado de ação do usuário.',
        context:
            'Padrão do Carbon Design System. Ao contrário do callout, é feedback ' +
            'reativo — aparece após o usuário executar algo. Suporta ' +
            'success, error, warning e informational.',
    },

    'drawer': {
        term: 'drawer',
        category: 'pattern',
        short: 'Painel lateral deslizante que emerge sem sair da página atual.',
        context:
            'Usado no FrontOffice para ações de envio de missões, visualização ' +
            'de relatórios de aluno e configuração de capítulos. ' +
            'O contexto compacto do drawer exige componentes com menos peso visual ' +
            'que os equivalentes de página (ex: drawer-hint vs BAlert).',
    },

    // ── Tecnologias ───────────────────────────────────────────────────────────

    'bootstrap-vue-next': {
        term: 'bootstrap-vue-next',
        category: 'tech',
        short: 'Biblioteca de componentes Bootstrap 5 reescritos para Vue 3.',
        context:
            'Versão ativa do bootstrap-vue compatível com Vue 3 Composition API. ' +
            'Pacote: @bootstrap-vue-next/bootstrap-vue-next. ' +
            'No FrontOffice, usar apenas BAlert para alertas de página — ' +
            'não usar os componentes de alerta para contextos de drawer.',
    },

    'material-symbols': {
        term: 'Material Symbols',
        category: 'tech',
        short: 'Biblioteca de ícones variáveis do Google, usada no Educacross.',
        context:
            'Importada via Google Fonts (Outlined). Usada com a classe ' +
            '.material-symbols-outlined. No FrontOffice, encapsulada no ' +
            'componente <MaterialIcon name="..." />. ' +
            'Para drawer-hint, usar ícone "info" (primário/neutro) ou "warning".',
    },

    'color-mix': {
        term: 'color-mix()',
        category: 'tech',
        short: 'Função CSS nativa para misturar duas cores definindo opacidade.',
        context:
            'Sintaxe: color-mix(in srgb, var(--token) 8%, transparent). ' +
            'Usada nos backgrounds do drawer-hint para criar tons translúcidos ' +
            'sem hardcoded rgba. Suportada em todos os navegadores modernos (2023+).',
    },

    // ── Conceitos ─────────────────────────────────────────────────────────────

    'design-tokens': {
        term: 'design tokens',
        category: 'concept',
        short: 'Variáveis CSS que centralizam cor, tipografia e espaçamento do DS.',
        context:
            'No Educacross: --ec-primary (#6E63E8), --info (#00CFE8), ' +
            '--warning (#FF9F43), --danger (#EA5455), --success (#28C76F). ' +
            'Sempre usar var(--token) — nunca valor hex fixo no componente.',
    },

    'scoped-styles': {
        term: 'scoped styles',
        category: 'concept',
        short: 'Estilos CSS com escopo limitado ao componente Vue atual.',
        context:
            'Declarados com <style scoped> em componentes Vue. ' +
            'Evitam vazamento de estilos entre componentes. ' +
            'Obrigatório em todos os componentes do FrontOffice. ' +
            'CSS do drawer-hint deve ser copiado para cada componente que usar o padrão.',
    },

    'semantic-variant': {
        term: 'variante semântica',
        category: 'concept',
        short: 'Variante visual cujo nome carrega um significado de estado ou intenção.',
        context:
            'Ex: "primary", "danger", "warning" — cada nome implica uma cor, ' +
            'um ícone e um contexto de uso. Contrasta com variantes puramente ' +
            'visuais (ex: "outlined", "filled") que se combinam com a semântica.',
    },

    'mdx': {
        term: 'MDX',
        category: 'tech',
        short: 'Formato de arquivo que combina Markdown com componentes JSX/React.',
        context:
            'Usado nas páginas da wiki (Docusaurus) para incorporar componentes ' +
            'React como <GlossaryTerm> diretamente no conteúdo documentado. ' +
            'Arquivos .mdx são processados pelo Docusaurus como páginas React.',
    },

    'atomic-design': {
        term: 'Atomic Design',
        category: 'concept',
        short: 'Metodologia de organização de componentes em átomos, moléculas, organismos e templates.',
        context:
            'Adotada na estrutura do FrontOffice: ' +
            'FrontOffice/src/components/atoms/, molecules/, organisms/, templates/. ' +
            'O drawer-hint é um átomo — sem estado próprio, sem lógica de dado.',
    },

};

export default glossary;

/**
 * Retorna a entrada do glossário por ID.
 * @param {string} id
 */
export function getTerm(id) {
    return glossary[id] ?? null;
}

/**
 * Retorna todas as entradas ordenadas alfabeticamente pelo term.
 */
export function getAllTerms() {
    return Object.entries(glossary)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
}

/** Labels e cores por categoria */
export const categoryMeta = {
    component: { label: 'Componente', color: '#7367F0' },
    pattern: { label: 'Padrão', color: '#00CFE8' },
    tech: { label: 'Tecnologia', color: '#28C76F' },
    concept: { label: 'Conceito', color: '#FF9F43' },
};
