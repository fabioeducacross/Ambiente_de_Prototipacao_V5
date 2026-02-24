# Testes de Jornada — Sistema de Ensino (Missions List)

> **Protótipo**: `FrontOffice/src/modules/sistema-de-ensino/`  
> **URL local**: `http://localhost:5174/teacher/sistema-ensino`  
> **Referência AS-IS**: `educacross-frontoffice/src/teacher-context/educationSystem/missions/List.vue`  
> **Data de criação**: 2026-02-23

---

## Fundamentos de teste

### Status possíveis (enum)

| Key | Label | Cor | Condição no composable |
|-----|-------|-----|------------------------|
| `nao_enviada` | NÃO ENVIADA | `#FFB443` (laranja) | `!enabled` |
| `nao_iniciada` | NÃO INICIADA | `#FFB443` (laranja) | `enabled + periodEnabled + fim futuro` |
| `iniciada` | INICIADA | `#28c76f` (verde) | `enabled + !finalizada + !paused + ...` |
| `pausada` | PAUSADA | `#EA5455` (vermelho) | `enabled + paused === true` |
| `finalizada` | FINALIZADA | `#7F6CC3` (roxo) | `enabled + finalizada === true` |

### Mapa de botões por status (AS-IS produção)

| Botão | Ícone | NÃO ENVIADA | NÃO INICIADA | INICIADA | PAUSADA | FINALIZADA |
|-------|-------|:-----------:|:------------:|:--------:|:-------:|:----------:|
| Enviar missão | `send` | ✅ | ❌ | ❌ | ✅ | ✅ |
| Pausar missão | `pause_circle` | ❌ | ✅ | ✅ | ❌ | ❌ |
| Relatório da Missão | `pie_chart` | ❌ | ❌ | ✅ | ✅ | ✅ |
| Detalhes da missão | `visibility` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Copiar link | `link` | ❌ | ❌ | ✅ | ❌ | ❌ |

> **Regra geral**: todos os botões visíveis são sempre clicáveis (sem `disabled`). Isso é o comportamento AS-IS da produção.

### Timers de simulação (protótipo)

| Constante | Valor | Descrição |
|-----------|-------|-----------|
| `PROGRESS_DURATION_MS` | 30 000 ms | Barra de progresso vai de 0% a 100% |
| `FINISH_DELAY_MS` | 60 000 ms | Missão transiciona para FINALIZADA |
| `TICK_MS` | 500 ms | Frequência de atualização da barra |
| `INCREMENT` | ~1,67 % por tick | Valor adicionado a cada tick |

---

## Bloco 1 — Verificação de botões por status

### TC-01 · Status NÃO ENVIADA → botões corretos

**Pré-condição**: nenhuma missão foi enviada (estado inicial).

**Passos**:
1. Abrir `http://localhost:5174/teacher/sistema-ensino`.
2. Observar qualquer linha com badge **NÃO ENVIADA**.

**Resultado esperado**:
- Badge laranja `NÃO ENVIADA`.
- Botões visíveis: `send` + `visibility` (2 botões).
- Botões ausentes: `pause_circle`, `pie_chart`, `link`.
- Progressão: **0%** (sem barra ou barra zerada).

---

### TC-02 · Status NÃO INICIADA → botões corretos

**Pré-condição**: missão enviada com período ativado e data de fim no futuro (ex: 2099-12-31).

**Passos**:
1. Clicar em **Enviar missão** em qualquer linha NÃO ENVIADA.
2. No drawer: ativar "Período de realização" e selecionar data fim futura.
3. Selecionar todos os alunos e confirmar.
4. Fechar drawer.

**Resultado esperado**:
- Badge laranja `NÃO INICIADA`.
- Botões visíveis: `pause_circle` + `visibility` (2 botões).
- Botões ausentes: `send`, `pie_chart`, `link`.
- Progresso: **0%** (timer ainda não conta para esta jornada — ver nota abaixo).

> **Nota**: no protótipo a simulação de progresso inicia na confirmação do envio, independente de data de início. O status NÃO INICIADA reflete apenas a data de fim futura. Para ver esta jornada completa é necessário ter data fim ≥ amanhã e não ter avançado o timer.

---

### TC-03 · Status INICIADA → botões corretos

**Pré-condição**: missão enviada sem período de data ou com data de início já passada.

