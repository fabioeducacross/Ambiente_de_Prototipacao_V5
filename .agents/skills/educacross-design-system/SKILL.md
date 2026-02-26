---
name: educacross-design-system
description: >
  Design system completo do Educacross FrontOffice. Use SEMPRE que for construir,
  revisar ou ajustar qualquer tela, componente, protótipo ou UI do Educacross.
  Ativa ao receber pedidos como "crie a tela de", "adicione componente", "ajuste o
  layout", "use o padrão visual do Educacross", "siga o design system".
metadata:
  author: educacross
  version: "2.0.0"
  source: educacross-frontoffice (src/assets/scss, src/components, src/navigation, wiki/)
---

# Educacross Design System

Referência completa extraída diretamente do repositório `educacross-frontoffice`.
Use este documento antes de escrever qualquer linha de CSS, HTML ou Vue ao trabalhar
em telas do Educacross.

---

## 1. Stack de UI

| Camada | Tecnologia |
|--------|------------|
| Framework | Vue 2 (Options API + Composition API via `@vue/composition-api`) |
| Template base | Vuexy Admin Dashboard (BootstrapVue) |
| CSS framework | Bootstrap 5 + variáveis SCSS customizadas |
| Ícones | **Material Symbols Outlined** (Google) — classe: `material-symbols-outlined` |
| Fonte | **Montserrat** (Google Fonts) — tous os pesos |
| Gráficos | ApexCharts (via `vue-apexcharts`) |
| Animações de transição | `zoom-fade`, `slide-fade`, `fade-bottom`, `fade`, `zoom-out` |
| Layout | Vertical sidebar, navbar sticky, conteúdo full-width |

---

## 2. Paleta de Cores

### 2.1 Cores primárias (SCSS + CSS vars)

| Token | Valor hex | Uso |
|-------|-----------|-----|
| `$primary` | `#6e63e8` | Ações principais, links, destaques |
| `$secondary` | `#b4b7bd` | Elementos neutros, desabilitados |
| `$success` | `#28c76f` | Confirmações, status ativo, proficiente |
| `$danger` | `#ea5455` | Erros, exclusões, abaixo do básico |
| `$warning` | `#ffd643` | Alertas, pendentes, pausados |
| `$dark` | `#1e1e1e` | Textos escuros |
| `$info` | `#00cfe8` | Informações, em andamento |

> No `themeConfig.js` os valores têm variação leve:
> `primary: '#6E63E8'` · `success: '#8BC728'` · `danger: '#FE5153'` · `warning: '#FFD643'`

### 2.2 Cores de texto

| Token | Valor | Uso |
|-------|-------|-----|
| `$color-gray-theme` | `#5e5873` | Texto padrão do tema |
| `$color-gray-themeBodyText` | `#6e6b7b` | Corpo de texto |
| `$color-gray-themeLight` | `#babfc7` | Labels, placeholders leves |
| `$color-gray-mutedPlaceholder` | `#b9b9c3` | Placeholder de inputs |
| `$headings-color` | `#2c2c2c` | Títulos h1–h6 |
| `$color-two` | `#2c2c2c` | Texto forte |

### 2.3 Cores de status de missão

| Status | Cor | Token |
|--------|-----|-------|
| Cancelada | `#ea5455` | `$status-canceled` |
| Não iniciada | `#b4b7bd` | `$status-activate` |
| Pausada | `#ffd643` | `$status-paused` |
| Iniciada | `#00cfe8` | `$status-start` |
| Em andamento | `#28c76f` | `$status-in-progress` |
| Finalizada | `#6e63e8` | `$status-finished` |

### 2.4 Cores de legenda (relatórios / avaliações)

| Nível | Cor | Token |
|-------|-----|-------|
| Avançado | `#6e63e8` | `$legend-advanced` |
| Proficiente | `#28c76f` | `$legend-proficient` |
| Básico | `#ff9f43` | `$legend-basic` |
| Abaixo do Básico | `#ea5455` | `$legend-below-basic` |
| Não concluído | `#b4b7bd` | `$legend-not-completed` |
| Em andamento | `#00cfe8` | `$legend-in-progress` |
| Completo (100%) | `#14693a` | `$legend-complete` |

### 2.5 Cores de status de usuário

| Status | Cor | Token |
|--------|-----|-------|
| Ativo | `#28c76f` | `$user-active` |
| Pendente | `#ffd643` | `$user-pending` |
| Rejeitado | `#ea5455` | `$user-rejected` |

### 2.6 Cores de disciplinas

| Disciplina | Cor | Token SCSS |
|------------|-----|-----------|
| Matemática | `#00bdb8` | `$math` / `$color-one` |
| Português | `#ec6300` | `$port` |
| Liga da Cognição | `#5a1a46` | `$liga` |
| Matemática Inglês | `#00bdb8` | `$math-ing` |

### 2.7 Cores de tipo de missão

| Tipo | Cor | Classe CSS |
|------|-----|-----------|
| Individual | `#fd7e14` | `bg-individual` |
| Coletiva | `#7367f0` | `bg-collective` |
| Mista | `#28c76f` | `bg-mix` |
| Escola | `#0d6efd` | `bg-applicationSchool` |
| Casa | `#d63384` | `bg-applicationHouse` |

### 2.8 Cores de Fases da Escrita

