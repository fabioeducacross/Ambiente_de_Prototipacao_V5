# Copilot Instructions - Ambiente de Prototipação V5

> **⚠️ IMPORTANTE - Pasta de Referência**  
> A pasta `educacross-frontoffice` anexada ao workspace é **SOMENTE PARA CONSULTA** de arquivos, jornadas, ícones e informações sobre desenvolvimento. **NÃO PROGRAMAR NADA NESSA PASTA**. Todo o desenvolvimento deve ser feito APENAS na pasta `Ambiente_de_Prototipacao_V5`.

## Visão Geral do Projeto

Ambiente de prototipação com **2 sub-projetos integrados**:
1. **Aplicação Vue 3** (`src/`) - Protótipos interativos de jornadas educacionais
2. **Documentação Docusaurus** (`documentation/`) - Design System + 50+ jornadas documentadas

## Arquitetura

### Aplicação Vue 3 (Protótipos)
- **Frontend**: Vue 3 com Composition API e `<script setup>` syntax
- **Router**: Vue Router com history mode (3 rotas: `/`, `/jornadas`, `/jornada/:id`)
- **Design System**: Vuexy color palette + Bootstrap Icons (importado via CDN em `src/style.css`)
- **Data**: JSON estático em `src/data/journeys.json` - importado diretamente nos componentes (sem API)
- **Build**: Vite (dev server na porta 5173)

### Documentação Docusaurus
- **Framework**: Docusaurus 3.9.2 + TypeScript
- **Icons**: Material Symbols (194 ícones migrados - ver `documentation/ICON_MIGRATION_COMPLETE.md`)
- **Servidor**: Porta 3000 (via `npm start` na raiz ou `npm start --prefix documentation`)
- **Build**: `documentation/build/` - site estático pronto para deploy

## Convenções de Código

### Vue Components

```vue
<script setup>
// Sempre use Composition API com <script setup>
import { ref, computed } from 'vue'
</script>

<template>
  <!-- Template HTML -->
</template>

<style scoped>
  /* Estilos com escopo do componente */
</style>
```

### Estrutura de Dados

Todas as jornadas seguem este schema em `src/data/journeys.json`:

```json
{
  "id": 1,
  "titulo": "string",
  "descricao": "string",
  "categoria": "string",
  "duracao": "string",
  "nivel": "Iniciante" | "Intermediário" | "Avançado",
  "objetivos": ["string"],
  "modulos": [{
    "id": 1,
    "nome": "string",
    "licoes": number,
    "duracao": "string"
  }],
  "status": "ativo" | "inativo"
}
```

### Paleta de Cores Vuexy

Use as CSS custom properties definidas em `src/style.css`:

- `--primary: #7367F0` (roxo - ações principais)
- `--success: #28C76F` (verde - nível iniciante)
- `--warning: #FF9F43` (laranja - nível intermediário)
- `--danger: #EA5455` (vermelho - nível avançado)
- `--info: #00CFE8` (ciano - informações)

### Badges de Nível

Pattern usado em `JourneyList.vue` e `JourneyDetail.vue`:

```javascript
const getBadgeClass = (nivel) => {
  const classes = {
    'Iniciante': 'badge-success',
    'Intermediário': 'badge-warning',
    'Avançado': 'badge-danger'
  }
  return classes[nivel] || 'badge-primary'
}
```

## Estrutura de Views

### Views principais (src/views/)

1. **Home.vue** - Landing page com hero section gradiente e cards de features
2. **JourneyList.vue** - Grid de cards das jornadas (3 colunas, responsivo)
3. **JourneyDetail.vue** - Layout 2 colunas (8/4): conteúdo principal + sidebar sticky

### Pattern de navegação

```javascript
// Importar JSON diretamente
import journeysData from '../data/journeys.json'

// Para listas
const journeys = ref(journeysData)

// Para detalhes (usando route params)
const route = useRoute()
const journeyId = computed(() => parseInt(route.params.id))
const journey = ref(journeysData.find(j => j.id === journeyId.value))
```

## Comandos de Desenvolvimento

### Aplicação Vue 3
```bash
npm run dev      # Inicia dev server Vue (http://localhost:5173)
npm run build    # Build de produção
npm run preview  # Preview do build
```

### Documentação Docusaurus
```bash
npm start                      # Inicia Docusaurus (http://localhost:3000) - na raiz
npm start --prefix documentation  # Ou dentro de documentation/
cd documentation && npm run build # Build documentação
```

## Guidelines para Novas Features

1. **Sem Backend**: Não adicionar chamadas API - usar apenas JSON local
2. **Scoped Styles**: Sempre usar `<style scoped>` nos componentes
3. **Bootstrap Icons**: Usar classes `bi bi-*` para ícones (já importado globalmente)
4. **Responsividade**: Usar classes `.col-md-*` e media queries em `@media (max-width: 768px)`
5. **Card Pattern**: Seguir estrutura `.card > .card-header/.card-body/.card-footer` com hover effects
6. **Gradientes**: Hero sections usam `linear-gradient(135deg, #7367F0 0%, #9E95F5 100%)`

## Workflow Git (Protótipos)

**Branch Strategy** (ver `PROTOTYPES-WORKFLOW.md` para detalhes):
- `prototypes/as-is` - Baseline que replica produção (nunca desenvolver aqui)
- `prototypes/feature/*` - Branches para protótipos TO-BE (ex: `prototypes/feature/education-system-v2`)

**Fluxo típico**:
1. Partir de `prototypes/as-is` para criar feature branch
2. Desenvolver protótipo com commits frequentes
3. Deploy automático gera preview URL
4. Após aprovação: migrar para `educacross-frontoffice` (produção)
5. Atualizar `prototypes/as-is` com tag (ex: `as-is-v1.1`)
6. Deletar feature branch

## Skills Locais

| Skill | Arquivo | Quando usar |
|-------|---------|-------------|
| `educacross-design-system` | `.agents/skills/educacross-design-system/SKILL.md` | **SEMPRE** ao construir ou revisar telas, componentes, protótipos ou qualquer UI do Educacross. Contém: paleta de cores completa (tokens SCSS), tipografia, ícones (Material Symbols), componentes (`ESelect`, `ListTable`, `MediaCard`, `EFormCheck`, gráficos), padrões de layout, roles e assets. |
| `web-design-guidelines` | `.agents/skills/web-design-guidelines/SKILL.md` | Ao revisar UI para conformidade com boas práticas web |

## Servidores MCP Locais

| Servidor | Tipo | Descrição | Ferramentas |
|----------|------|-----------|-------------|
| `figma` | HTTP | Integração com Figma (design, diagramas) | `get_design_context`, `generate_diagram` |
| `design-system` | stdio | Lookup on-demand de componentes do `educacross-frontoffice` | `list_components`, `get_component`, `search_component`, `get_consts`, `get_scss` |

> Para consultar componentes secundários não cobertos pela SKILL, use as ferramentas do servidor `design-system`. Ver seção 11 da SKILL `educacross-design-system` para o fluxo detalhado.

## Referências

- Design System completo: https://fabioeducacross.github.io/DesignSystem-Vuexy/
- Design System local (SOMENTE LEITURA): `C:\Users\Educacross\Documents\Educacross\educacross-frontoffice\`
- Organização: https://educacross.com.br/
- Status do projeto: `PROJECT_STATUS.md`
- Workflow completo: `PROTOTYPES-WORKFLOW.md`
