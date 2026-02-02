# Copilot Instructions - Ambiente de Prototipação V5

> **⚠️ IMPORTANTE - Pasta de Referência**  
> A pasta `educacross-frontoffice` anexada ao workspace é **SOMENTE PARA CONSULTA** de arquivos, jornadas, ícones e informações sobre desenvolvimento. **NÃO PROGRAMAR NADA NESSA PASTA**. Todo o desenvolvimento deve ser feito APENAS na pasta `Ambiente_de_Prototipacao_V5`.

## Visão Geral do Projeto

Ambiente de prototipação para criar e testar jornadas educacionais usando **Vue 3 + Vite** com Design System baseado no Vuexy. O projeto usa um banco de dados JSON simples e não tem backend - todos os dados vêm de `src/data/journeys.json`.

## Arquitetura

- **Frontend**: Vue 3 com Composition API e `<script setup>` syntax
- **Router**: Vue Router com history mode (3 rotas principais)
- **Design System**: Vuexy color palette + Bootstrap Icons
- **Data**: JSON estático em `src/data/journeys.json` - importado diretamente nos componentes
- **Build**: Vite (dev server na porta 5173)

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

```bash
npm run dev      # Inicia dev server (http://localhost:5173)
npm run build    # Build de produção
npm run preview  # Preview do build
```

## Guidelines para Novas Features

1. **Sem Backend**: Não adicionar chamadas API - usar apenas JSON local
2. **Scoped Styles**: Sempre usar `<style scoped>` nos componentes
3. **Bootstrap Icons**: Usar classes `bi bi-*` para ícones (já importado globalmente)
4. **Responsividade**: Usar classes `.col-md-*` e media queries em `@media (max-width: 768px)`
5. **Card Pattern**: Seguir estrutura `.card > .card-header/.card-body/.card-footer` com hover effects
6. **Gradientes**: Hero sections usam `linear-gradient(135deg, #7367F0 0%, #9E95F5 100%)`

## Referência Externa

- Design System completo: https://fabioeducacross.github.io/DesignSystem-Vuexy/
- Organização: https://educacross.com.br/