| Fase | Cor | Token |
|------|-----|-------|
| Pré-Silábica | `#00bdb9` | `$pre` |
| Silábica Sem Valor | `#28c76f` | `$ssv` |
| Silábica Com Valor | `#299459` | `$scv` |
| Silábica-Alfabética | `#246541` | `$sal` |
| Alfabética | `#7367f0` | `$alf` |
| Ortográfica | `#3b2ec2` | `$ort` |
| Não Avaliados | `#b4b7bd` | `$na` |

### 2.9 Whitelabel — marcas suportadas

| Marca | VUE_APP_WHITELABEL | Cor primary |
|-------|--------------------|-------------|
| Educacross (padrão) | `educacross` | `#6e63e8` |
| Super Ensino | `superensino` | `#0089ca` |
| Seduc | `seduc` | configurável |
| SomosPlay | `somosplay` | configurável |

> Fonte única de verdade das cores whitelabel: `src/consts/whitelabelColors.config.js`

---

## 3. Tipografia

| Propriedade | Valor |
|-------------|-------|
| `font-family-base` | `'Montserrat', Helvetica, Arial, sans-serif` |
| Headings | `#2c2c2c` (dark) |
| Body text | `#6e6b7b` (gray-themeBodyText) |
| `grid-gutter-width` | `0.625rem` |
| `navbar-height` | `3.875rem` |

### Escala de títulos recomendada

```scss
h1 { font-size: 1.75rem; font-weight: 700; color: #2c2c2c; }
h2 { font-size: 1.5rem;  font-weight: 600; color: #2c2c2c; }
h3 { font-size: 1.25rem; font-weight: 600; color: #5e5873; }
h4 { font-size: 1.1rem;  font-weight: 500; color: #5e5873; }
h5 { font-size: 1rem;    font-weight: 500; color: #6e6b7b; }
```

---

## 4. Ícones

### 4.1 Biblioteca principal — Material Symbols Outlined

Todos os ícones do sistema são **Material Symbols Outlined** (não Material Icons).

**Como usar:**
```html
<span class="material-symbols-outlined">home</span>
<span class="material-symbols-outlined align-middle text-primary">visibility</span>
<span class="material-symbols-outlined" style="font-size: 16px">info</span>
```

### 4.2 Ícones usados no menu de navegação (por persona)

**Professor (Teacher):**
`grid_view` · `flag` · `pie_chart` · `map` · `work_outline` · `groups` · `group` · `quiz` · `book_5` · `calendar_today` · `camera` · `file_download` · `screen_search_desktop`

**Aluno (Student):**
`home` · `flag` · `supervisor_account` · `camera`

**Admin:**
`grid_view` · `pie_chart` · `flag` · `auto_stories` · `how_to_reg` · `person_play` · `calendar_today` · `quiz` · `book_5` · `file_download`

**Network Manager:**
(mesmo que Admin) + ícones de transferência

**Auditor:**
`quiz`

### 4.3 Ícones de ações comuns

| Ação | Ícone |
|------|-------|
| Visualizar | `visibility` |
| Info/Tooltip | `info` |
| Editar | `edit` |
| Excluir | `delete` |
| Adicionar | `add` / `add_circle` |
| Buscar | `search` |
| Fechar | `close` |
| Salvar | `save` |
| Download | `file_download` |
| Upload | `upload` |
| Configurar | `settings` |
| Filtrar | `filter_list` |
| Ordenar | `sort` |
| Expandir | `expand_more` |
| Recolher | `expand_less` |
| Calendário | `calendar_today` |
| Gráfico | `pie_chart` / `bar_chart` |
| Usuário | `person` / `group` |
| Escola | `school` |
| Missão | `flag` |
| Livro | `auto_stories` / `book_5` |
| Jogo | `map` / `sports_esports` |
| Conquista | `emoji_events` |
| Estrela | `star` |
| Notificação | `notifications` |
| Sair | `logout` |

### 4.4 Assets SVG de missões (src/assets/icons/mission-icons/)

| Arquivo | Descrição |
|---------|-----------|
| `missao-individual.svg` | Missão individual |
| `missao-coletiva.svg` | Missão coletiva |
| `missao-mista.svg` | Missão mista |
| `missao-math.svg` | Missão de Matemática |
| `missao-portugues.svg` | Missão de Português |
| `missao-liga.svg` | Missão Liga da Cognição |
| `missao-ldc.svg` | Missão LDC |
| `missao-math-ing.svg` | Missão Matemática Inglês |

---

## 5. Imagens, SVGs e Ícones Assets

### 5.1 Como referenciar assets em Vue

```javascript
// Padrão moderno (Vite — usado nos componentes mais recentes)
const flag = new URL('@/assets/images/flags/br.svg', import.meta.url).href

// Padrão BootstrapVue / require (usado na maioria do projeto)
import logo from '@/assets/images/educacross/logo-mini-menu.svg'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue' // ícone como componente Vue

// Em template BootstrapVue
<b-img :src="logo" alt="Logo" />
<b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />

// Como background (CSS)
background-image: url('@/assets/images/images-educa/deep-link/Educa_BG_Espaco.svg');
```

---

### 5.2 Logos

| Arquivo | Uso |
|---------|-----|
| `src/assets/images/logo/logo.svg` | Logo principal (área de login, branding) |
| `src/assets/images/logo/google.svg` | Botão login com Google |
| `src/assets/images/logo/microsoft.svg` | Botão login com Microsoft |
| `src/assets/images/educacross/logo-mini-menu.svg` | Logo mini na vertical nav (sidebar) |

---

### 5.3 Mascotes Belinha (ilustrações)

