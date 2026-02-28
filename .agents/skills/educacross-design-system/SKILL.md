---
name: educacross-design-system
description: "Guia operacional enxuto para construir/revisar UI do Educacross no FrontOffice (Vue 3 + Bootstrap). Use a versão full para casos complexos."
compatibility: ">=1.0.0"
user-invokable: false
metadata:
  when_to_use: "SEMPRE que for construir, revisar ou ajustar qualquer tela, componente ou protótipo no FrontOffice."
---

# Educacross Design System — CORE

Este arquivo é a versão **enxuta e operacional** da skill.

- Versão completa: `SKILL.full.md`
- Objetivo: reduzir custo/latência e aumentar consistência de execução
- Escopo: `FrontOffice/` (não usar `src/` legado e não programar em `educacross-frontoffice`)

---

## 1) Checklist de decisão (obrigatório)

Antes de implementar qualquer UI, siga na ordem:

1. Verificar se o componente já existe em `FrontOffice/src/components` ou `FrontOffice/src/shared/components`
2. Se não existir, consultar MCP `design-system` (`search_component` → `get_component`)
3. Implementar em Vue 3 com `<script setup>` e estilos `scoped`
4. Validar visualmente na rota (screenshot)

Se qualquer item falhar, não avance para a próxima etapa.

### Regra de ferramenta (obrigatória)

- **Usar sempre os servidores MCP locais primeiro.**
- Para componentes/código: servidor `design-system` (como fluxo atual).
- Para referência de layout/tela Figma: **MCP local `figma`**.
- Navegação web direta só é fallback quando o MCP local estiver indisponível.

---

## 2) Regras críticas (sempre aplicar)

### Stack e estrutura
- Vue 3 com `<script setup>`
- Bootstrap 5 + `bootstrap-vue-next`
- Sem Options API e sem `defineComponent`
- Sem backend/API real (somente mocks locais)

### Cores e tokens
- Usar apenas `var(--primary)`, `var(--success)`, `var(--warning)`, `var(--danger)`, `var(--info)`
- Não usar hex inline
- Não usar `rgba(var(--primary), 1)` no FrontOffice

### Ícones
- Bootstrap Icons: `bi bi-*`
- Material Symbols: `<MaterialIcon name="..." />`

### CSS e layout
- Sempre `<style scoped>`
- Priorizar classes/utilitários Bootstrap antes de CSS novo
- Responsividade com grid Bootstrap e ajustes em `@media (max-width: 768px)`

---

## 3) Fluxo de reaproveitamento de componente

### Passo A — Buscar no FrontOffice
- `file_search`: `FrontOffice/src/components/**/*Nome*`
- `grep_search`: `NomeDoComponente` em `FrontOffice/src/**`

Se encontrar, **reutilizar**. Não recriar.

### Passo B — Buscar na produção via MCP
Quando não existir no FrontOffice:
1. `search_component("Nome")`
2. `get_component("pasta/Componente.vue")`

Ao adaptar de Vue 2 para Vue 3:
- Migrar para `<script setup>`
- Trocar componentes BootstrapVue por equivalentes `bootstrap-vue-next`
- Preservar comportamento e estrutura visual

Se houver dúvida de mapeamento, consultar `SKILL.full.md`.

---

## 4) Padrão mínimo de implementação

Use este template base:

```vue
<script setup>
import { ref, computed } from 'vue'
</script>

<template>
  <section class="card">
    <div class="card-body">
      <!-- conteúdo -->
    </div>
  </section>
</template>

<style scoped>
/* estilos do componente */
</style>
```

---

## 5) Validação obrigatória (Definition of Done)

A tarefa de UI só termina quando:

1. A tela abre sem erro na rota alvo
2. O layout está visualmente equivalente ao padrão Educacross
3. Cores, ícones e responsividade seguem as regras desta skill
4. Foi feita validação visual por screenshot contra Produção e Figma

Se reprovar em qualquer item: corrigir e revalidar.

### Regra inegociável de conclusão

- **É proibido encerrar a tarefa enquanto houver qualquer diferença visual relevante entre Protótipo, Produção e Figma.**
- Diferenças relevantes incluem: estrutura, espaçamento, tipografia, cores, ícones, bordas, sombras, estados e responsividade.
- Se houver divergência: corrigir, recapturar evidências e repetir a validação.
- A conclusão só é permitida com status explícito: **PARIDADE VISUAL ATINGIDA**.

### Script Playwright de validação visual

Script oficial da skill:

- `.agents/skills/educacross-design-system/pipeline/validate-visual-parity.cjs`

Exemplo de uso:

```bash
node .agents/skills/educacross-design-system/pipeline/validate-visual-parity.cjs \
  --name missoes \
  --proto "http://localhost:5174/professor/missoes" \
  --prod "https://SEU_PROD_URL/professor/missoes" \
  --figma "https://www.figma.com/file/SEU_ARQUIVO?node-id=1%3A2" \
  --outDir ".agents/skills/educacross-design-system/pipeline/output/visual"
```

Saídas esperadas:

- screenshots: `*-proto.png`, `*-prod.png`, `*-figma.png`
- relatório: `*-visual-report.json`

Sem essas evidências, a tarefa não pode ser considerada concluída.

---

## 6) Saída esperada do agente

Ao concluir uma alteração de UI, reportar:

- Arquivos alterados
- Regra de design aplicada (tokens/componentes)
- Resultado da validação visual
- Pendências (se houver)

---

## 7) Quando usar a versão full

Abrir `SKILL.full.md` somente quando precisar de:

- Tabelas completas de migração Vue 2 → Vue 3
- Regras detalhadas de componentes específicos
- Scripts completos de validação/screenshot
- Inventário amplo de padrões e exemplos extensos

---

## 8) Anti-patterns (proibido)

- Criar componente novo sem procurar existente antes
- Usar `src/` legado na raiz para desenvolvimento novo
- Adicionar chamadas de API reais
- Inserir cores hardcoded fora dos tokens
- Concluir tarefa sem validação visual

---

## 9) Referências locais

- Instruções FrontOffice: `.github/instructions/frontoffice.instructions.md`
- Skill completa: `.agents/skills/educacross-design-system/SKILL.full.md`