**Passos**:
1. Clicar em **Enviar missão** em qualquer linha NÃO ENVIADA.
2. No drawer: NÃO ativar "Período de realização" (ou deixar data default).
3. Selecionar pelo menos 1 aluno e confirmar.
4. Fechar drawer imediatamente (< 60 s).

**Resultado esperado**:
- Badge verde `INICIADA`.
- Botões visíveis: `pause_circle` + `pie_chart` + `visibility` + `link` (4 botões).
- Botões ausentes: `send`.
- Barra de progresso avançando (~1,67% a cada 500 ms).

---

### TC-04 · Status PAUSADA → botões corretos

**Pré-condição**: missão está em INICIADA.

**Passos**:
1. Clicar em **Pausar missão** em uma linha INICIADA.
2. No drawer de pausa, selecionar **todos** os alunos e confirmar.
3. Fechar drawer.

**Resultado esperado**:
- Badge vermelho `PAUSADA`.
- Botões visíveis: `send` + `pie_chart` + `visibility` (3 botões).
- Botões ausentes: `pause_circle`, `link`.
- Barra de progresso: **congela** no valor onde estava quando a pausa foi confirmada.

---

### TC-05 · Status FINALIZADA → botões corretos

**Pré-condição**: missão está em INICIADA e o timer de 60 s expira.

**Passos**:
1. Enviar missão (TC-03).
2. Aguardar **60 segundos** sem pausar.
3. Observar a linha.

**Resultado esperado**:
- Badge roxo `FINALIZADA`.
- Botões visíveis: `send` + `pie_chart` + `visibility` (3 botões — igual ao PAUSADA).
- Botões ausentes: `pause_circle`, `link`.
- Progresso: **100%**.

---

## Bloco 2 — Jornadas de ações

### TC-06 · Primeiro envio de missão (habilitar + vincular)

**Passos**:
1. Clicar em `send` em uma missão NÃO ENVIADA.
2. Verificar que o drawer abre com título "Habilitar e enviar".
3. Selecionar alunos e confirmar.

**Resultado esperado**:
- Missão transiciona de NÃO ENVIADA → INICIADA.
- Progresso começa em 0% e avança.
- `habilitarCapitulo()` foi chamado (enabled = true).
- `vincularAlunos()` foi chamado com os IDs selecionados.
- Timer de simulação inicia.

---

### TC-07 · Reenvio após pausa (PAUSADA → INICIADA)

**Passos**:
1. Pausar uma missão (TC-04).
2. Clicar em `send` na missão PAUSADA.
3. Selecionar alunos e confirmar no drawer.

**Resultado esperado**:
- Missão volta para INICIADA.
- Progresso **reinicia em 0%** (simulação limpa).
- Timer anterior cancelado; novo timer inicia.
- `cancelSimulation()` foi chamado antes de `startSimulation()`.

---

### TC-08 · Reenvio após finalizada (FINALIZADA → INICIADA)

**Passos**:
1. Aguardar missão chegar em FINALIZADA (ou clicar `send` e esperar 60 s).
2. Clicar em `send` na missão FINALIZADA.
3. Selecionar alunos e confirmar.

**Resultado esperado**:
- Missão volta para INICIADA.
- Badge muda de roxo → verde.
- Progresso reinicia em 0%.
- `finalizada` é redefinido para `false` pelo `startSimulation()`.

---

### TC-09 · Relatório da missão (placeholder)

**Passos**:
1. Em qualquer missão com status INICIADA, PAUSADA ou FINALIZADA, clicar em `pie_chart`.

**Resultado esperado**:
- Alert exibe `"Relatório da missão: <nome da missão>"`.
- Nenhuma navegação ocorre.

---

### TC-10 · Detalhes da missão sempre visível

**Passos**:
1. Para cada status (NÃO ENVIADA, NÃO INICIADA, INICIADA, PAUSADA, FINALIZADA), clicar em `visibility`.

**Resultado esperado**:
- Em todos os status: botão `visibility` presente e clicável.
- Alert exibe `"Detalhes: <nome da missão>"`.

---

### TC-11 · Copiar link da missão

**Passos**:
1. Em uma missão com status INICIADA, clicar em `link`.

**Resultado esperado**:
- Alert exibe URL no formato `https://app.educacross.com.br/mission/<id>`.
- Nenhuma navegação ocorre.
- Botão `link` **não aparece** em missões com status diferente de INICIADA.

---

## Bloco 3 — Edge cases