Usados em estados vazios, erros, redirecionamentos e páginas de suporte.

| Arquivo | Contexto de uso |
|---------|----------------|
| `images/belinha/confusion.svg` | Estado de dados não encontrados / confusão |
| `images/belinha/maintenance.svg` | Página em manutenção |
| `images/belinha/mochila.svg` | Onboarding / início de jornada |
| `images/belinha/redirecting.svg` | Deeplink / redirecionando |
| `images/belinha/regua.svg` | Resultados de avaliação |

**Padrão de uso** (estado vazio de tabela/relatório):
```html
<div class="text-center py-4">
  <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" style="max-width:120px" />
  <p class="text-muted">Nenhum dado encontrado.</p>
</div>
```

---

### 5.4 Ícones de Missão (Vue components)

Caminho base: `src/assets/icons/mission-icons/`

> Estes são **componentes Vue** (não simples SVGs). Importar como componente.

| Componente | SVG equivalente | Missão |
|------------|----------------|--------|
| `MissionPort.vue` | `missao-portugues.svg` | Português |
| `MissionMath.vue` | `missao-math.svg` | Matemática |
| `MissionMathIng.vue` | `missao-math-ing.svg` | Matemática + Inglês |
| `MissionLiga.vue` | `missao-liga.svg` | Liga |
| `BelinhaOptionAll.vue` | `belinha-opcao-todas.svg` | Todas as disciplinas |

**Arquivos SVG adicionais** (não têm Vue wrapper — usar diretamente):
`missao-coletiva.svg` · `missao-individual.svg` · `missao-ldc.svg` · `missao-mista.svg`

```vue
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'

<MissionPort />   <!-- SVG inline com dimensões padrão -->
```

---

### 5.5 Ícones de Tipos de Exercício (Vue components)

Caminho: `src/assets/icons/exercises-types/`

| Componente | Arquivo SVG | Tipo |
|------------|------------|------|
| `FullText.vue` | `full-text.svg` | Texto completo |
| `WordList.vue` | `word-list.svg` | Lista de palavras |

---

### 5.6 Ícones SVG avulsos

Caminho: `src/assets/icons/` (raiz)

| Arquivo | Uso |
|---------|-----|
| `whatsapp.svg` / `whatsapp-primary.svg` | Botão WhatsApp no HelpChat |
| `help-circle.svg` | Ícone de ajuda genérico |
| `classroom.svg` | Turma/sala de aula |
| `house.svg` | Home/início |
| `videogame-asset.svg` | Jogos/games |
| `warning.svg` | Alerta genérico |
| `belinha-opcao-todas.svg` | Opção "todas disciplinas" nos filtros |

**Componentes Vue de redes sociais** (usados no AppFooter):
`icons/facebook-icon.vue` · `icons/instagram-icon.vue` · `icons/youtube-icon.vue`

---

### 5.7 Imagens de eventos e estados de questão

```
src/assets/icons/events/
├── studant-hat.svg        # Chapéu de formatura
├── progress-classes.svg   # Progresso de turmas
├── open-book.svg          # Livro aberto
└── Institution/
    ├── classes-school.svg  # Turmas da escola
    ├── regressive.svg      # Contagem regressiva
    ├── retro-joystick.svg  # Joystick retro
    └── watch.svg           # Relógio / tempo

src/assets/images/questionAnswerStatus/
├── Right.svg              # Resposta correta ✓
├── Unanswered.svg         # Não respondida
├── Undisplayed.svg        # Não exibida
└── Annulled.svg           # Anulada
```

---

### 5.8 Imagens de páginas de erro e login

```
src/assets/images/pages/
├── error.svg / error-dark.svg / error-partner.svg
├── warning.svg
└── 404/                   # Fundo espacial (404.svg, background.svg, saturn.svg...)

src/assets/images/pages/login/
├── background.svg         # Fundo da página de login
├── Belinha.svg            # Mascote corujinha
├── Eugenio.svg            # Personagem secundário
└── LogoLogin.svg          # Logo na tela de login
```

---

### 5.9 Ícones de fruta (avatares de níveis)

Caminho: `src/assets/images/fruits/`
Arquivos: `A.svg` `B.svg` `C.svg` `D.svg` `E.svg` `F.svg` `G.svg` `H.svg` `I.svg` `J.svg` `K.svg` `L.svg` `M.svg` `N.svg`

> 14 ícones — representam níveis/fases de progresso do aluno.

---

### 5.10 Assets de PDF / relatórios

```
src/assets/images/pdf/
├── bg-certificate.svg             # Fundo de certificado
├── report/
│   ├── alert-icon.svg             # Alerta no relatório
│   ├── logo/educacros-logo-report.svg
│   ├── card/                      # Ícones de cards: progress, games, challenge...
│   └── performance/               # Ícones por campo de conhecimento (algebra, geometry...)
```

---

## 6. Componentes do Design System

> **Padrão arquitetural**: A maioria dos componentes **não tem CSS scoped próprio**. O visual é composto
> por: (1) classes utilitárias de `main.scss`, (2) estilos gerados de `programmatically-class.scss`,
> (3) estilos nativos do BootstrapVue. Os poucos que têm `<style scoped>` estão documentados abaixo.

### 6.1 Componentes base (BootstrapVue)

O projeto usa **BootstrapVue** como biblioteca base. Componentes com prefixo `b-`:

```html
<!-- Card -->
<b-card bg-variant="" border-variant="" body-class="">
  <b-card-text>...</b-card-text>
</b-card>

<!-- Badge -->
<b-badge variant="success">Ativo</b-badge>
<b-badge variant="danger">Cancelado</b-badge>
<b-badge variant="light-primary" pill class="border-primary px-2 py-25">Label</b-badge>

<!-- Button -->
<b-button variant="primary" size="sm">Ação</b-button>
<b-button variant="outline-primary">Secundário</b-button>
<b-button variant="link" class="p-0 font-bold">Link</b-button>

<!-- Input -->
<b-form-input v-model="value" placeholder="..." />

<!-- Avatar -->
<b-avatar variant="primary" rounded="sm" size="lg">
  <span class="material-symbols-outlined">flag</span>
</b-avatar>

<!-- Skeleton loading -->
<b-skeleton-wrapper :loading="isLoading">
  <template #loading><b-skeleton-img /></template>
  <!-- conteúdo real -->
</b-skeleton-wrapper>
```

---

### 6.2 Componente MediaCard

**Caminho**: `src/components/card/MediaCard.vue`
**Estilo próprio**: ❌ Nenhum — usa `b-card` + `b-media` do BootstrapVue + classes utilitárias globais.

```vue
<MediaCard
  title="Título do Card"
  icon="flag"
  variant="primary"
  :loading="false"
  :event-click="() => navigate(item)"
  tooltip-text="Dica sobre este item"
>
  <template #description>
    <strong>42</strong> missões ativas
  </template>
</MediaCard>
```

**Renderização interna**: `b-card` → `b-media` → aside com `<MediaCardIcon>` (b-avatar) + corpo com `h5` (título) + `h4` (valor via slot `#description`)
**Props**: `bgVariant` · `titleColor` · `classVariant` · `verticalAlign` · `tooltipText` · `title` · `icon` · `variant` · `loading` · `rightAlign` · `borderVariant` · `eventClick`

#### MediaCardIcon
**Renderização**: `<b-avatar variant="{variant}" rounded="sm" size="lg">` com Material Symbol dentro.
Exemplo:
```html
<b-avatar variant="primary" rounded="sm" size="lg">
  <span class="material-symbols-outlined" style="font-size:22px">flag</span>
</b-avatar>
```

---

### 6.3 Componente ESelect (seletor avançado)

**Caminho**: `src/components/selects/ESelect.vue`
**Estilo próprio**: ✅ `<style lang="scss" scoped>` — CSS customizado completo para o dropdown.

```vue
<ESelect
  v-model="selectedValue"
  :options="listOptions"
  label="name"
  track-by="id"
  placeholder="Selecione..."
  :multiple="false"
  :searchable="true"
  :loading="loading"
  variant="primary"
/>
```

**Props principais**: `options` (obrigatório) · `label` (padrão `'name'`) · `trackBy` (padrão `'id'`) · `multiple` · `searchable` · `loading` · `variant` · `state` · `clearable` · `paginated`

**CSS interno (scoped)**:
```scss
.e-select-container {
  position: relative; overflow: hidden;
  display: flex; flex-direction: row; align-items: center;
  padding-right: 30px; flex-wrap: nowrap;
}
.icon-container { position: absolute; top: 0; right: 0; display: flex; align-items: center; height: 100%; }
.options-container {
  visibility: hidden; pointer-events: none;
  position: absolute; top: calc(100% + 1px); left: 0;
  min-width: 100%; max-height: calc(38px * 5); overflow-y: auto;
  border: 1px solid #ccc; border-radius: 4px; background-color: #fff; z-index: 3;
  &.opened { visibility: visible; pointer-events: all; }
}
.option {
  cursor: pointer; min-height: 38px; display: flex; align-items: center;
  border: 1px solid #fff; border-radius: 6px; margin: 1px 0;
  &:hover { background-color: #eee; }
  &.selected:hover { border-color: var(--e-select-variant); } /* usa CSS var do variant */
}
.drop-icon { transition: transform 0.2s ease-in-out; font-size: 1.5rem;
  &.revert-drop-icon { transform: rotate(180deg); } }
.clear-button { border: none; background-color: transparent; transition: color 0.2s ease-in-out;
  &:hover { color: $danger; } cursor: pointer; }
.disabled, .disabled .option { cursor: not-allowed; }
```

---

### 6.4 Componente ListTable (tabela principal)

**Caminho**: `src/components/table/ListTable.vue`
**Estilo próprio**: ✅ Dois blocos — um `scoped` + um global (para penetrar no BootstrapVue).

```vue
<ListTable
  :data="tableData"
  :columns="columns"
  :loading="isLoading"
  :total="totalRecords"
  :per-page="perPage"
  @page-changed="handlePage"
>
  <template #cell(status)="{ item }">
    <BadgeStatus :value="item.status" :enum-map="statusEnum" />
  </template>
  <template #cell(actions)="{ item }">
    <b-button size="sm" variant="outline-primary" @click="edit(item)">
      <span class="material-symbols-outlined" style="font-size:18px">edit</span>
    </b-button>
  </template>
</ListTable>
```

**Funcionalidades**: busca com debounce · paginação server-side · exportação Excel · responsivo · slots por célula

**CSS interno**:
```scss
/* scoped */
.searchQuery { border-left: 0; padding-left: 0; }            /* une ícone ao input de busca */
#searchQueryIcon .material-symbols-outlined { font-size: 18px; }
.per-page-selector { width: 90px; min-width: 90px; }
.card-border { border: 1px solid #d8d6de; box-shadow: none; }

/* global — para penetrar no b-table do BootstrapVue */
#list-table .thead-row th {
  vertical-align: middle !important;
  div { text-transform: uppercase; font-weight: 600; }
}
```

