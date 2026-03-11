---
name: ASCII Progress Visualization
description: Instrução global para exibir barras de progresso ASCII em todas as execuções de tarefas
applyTo: "**"
---

# Instrução: Visualização de Progresso em ASCII

**OBRIGATÓRIO** — Em **todos os momentos** de execução de qualquer tarefa, exiba o progresso no formato de barra ASCII descrito abaixo. Isso inclui início, durante e ao final de cada ação ou sub-tarefa.

---

## Formato da Barra de Progresso

```
[TAREFA PRINCIPAL]
Progress: [████████░░] 80% — Etapa 4/5: Implementando componente

Sub-tarefas:
  ✅ [██████████] 100% — Leitura de arquivos
  ✅ [██████████] 100% — Análise de estrutura
  ✅ [██████████] 100% — Criação do componente
  ⏳ [████████░░]  80% — Aplicando estilos
  ⏸  [░░░░░░░░░░]   0% — Validação final
```

---

## Símbolos

| Símbolo | Significado |
|---------|-------------|
| `█` | Progresso preenchido |
| `░` | Progresso pendente |
| `✅` | Sub-tarefa concluída (100%) |
| `⏳` | Sub-tarefa em andamento |
| `⏸` | Sub-tarefa pendente (0%) |
| `❌` | Sub-tarefa com erro |

---

## Regras de Exibição

### 1. Ao INICIAR uma tarefa (0%)
```
╔══════════════════════════════════════╗
║  🚀 INICIANDO TAREFA                 ║
╚══════════════════════════════════════╝
Progress: [░░░░░░░░░░]   0% — Preparando...

Sub-tarefas identificadas:
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 1
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 2
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 3
```

### 2. A cada etapa significativa (durante)
```
Progress: [█████░░░░░]  50% — Etapa 2/4: <descrição breve>

  ✅ [██████████] 100% — Sub-tarefa 1 ← concluída
  ⏳ [█████░░░░░]  50% — Sub-tarefa 2 ← em andamento
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 3
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 4
```

### 3. Ao CONCLUIR uma tarefa (100%)
```
╔══════════════════════════════════════╗
║  ✅ TAREFA CONCLUÍDA                 ║
╚══════════════════════════════════════╝
Progress: [██████████] 100% — Concluído em <N> etapas

  ✅ [██████████] 100% — Sub-tarefa 1
  ✅ [██████████] 100% — Sub-tarefa 2
  ✅ [██████████] 100% — Sub-tarefa 3
```

### 4. Em caso de ERRO
```
Progress: [███████░░░]  70% — ❌ Erro na Etapa 3/5

  ✅ [██████████] 100% — Sub-tarefa 1
  ✅ [██████████] 100% — Sub-tarefa 2
  ❌ [███████░░░]  70% — Sub-tarefa 3 ← FALHOU: <motivo>
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 4 (bloqueada)
  ⏸  [░░░░░░░░░░]   0% — Sub-tarefa 5 (bloqueada)
```

---

## Como calcular o progresso

- **Barra de 10 blocos**: cada `█` = 10% → `Math.round(percent / 10)` blocos preenchidos
- **Progresso geral**: `(sub-tarefas concluídas / total de sub-tarefas) × 100`
- **Sub-tarefa em andamento**: progresso estimado com base nas ações realizadas dentro dela

---

## Aplicação por tipo de tarefa

| Tipo de tarefa | Quando exibir barra |
|----------------|---------------------|
| Criação de arquivo | Ao iniciar, ao criar, ao finalizar |
| Refatoração de código | A cada arquivo modificado |
| Instalação de dependências | Ao iniciar, por pacote, ao finalizar |
| Execução de testes | Por suite, por teste, ao final |
| Build/compilação | Ao iniciar, por fase, ao final |
| Busca/análise | A cada arquivo analisado ou por grupo |
| Multi-arquivo | Por arquivo e por operação dentro dele |

---

## Exemplo real — Criar componente Vue

```
╔══════════════════════════════════════════════════╗
║  🚀 CRIANDO COMPONENTE: UserCard.vue             ║
╚══════════════════════════════════════════════════╝
Progress: [░░░░░░░░░░]   0% — Iniciando

  ⏸  [░░░░░░░░░░]   0% — Verificar componentes existentes
  ⏸  [░░░░░░░░░░]   0% — Consultar Design System
  ⏸  [░░░░░░░░░░]   0% — Criar arquivo .vue
  ⏸  [░░░░░░░░░░]   0% — Implementar template
  ⏸  [░░░░░░░░░░]   0% — Implementar script setup
  ⏸  [░░░░░░░░░░]   0% — Implementar estilos
  ⏸  [░░░░░░░░░░]   0% — Registrar na rota/pai
  ⏸  [░░░░░░░░░░]   0% — Validar no browser

---

Progress: [███░░░░░░░]  30% — Etapa 3/8: Criando arquivo

  ✅ [██████████] 100% — Verificar componentes existentes
  ✅ [██████████] 100% — Consultar Design System
  ⏳ [███░░░░░░░]  30% — Criar arquivo .vue ← em andamento
  ⏸  [░░░░░░░░░░]   0% — Implementar template
  ⏸  [░░░░░░░░░░]   0% — Implementar script setup
  ⏸  [░░░░░░░░░░]   0% — Implementar estilos
  ⏸  [░░░░░░░░░░]   0% — Registrar na rota/pai
  ⏸  [░░░░░░░░░░]   0% — Validar no browser

---

╔══════════════════════════════════════════════════╗
║  ✅ COMPONENTE CRIADO COM SUCESSO                ║
╚══════════════════════════════════════════════════╝
Progress: [██████████] 100% — 8 etapas concluídas

  ✅ [██████████] 100% — Verificar componentes existentes
  ✅ [██████████] 100% — Consultar Design System
  ✅ [██████████] 100% — Criar arquivo .vue
  ✅ [██████████] 100% — Implementar template
  ✅ [██████████] 100% — Implementar script setup
  ✅ [██████████] 100% — Implementar estilos
  ✅ [██████████] 100% — Registrar na rota/pai
  ✅ [██████████] 100% — Validar no browser
```

---

> **Lembre-se:** Esta instrução é global e deve ser aplicada em TODAS as tarefas, independente do escopo, tecnologia ou complexidade. A barra de progresso ASCII é obrigatória em **todos os momentos** da execução.