### TC-12 · Pausa parcial (subconjunto de alunos)

**Situação**: Pausar selecionando apenas alguns alunos, não todos.

**Passos**:
1. Enviar missão com 3 alunos selecionados.
2. Clicar em `pause_circle`.
3. No drawer de pausa, selecionar apenas 1 ou 2 alunos (não todos) e confirmar.

**Resultado esperado**:
- Status permanece **INICIADA** (não vai para PAUSADA).
- `chapter.paused` deve ser `false` (ainda há alunos vinculados).
- Botões: `pause_circle` + `pie_chart` + `visibility` + `link` (4 botões).
- Timer de simulação **continua rodando** (não é cancelado).

> **Regra**: `chapter.paused = true` somente quando `linkedCount === 0` após a pausa.

---

### TC-13 · Pausa total (todos os alunos)

**Situação**: Pausar selecionando todos os alunos.

**Passos**:
1. Enviar missão com alunos.
2. Clicar em `pause_circle`.
3. No drawer, selecionar **todos** os alunos e confirmar.

**Resultado esperado**:
- Status transiciona para **PAUSADA**.
- `linkedCount` = 0.
- Timer de progresso é **cancelado** (barra congela).
- Botões: `send` + `pie_chart` + `visibility` (3 botões, sem `link`).

---

### TC-14 · Cliques múltiplos em Enviar (duplo clique / race condition)

**Situação**: Usuário clica em `send` mais de uma vez rapidamente.

**Passos**:
1. Em uma missão NÃO ENVIADA, clicar em `send` duas vezes consecutivas.

**Resultado esperado**:
- Drawer abre apenas uma vez.
- Simulação não inicia até a confirmação no drawer.
- Nenhum timer duplicado.

---

### TC-15 · Reenvio durante simulação em andamento (< 60 s)

**Situação**: Clicar `send` em missão PAUSADA enquanto uma simulação anterior poderia ter sido parcialmente executada.

**Passos**:
1. Enviar missão (progresso começa a subir).
2. Pausar todos os alunos (timer cancela, barra congela em X%).
3. Clicar `send` novamente e confirmar.

**Resultado esperado**:
- Progresso **reseta para 0%** (não continua de X%).
- Nova simulação inicia do zero.
- `cancelSimulation()` chamado antes de `startSimulation()`.

---

### TC-16 · Filtro por status "NÃO ENVIADA"

**Passos**:
1. Abrir página.
2. No segundo ESelect (status), selecionar "NÃO ENVIADA".

**Resultado esperado**:
- Tabela exibe somente linhas com badge NÃO ENVIADA.
- Contador de paginação reflete o número filtrado.
- Ao enviar uma dessas missões, ela **desaparece** da lista filtrada.

---

### TC-17 · Filtro por unidade

**Passos**:
1. No primeiro ESelect (unidade), selecionar "Unidade 1".
2. Observar as linhas exibidas.

**Resultado esperado**:
- Apenas capítulos com IDs 1-2 são exibidos (conforme `Math.ceil(id / 2)`).
- Demais unidades ficam ocultas.
- Filtro é combinável com filtro de status.

---

### TC-18 · Paginação com mais de 10 missões e filtro ativo

**Passos**:
1. Limpar todos os filtros.
2. Conferir que há mais de 10 missões no total.
3. Mudar "Mostrar" para `5` por página.
4. Navegar para a página 2.
5. Aplicar filtro por unidade.

**Resultado esperado**:
- Página reseta para 1 ao aplicar filtro.
- Contador "Exibindo X a Y de Z entradas" atualiza corretamente.

---

### TC-19 · NÃO INICIADA com data expirada → deve ir para INICIADA automaticamente

**Situação**: Missão foi enviada com data de fim que era futura mas agora expirou (simulação via troca manual de data no JSON ou composable).

**Passos**:  
1. Enviar missão com período habilitado e data fim = ontem.
2. Observar o status calculado.

**Resultado esperado**:
- `isFutureISO(chapter.fim)` retorna `false`.
- Status calculado é **INICIADA** (não NÃO INICIADA).
- Botões: `pause_circle` + `pie_chart` + `visibility` + `link`.

---

### TC-20 · Barra de progresso atinge 100% antes do timer de FINALIZADA

**Situação**: A barra chega em 100% em ~30 s, mas a missão só vai para FINALIZADA em 60 s.