---

### 6.5 Componente EFormCheck (checkbox)

**Caminho**: `src/components/form/EFormCheck.vue`
**Estilo próprio**: ✅ Pequeno bloco scoped.

```vue
<EFormCheck v-model="isChecked" :indeterminate="someSelected" />
```

**CSS interno**:
```scss
.checkbox-container {
  display: flex; align-items: center;
  cursor: pointer; width: 24px;
  &.disabled { cursor: not-allowed; color: var(--secondary); }
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  box-shadow: none;
}
```

---

### 6.6 ExpandableFilterArea (filtros recolhíveis)

**Caminho**: `src/components/filter/ExpandableFilterArea.vue`
**Estilo próprio**: ❌ Animação feita via **JS hooks** no `<transition>` (sem CSS). Botão usa `btn btn-link p-0 font-bold`.

**Ícones usados no toggle**:
- Abrir filtros: `filter_alt` · fechar: `filter_alt_off`
- Seta: `keyboard_arrow_down` ↔ `keyboard_arrow_up`

**Animação JS** (não adicionar CSS — já está implementado):
```javascript
// beforeEnter: maxHeight=0, opacity=0, overflow=hidden
// enter: maxHeight=scrollHeight, opacity=1
// afterEnter: limpa inline styles
```

---

### 6.7 BadgeStatus

**Caminho**: `src/components/badge/BadgeStatus.vue`
**Estilo próprio**: ✅ Dois micro-overrides.

Renderiza `<b-badge>` com variant e ícone Material Symbol, tudo dirigido por enum:

```vue
<b-badge
  :pill="pill"
  :variant="`light-${enumObject.variant}`"
  :class="`border-${enumObject.variant} text-uppercase px-2 py-25 d-flex align-items-center gap-1`"
>
  <span :class="`material-symbols-outlined text-${enumObject.variant}`" style="font-size: 12px">
    {{ enumObject.icon }}
  </span>
  {{ enumObject.label }}
</b-badge>
```

**CSS interno**:
```scss
.badge-light-dark-gray,
.badge-light-light-gray { background: #fff; }
.whitespace-normal { white-space: normal !important; }
```

---

### 6.8 Componente Tab (abas com estilo de pasta)

**Caminho**: `src/components/tab/Tab.vue`
**Estilo próprio**: ✅ CSS completo com SCSS vars.

**CSS interno**:
```scss
.tab-line { border: 1px solid $primary; height: 1px; width: 100%; margin-bottom: 1rem; }
.tabs-row {
  flex-wrap: nowrap; overflow-x: auto; scrollbar-width: thin;
  .tab-link {
    display: inline-block; position: relative;
    padding: 14px 24px 10px 24px;
    border-radius: 15px 15px 0 0;          /* formato "pasta/aba" */
    box-shadow: 0px 0px 8px rgba(0,0,0,0.14);
    cursor: pointer;
    color: $color-gray-themeBodyText;
    background: $white;
    transform: translateX(calc(var(--index) * var(--offset)));  /* sobreposição das abas */
    white-space: nowrap;
    &:hover { color: $white; background-color: $primary; }
    &.active { background: $primary; color: $white; z-index: 1; }
  }
}
```

---

### 6.9 ProgressBarHorizontal

**Caminho**: `src/components/progessBar/ProgressBarHorizontal.vue`
**Estilo próprio**: ✅ Classes de fundo com 12% opacidade.

```scss
.bg-progress-bar-danger  { background: rgba(234, 84, 85, 0.12); }
.bg-progress-bar-warning { background: rgba(250, 184, 74, 0.12); }
.bg-progress-bar-success { background: rgba(40, 199, 111, 0.12); }
.font-size-md { font-size: 14px; }
```

---

### 6.10 Componentes de Gráficos (ApexCharts)

**Caminhos**: `src/components/chart/PieChart.vue` · `RadialBar.vue`

```vue
<!-- Rosquinha/pizza -->
<PieChart :series="[40, 30, 30]" :labels="['A', 'B', 'C']" />

<!-- Radial (KPI circular) -->
<RadialBar :value="78" label="Proficiência" color="#28c76f" />
```

**CSS do PieChart (tooltip)**:
```scss
.arrow_box {
  font-size: 12px; background: #fff; border: 1px solid #d8d6de;
  padding: 0 5px; border-radius: 4px; display: flex; align-items: center; gap: 5px;
}
#chart .apexcharts-tooltip {
  background: transparent !important; overflow: visible !important;
  color: #fff; transform: translateX(10px) translateY(10px);
}
```

---

### 6.11 useFilters (filtros globais)

**OBRIGATÓRIO** em qualquer tela com filtros de turma/disciplina/aluno:

```javascript
import useFilters from '@/store/filters/useFilters'

const { subject, subjects, classe, classes, fetchSubjects } = useFilters()
// subject.value.id, classe.value.ClassId — sempre reativos
```

---

### 6.12 DynamicMediaCard

**Caminho**: `src/components/card/DynamicMediaCard.vue`
**Diferença do MediaCard**: aceita ícone de tamanho maior (78×78px) e texto com peso 400.
**Estilo próprio**: ✅

```vue
<DynamicMediaCard title="Missões Ativas" icon="flag" variant="primary" />
```

**CSS interno**:
```scss
h5 { font-weight: 400; font-size: 1.15rem; }
.material-symbols-outlined.dynamic-card-icon-info { font-size: 16px; }
.icon-container { height: 78px; width: 78px; }   /* container do ícone maior que MediaCard */
.icon { font-size: 46.67px; align-self: center; }
```

---

### 6.13 Modais (`b-modal`)

Todos os modais usam **BootstrapVue `<b-modal>`**. Padrão de abertura via `this.$bvModal.show('modal-id')` ou `ref.show()`.

#### DefaultFAQModal
**Caminho**: `src/components/modal/DefaultFAQModal.vue`
**ID**: `faq-modal` · Props: `centered`, `hide-footer`, `size="lg"`, `content-class="shadow"`

**CSS interno**:
```scss
.material-symbols-outlined.support-icon { font-size: 48px; }  /* ícone de suporte grande */

.modal-content-navBar {
  display: flex; flex-direction: row; justify-content: center;
  .close { margin: 0; position: absolute !important; right: 20px !important; top: 10px !important; }
  .modal-container {
    display: flex; flex-direction: column; align-items: center; padding: 20px 0;
    .modal-header-icon {
      color: #7367f0;               /* primary hardcoded — componente legado */
      padding: 16px;
      background: rgba(115, 103, 240, 0.12);  /* light-primary manualmente */
      border-radius: 10px;
    }
    .modal-header-text { padding-top: 15px; font-weight: 500; font-size: 21px; line-height: 26px; }
    .modal-content-infos-container {
      border: 1px solid #7367f0; border-radius: 10px; padding: 16px; text-align: center;
      .modal-content-infos-text-header { font-weight: 500; font-size: 18px; }
      .modal-content-infos-text-content { font-weight: 400; font-size: 14px; line-height: 24px; }
    }
  }
}
```

#### GameDetailsModal / StudentGameDetailsModal
**Caminho**: `src/components/modal/GameDetailsModal.vue` · `StudentGameDetailsModal.vue`
**ID**: `student-detail-modal`

**CSS interno**:
```scss
/* GameDetailsModal */
.modal-game-image { width: 95px; height: 95px; }
.dot-list { height: 3px; width: 3px; border-radius: 50%; background-color: #6e6b7b; } /* separador de lista */
.title-activity { word-break: break-word; color: #6b6b6b; }
.firstActivityColumn-image { min-width: 100px; }
.secondActivityColumn-description { flex: 1; }
.back {                          /* botão voltar absoluto no canto */
  position: absolute; top: -2px; right: 30px;
  padding: 0.7rem; box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
  border-radius: 0.357rem; background: #fff; color: #5e5873;
  transition: all 0.23s ease 0.1s;
  &:hover { transform: translate(-3px, 5px); }
}
/* Global override de carousel */
.carousel-indicators > li {
  height: 10px; width: 10px; border-radius: 50%;
  background-color: #6e63e8 !important;  /* primary */
}

/* StudentGameDetailsModal (mesmo id, versão simplificada) */
.modal-game-image { width: 95px; height: 95px; }
```

#### ZipLoading
**Caminho**: `src/components/modal/ZipLoading.vue` — modal de progresso de download ZIP.

**CSS interno** (global, sem scoped — impacta toda a página enquanto aberto):
```scss
.working {
  display: flex; justify-content: center; align-items: center;
  flex-direction: column; color: #5e5873;
  .title { font-size: 28px; font-weight: 600; text-align: center; margin-top: 1.5rem;
    &:first-letter { text-transform: uppercase; } }
  .subtitle { font-size: 21px; font-weight: 500; text-align: center; margin-top: 24px; }
  .tryAgain { color: #6e63e8; cursor: pointer; text-decoration: underline; }
  .progress-container {
    width: 50%; text-align: center;
    @media (max-width: 425px) { width: 100%; }
    .title { font-size: 21px; font-weight: 500; color: #28c76f; margin-bottom: 1rem; }
  }
}
```

#### Padrão de abertura de modal
```javascript
// Via ref (usado com hide-footer/centered)
this.$refs['faq-modal'].show()
this.$refs['faq-modal'].hide()

// Via $bvModal (global)
this.$bvModal.show('student-detail-modal')
this.$bvModal.hide('student-detail-modal')
```

---

## 7. Padrões de Layout

### 7.1 Estrutura geral de página

```vue
<template>
  <div>
    <!-- Breadcrumb automático via router meta -->

    <!-- Filtros (quando necessário) -->
    <ExpandableFilterArea>
      <ESelect v-model="filters.classe" :options="classes" label="name" placeholder="Turma" />
      <ESelect v-model="filters.subject" :options="subjects" label="name" placeholder="Disciplina" />
    </ExpandableFilterArea>

    <!-- Conteúdo principal -->
    <b-row>
      <!-- Cards de KPI -->
      <b-col md="3">
        <MediaCard title="Total Alunos" icon="group" variant="primary">
          <template #description><strong>384</strong></template>
        </MediaCard>
      </b-col>
    </b-row>

    <!-- Tabela ou gráfico -->
    <b-card>
      <ListTable :data="data" :columns="columns" :loading="loading" />
    </b-card>
  </div>
</template>
```

### 7.2 Padrão de card de relatório

```vue
<b-card class="shadow-sm">
  <b-card-header class="d-flex justify-content-between align-items-center pb-1">
    <h5 class="mb-0">Título do Relatório</h5>
    <b-button variant="outline-primary" size="sm">
      <span class="material-symbols-outlined" style="font-size:16px">file_download</span>
      Exportar
    </b-button>
  </b-card-header>
  <b-card-body>
    <!-- conteúdo -->
  </b-card-body>
</b-card>
```