**Passos**:
1. Enviar missão e aguardar ~35 s.
2. Observar status e barra.

**Resultado esperado**:
- Barra em **100%** mas status ainda **INICIADA** (não FINALIZADA).
- Botões ainda: `pause_circle` + `pie_chart` + `visibility` + `link`.
- Somente após 60 s o status muda para FINALIZADA.

---

### TC-21 · Pausa após barra chegar a 100% (mas antes de FINALIZADA)

**Situação**: Pausar entre T+30 s e T+60 s (barra 100%, status INICIADA).

**Passos**:
1. Enviar missão.
2. Aguardar ~35 s (barra = 100%, status = INICIADA).
3. Clicar em `pause_circle` e confirmar com todos os alunos.

**Resultado esperado**:
- Status vai para **PAUSADA** (timer `finalizada` é cancelado).
- Barra congela em 100%.
- O timer de 60 s para FINALIZADA é cancelado corretamente — missão **não deve** transitar automaticamente para FINALIZADA após a pausa.

---

### TC-22 · Busca textual na tabela

**Passos**:
1. Digitar parte do nome de uma missão no campo de busca (ex: "Unidade 2").
2. Observar as linhas exibidas.

**Resultado esperado**:
- Apenas missões cujo nome contém o texto buscado (case-insensitive) são exibidas.
- Filtro combina com filtros de unidade e status.

---

## Bloco 4 — Regressão visual

### TC-23 · Badges de status com cores corretas

**Verificar** para cada status:
- NÃO ENVIADA → badge laranja (`#FFB443`)
- NÃO INICIADA → badge laranja (`#FFB443`)
- INICIADA → badge verde (`#28c76f`)
- PAUSADA → badge vermelho (`#EA5455`)
- FINALIZADA → badge roxo (`#7F6CC3`)

---

### TC-24 · Responsividade da tabela em viewport 768 px

**Passos**:
1. Redimensionar viewport para 768 px de largura (ou usar DevTools).
2. Observar tabela.

**Resultado esperado**:
- Scroll horizontal aparece quando necessário.
- Botões de ação não se sobrepõem.
- Header da tabela ainda legível.

---

### TC-25 · Sidebar colapsada não quebra layout

**Passos**:
1. Clicar no ícone de toggleSidebar no navbar.
2. Verificar que o conteúdo principal expande.

**Resultado esperado**:
- Classe `sidebar-collapsed` é aplicada no `<main>`.
- Tabela usa toda a largura disponível.
- Não há elementos cortados.

---

## Checklist de execução rápida

Use esta tabela como checklist ao validar o protótipo antes de uma demo ou revisão:

| # | Cenário resumido | Status |
|---|------------------|--------|
| TC-01 | Botões em NÃO ENVIADA: 2 (send + visibility) | ☐ |
| TC-02 | Botões em NÃO INICIADA: 2 (pause + visibility) | ☐ |
| TC-03 | Botões em INICIADA: 4 (pause + pie + visibility + link) | ☐ |
| TC-04 | Botões em PAUSADA: 3 (send + pie + visibility) | ☐ |
| TC-05 | Botões em FINALIZADA: 3 (send + pie + visibility) | ☐ |
| TC-06 | Primeiro envio → INICIADA + progresso começa | ☐ |
| TC-07 | Reenvio pós-pausa → progresso reseta 0% | ☐ |
| TC-08 | Reenvio pós-finalizada → volta para INICIADA | ☐ |
| TC-12 | Pausa parcial → mantém INICIADA | ☐ |
| TC-13 | Pausa total → vai para PAUSADA + timer cancela | ☐ |
| TC-15 | Novo envio reseta barra mesmo se estava em X% | ☐ |
| TC-20 | Barra 100% em 30 s, FINALIZADA só em 60 s | ☐ |
| TC-21 | Pausa entre 30-60 s cancela timer de FINALIZADA | ☐ |

---

## Ambiente de teste

```
URL: http://localhost:5174/teacher/sistema-ensino
Servidor: npm run dev --prefix FrontOffice
Browser: Chrome / Edge (recomendado DevTools aberto)
Dados: FrontOffice/src/modules/sistema-de-ensino/data/trilhas-az.json
Composable: FrontOffice/src/modules/sistema-de-ensino/composables/useTrilhasAZ.js
View: FrontOffice/src/modules/sistema-de-ensino/views/SistemaEnsino.vue
```