### 7.3 Padrão de header de página

```vue
<div class="d-flex justify-content-between align-items-center mb-2">
  <div>
    <h3 class="mb-0">{{ pageTitle }}</h3>
    <small class="text-muted">{{ pageSubtitle }}</small>
  </div>
  <b-button variant="primary" @click="create">
    <span class="material-symbols-outlined align-middle" style="font-size:18px">add</span>
    Novo
  </b-button>
</div>
```

### 7.4 Grid system (Bootstrap 5)

```
Breakpoints: xs(<576), sm(≥576), md(≥768), lg(≥992), xl(≥1200), xxl(≥1400)
Gutter: 0.625rem (10px) — menor que o Bootstrap padrão
```

---

## 8. Padrões de componente Vue

### 8.1 Estrutura padrão de componente

```vue
<script setup>
import { ref, computed, onMounted } from '@vue/composition-api'
import useFilters from '@/store/filters/useFilters'

// props
const props = defineProps({ ... })

// composables
const { subject, classe } = useFilters()

// estado local
const loading = ref(false)
const data = ref([])

// computed
const filteredData = computed(() => ...)

// lifecycle
onMounted(async () => {
  await fetchData()
})

// métodos
const fetchData = async () => {
  loading.value = true
  try { ... } finally { loading.value = false }
}
</script>

<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>...</template>
      <!-- conteúdo real -->
    </b-skeleton-wrapper>
  </div>
</template>

<style scoped>
</style>
```

### 8.2 Convenções de nomenclatura

- Componentes: **PascalCase** (`MissionCard`, `ESelect`)
- Prefixo `E`: componentes core reutilizáveis
- Props: **camelCase** (`isLoading`, `eventClick`)
- Eventos: **kebab-case** (`page-changed`, `filter-change`)
- Arquivos: **PascalCase.vue** para componentes, **camelCase.js** para composables

### 8.3 Eventos padrão

```javascript
emits: ['input', 'change', 'update:modelValue', 'loading', 'error']
```

---

## 9. Roles e navegação (referência rápida)

| Role | Arquivo nav | Acesso |
|------|-------------|--------|
| `Teacher` | `navigation/vertical/teacher.js` | Missões, Relatórios, Turmas, Avaliações, Eventos |
| `Student` | `navigation/vertical/student.js` | Missões, Treinos da Família, High Five |
| `Admin` | `navigation/vertical/admin.js` | Todos os módulos da escola |
| `NetworkManager` | `navigation/vertical/networkManager.js` | Admin + multi-escola + transferência |
| `Auditor` | `navigation/vertical/auditor.js` | Fluência Leitora apenas |

---

## 9b. CSS — Classes utilitárias reais (main.scss + programmatically-class.scss)

> **CRÍTICO**: As cores NO CSS usam **CSS custom properties**, não hex direto.
> Padrão: `rgba(var(--primary), 1)` — nunca `#6e63e8` inline em Vue.

### 9b.1 Como usar cores em CSS/style

```scss
/* ✅ CORRETO — respeita whitelabel */
color: rgba(var(--primary), 1);
background: rgba(var(--success), 1);

/* ❌ ERRADO — quebra whitelabel */
color: #6e63e8;
background: #28c76f;
```

### 9b.2 Classes utilitárias geradas automaticamente

Para cada variante (`primary`, `success`, `danger`, `warning`, `secondary`, `dark`, `grey`, `grey-light`, `white`, `black`) e todas as `$theme-colors`:

| Classe | Efeito |
|--------|--------|
| `.bg-st-{variant}` | `background: rgba(cor, 0.12)` — fundo suave |
| `.color-{variant}` | `color: cor` — texto colorido |
| `.shadow-{variant}` | `box-shadow: 0 0 10px cor` |
| `.border-{variant}` | `border-color: cor` |

Exemplos práticos:
```html
<!-- Fundo roxo suave (primary 12% opacidade) -->
<div class="bg-st-primary">...</div>

<!-- Fundo verde suave (success 12% opacidade) -->
<div class="bg-st-success">...</div>

<!-- Fundo laranja suave (tema "orange") -->
<div class="bg-st-orange">...</div>

<!-- Texto colorido -->
<span class="color-primary">Texto roxo</span>
<span class="color-math">Texto teal matemática</span>
<span class="color-port">Texto laranja português</span>

<!-- Sombra colorida -->
<div class="shadow-primary">...</div>
```

### 9b.3 Classes de cor semânticas (Bootstrap override)

```html
<!-- Texto -->
<span class="text-primary">...</span>   <!-- rgba(var(--primary), 1) -->
<span class="text-success">...</span>
<span class="text-danger">...</span>
<span class="text-warning">...</span>
<span class="text-dark">...</span>
<span class="text-royal-blue">...</span> <!-- #5e50ee -->

<!-- Background sólido -->
<div class="bg-primary">...</div>
<div class="bg-success">...</div>
<div class="bg-gray">...</div>           <!-- #b9b9c3 -->

<!-- Border -->
<div class="border-primary">...</div>
<div class="border-gray-theme">...</div>

<!-- Hover (usados em itens clicáveis) -->
<div class="hover:bg-primary hover:text-white">...</div>
```

### 9b.4 Gradientes

```html
<!-- Gradiente 118deg — background de cards e headers -->
<div class="bg-primary-gradient">...</div>   <!-- primary 100% → 70% -->
<div class="bg-success-gradient">...</div>
<div class="bg-danger-gradient">...</div>
<div class="bg-warning-gradient">...</div>
<div class="bg-dark-gradient">...</div>
```

CSS gerado: `linear-gradient(118deg, rgba(var(--primary), 1), rgba(var(--primary), 0.7))`

### 9b.5 Utilitários de texto

```html
<p class="truncate">Texto longo que corta com elipsis...</p>
<p class="text-big">Número gigante (4rem)</p>
<p class="text-color-base">Texto base #626262</p>
```

### 9b.6 Utilitários de blur e z-index

```html
<div class="blur-1">...</div>  <!-- filter: blur(1px) -->
<div class="blur-2">...</div>  <!-- filter: blur(2px) -->
<div class="blur-3">...</div>  <!-- filter: blur(3px) -->
<div class="z-1">...</div>     <!-- z-index: 1 -->
<div class="z-0">...</div>     <!-- z-index: 0 -->
<div class="z-n1">...</div>    <!-- z-index: -1 -->
```

### 9b.7 Utilitários de print

```html
<div class="printOcult">Não aparece ao imprimir</div>
```

### 9b.8 Fundo padrão de página

```scss
$theme-background: #efefef;  /* fundo cinza claro das páginas */
$content-color: #626262;     /* cor base do conteúdo */
```

### 9b.9 Padrão de cor para Missão (tipo e disciplina)

```html
<!-- Tipo de missão (fundo) -->
<span class="bg-st-individual">Individual</span>  <!-- #fd7e14 12% -->
<span class="bg-st-collective">Coletiva</span>     <!-- #7367f0 12% -->
<span class="bg-st-mix">Mista</span>               <!-- #28c76f 12% -->

<!-- Disciplina (cor de texto) -->
<span class="color-math">Matemática</span>   <!-- #00bdb9 -->
<span class="color-port">Português</span>    <!-- #ec6300 -->
<span class="color-liga">Liga LDC</span>     <!-- #5a1a46 -->
```

### 9b.10 Transições de página (router)

| Classe CSS | Efeito |
|-----------|--------|
| `.zoom-fade-*` | Scale 0.97↔1.03 + fade (padrão do app) |
| `.fade-*` | Opacity simples |
| `.slide-fade-*` | Slide horizontal + fade |
| `.fade-bottom-*` | Slide vertical sutil + fade |
| `.zoom-out-*` | Scale 0→1 + fade |

### 9b.11 Onde está o CSS fonte

| Arquivo | Conteúdo |
|---------|----------|
| `src/assets/scss/variables/_variables.scss` | Todas as variáveis SCSS ($primary, $success, etc.) |
| `src/assets/scss/variables/_whitelabel-colors.scss` | Override por whitelabel (gerado em build) |
| `src/assets/scss/main.scss` | Classes utilitárias, padrões de componentes (1648 linhas) |
| `src/assets/scss/programmatically-class.scss` | Geração automática de `.bg-st-*`, `.color-*`, `.shadow-*`, `.border-*` |
| `src/assets/scss/style.scss` | Entry point do CSS; importa variáveis + min overrides |
| `src/assets/css/main.css` | CSS compilado (referência de leitura) |
| `src/consts/whitelabelColors.config.js` | Fonte única de verdade das cores por whitelabel |

---

## 11. Lookup On-Demand via MCP (componentes secundários)

Para componentes **não listados nesta SKILL**, use as ferramentas do servidor MCP `design-system` (stdio) para consultar o frontoffice em tempo real:

| Ferramenta | Descrição | Exemplo de uso |
|---|---|---|
| `list_components` | Lista todos os `.vue` do frontoffice agrupados por pasta | — |
| `search_component(query)` | Busca componente por nome parcial | `search_component("Badge")` |
| `get_component(path)` | Lê o conteúdo completo de um `.vue` | `get_component("base/BaseBadge.vue")` |
| `get_consts(fileName)` | Lê um arquivo de `src/consts/` ou `src/store/` | `get_consts("legends/index.js")` |
| `get_scss(scssPath)` | Lê um arquivo SCSS de `src/assets/scss/` | `get_scss("main.scss")` |

### Fluxo recomendado

1. Procure o componente aqui na SKILL primeiro (seções 1–10)
2. Se não encontrar → use `search_component("NomeDoComponente")`
3. Com o path encontrado → use `get_component("pasta/Componente.vue")`
4. Adapte o padrão Vue 2 (BootstrapVue, `b-tag`) para Vue 3 (HTML nativo + CSS vars do projeto)

> **Atenção**: O frontoffice usa Vue 2 + BootstrapVue. Ao adaptar para prototipação (Vue 3), substitua `<b-card>`, `<b-badge>` etc. por HTML semântico com as CSS vars de `src/style.css`.

---

## 10. Links úteis

| Recurso | URL |
|---------|-----|
| Design System online | https://fabioeducacross.github.io/DesignSystem-Vuexy/ |
| Repositório frontoffice (local) | `C:\Users\Educacross\Documents\Educacross\educacross-frontoffice\educacross-frontoffice\` |
| Wiki do projeto | `educacross-frontoffice/wiki/` |
| Componentes documentados | `wiki/Components/Home.md` |
| Cores whitelabel | `src/consts/whitelabelColors.config.js` |
| Variáveis SCSS | `src/assets/scss/variables/_variables.scss` |
| themeConfig | `themeConfig.js` |
```
