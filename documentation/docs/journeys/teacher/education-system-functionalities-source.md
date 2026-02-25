**Documento de Funcionalidades**  
**Sistema Ensino — Lista \+ Drawer**

Versão: 1.1 • Data: 25/02/2026

> **Fonte de verdade**: todo o conteúdo marcado com ✅ foi lido diretamente do código-fonte de produção em `educacross-frontoffice`. O que for inferência ou suposição está marcado com ⚠️.

Escopo: regras de negócio \+ comportamento de UI/UX para habilitar, enviar (vincular) e pausar (desvincular) missões por turma.

# **1\. Objetivo do documento**

Este documento consolida o entendimento do fluxo de Missões (Sistema de Ensino) tratado neste documento, com foco nas funcionalidades de lista de missões por turma e drawer lateral para operação em lote.

# **2\. Contexto e escopo**

## **2.1 Dentro do escopo**

* Listagem de missões (colunas, regras de exibição e estados).  
* Status de missão (Não enviada, Iniciada, Não iniciada, Finalizada) e suas cores.  
* Ações na coluna Ações: Habilitar (estado inicial) e, após habilitada, Enviar/vincular e Pausar/desvincular.  
* Drawer lateral para operar alunos em lote (filtro por nome, seleção, período e botão de ação).  
* Mensagens/hover (tooltips) de botões desabilitados.

# **3\. Conceitos e entidades**

| Termo | Definição |
| :---- | :---- |
| Missão | Atividade atribuível a uma turma, com possibilidade de vincular alunos e definir período. |
| Turma | Grupo de alunos; seu tamanho é variável (N). |
| Aluno | Participante da turma; pode estar vinculado/enviado ou pausado/desvinculado para a missão. |
| Vincular / Enviar | Ação que inclui o aluno na missão (o aluno passa a estar 'enviado/vinculado'). |
| Desvincular / Pausar | Ação que remove ou pausa a participação do aluno na missão. |
| Período | Par de datas (início e fim). No fluxo atual, o usuário define a data de fim; a data de início pode ser 'hoje' ou configurada conforme regra. |

# **4\. Lista de missões (tabela principal)**

A tela exibe uma tabela de missões da turma, com colunas e regras abaixo.

## **4.1 Colunas**

| Coluna | Conteúdo | Observações / regra |
| :---- | :---- | :---- |
| Missão | Nome/título | Seleciona a missão (contexto para ações). |
| Início | Data (dd/mm/aaaa) ou '-'  | Exibida quando houver período definido (ver seção 8). |
| Fim | Data (dd/mm/aaaa) ou '-'  | Exibida quando houver período definido (ver seção 8). |
| Progresso da turma | Percentual | No protótipo foi usado 0% apenas como exemplo; regra real depende do motor de jogo/atividade. |
| Rendimento médio | Métrica/indicador | Varia por status da missão — ver Seção 4.2 (Regras de Rendimento Médio por Status). |
| Alunos | X de N | N \= tamanho real da turma; X \= quantidade atualmente vinculada/enviada (ou conforme regra definida). |
| Status | Tag colorida | Posicionada ao lado de Ações. Cores e regras na seção 5\. |
| Ações | Botões/ícones | Habilitar no estado inicial; após habilitar, exibe Enviar e Pausar (seção 6). |

## **4.2 Regras confirmadas de produção — Comportamento da tabela por Status** ✅

> **Fontes lidas**: `EEducationSystemGuideStatus.js` · `guideStatusEnum.js` · `List.vue` · `PerformanceCell.vue` · `ConditionalValueDisplay.vue` · `performanceEnum.js` · `progressEnum.js` · `EducationSystemMissionsEnableModal.vue`

---

### Enum de status da produção ✅

| Valor numérico | Chave | Label exibida |
| :---- | :---- | :---- |
| 0 | `NotSent` | Não enviada |
| 1 | `Paused` | Pausada |
| 2 | `Finished` | Finalizada |
| 3 | `Started` | Iniciada |
| 4 | `NotStarted` | Não iniciada |

---

### Badge de Status — variante e cor ✅

| Status | Variant DS | Cor visual |
| :---- | :---- | :---- |
| Não enviada | `legend-basic` | Laranja |
| Pausada | `legend-below-basic` | Vermelho |
| Finalizada | `legend-advanced` | Roxo/verde-escuro |
| Iniciada | `legend-proficient` | Verde |
| Não iniciada | `legend-in-progress` | Laranja |

---

### Coluna Rendimento Médio — regra de exibição ✅

```javascript
// Confirmado diretamente de List.vue
if (status === NotSent || status === NotStarted || performance === undefined) {
  // → exibe traço "-"  (sem componente)
} else {
  <PerformanceCell :performance="item.performance" />
  // PerformanceCell:
  //   performance === null/undefined  → pill roxo "Não há dados para exibir"
  //   performance > 0                 → "XX%" + badge classificatório
  //   performance === 0               → apenas badge classificatório (sem número)
}
```

| Status | O que exibe | Confirmado |
| :---- | :---- | :---- |
| Não enviada (0) | Traço `–` | ✅ |
| Não iniciada (4) | Traço `–` | ✅ |
| Iniciada (3) | `PerformanceCell` | ✅ — valor depende do backend |
| Pausada (1) | `PerformanceCell` | ✅ — valor depende do backend |
| Finalizada (2) | `PerformanceCell` | ✅ — valor depende do backend |

> ⚠️ O valor que a API retorna em `performance` para os status Iniciada, Pausada e Finalizada depende do backend — não mapeado neste repositório.

### Classificação do badge de rendimento ✅

| Condição | Variant DS | Label |
| :---- | :---- | :---- |
| `value >= 70` | `legend-advanced` | Avançado |
| `value >= 50` | `legend-proficient` | Proficiente |
| `value >= 25` | `legend-basic` | Básico |
| `value < 25` | `legend-below-basic` | Abaixo do Básico |

---

### Coluna Progresso da Turma — classificação de cor ✅

Usa o componente `ProgressBarHorizontalV2` com `enum="progress"` e `reverse`.

| Condição | Variant DS | Cor visual |
| :---- | :---- | :---- |
| `value === 100` | `legend-complete` | Verde-escuro |
| `value >= 80` | `legend-proficient` | Verde |
| `value >= 50` | `legend-basic` | Laranja |
| `value < 50` | `legend-below-basic` | Vermelho |

---

### Ações disponíveis por Status ✅

| Status | Ícones na coluna Ações |
| :---- | :---- |
| Não enviada (0) | `send` (verde) · `visibility` |
| Pausada (1) | `send` (verde) · `pie_chart` · `visibility` |
| Finalizada (2) | `send` (verde) · `pie_chart` · `visibility` |
| Iniciada (3) | `pause_circle` (vermelho) · `pie_chart` · `link` (se guideLinkUrl) · `visibility` |
| Não iniciada (4) | `pause_circle` (vermelho) · `visibility` |

---

### Modal de Habilitar — comportamento ✅

Fonte: `EducationSystemMissionsEnableModal.vue`

- Radio **"Não"** (padrão) → envia sem período: `emit('close-modal-success', {})`
- Radio **"Sim"** → exibe flat-pickr em modo range (início + fim)
  - Data mínima: hoje (não aceita datas passadas)
  - Default: hoje até +7 dias
  - Envia: `emit('close-modal-success', { startDate, endDate })`
- O componente **não chama a API** — apenas emite os dados; quem chama é o `List.vue` via `enableAndDisableMission(startDate, finishDate)`

---

### Filtros da página ✅

Fonte: `Filters.vue`

- **Unidades do livro**: dropdown com todas as unidades + opção "Todas as unidades do livro"
- **Status**: dropdown com todos os 5 status do `guideStatusEnum` + opção "Todos os status"
- Ao mudar qualquer filtro: dispara `resetAndfetch()` que reinicia paginação e re-busca a API

# **5\. Status de missão** ✅

Status é uma tag visual na tabela principal (coluna Status). Valores confirmados do `guideStatusEnum.js` de produção.

| Status | Variant DS | Cor visual | Quando aparece |
| :---- | :---- | :---- | :---- |
| Não enviada | `legend-basic` (laranja) | Laranja | Estado padrão inicial antes da habilitação. |
| Iniciada | `legend-proficient` (verde) | Verde | Após habilitação, missão em andamento. |
| Não iniciada | `legend-in-progress` (laranja) | Laranja | Habilitada com período ainda não comenzado. |
| Pausada | `legend-below-basic` (vermelho) | Vermelho | Missão suspensa temporariamente. |
| Finalizada | `legend-advanced` (roxo/verde-escuro) | Roxo | Missão concluída. Professor pode reenviar. |

# **6\. Ações (coluna Ações) e regras**

## **6.1 Estado inicial \- Habilitar**

No estado inicial (Não enviada / não habilitada), a coluna Ações exibe um ícone de Habilitar. Ao habilitar, o professor pode iniciar o processo e, a partir desse momento, o status pode evoluir para Iniciada ou Não iniciada (se houver período futuro).

## **6.2 Após habilitar \- Enviar e Pausar**

Após habilitada, a coluna Ações passa a exibir dois botões: Enviar (seta) e Pausar (pause). Cada botão abre o drawer em um modo específico e com lista filtrada por elegibilidade.

* Enviar (seta): abre o drawer mostrando apenas alunos que faltam enviar/vincular.  
* Pausar (pause): abre o drawer mostrando apenas alunos que estão aptos a pausar/desvincular.  
* Ambos podem ficar desabilitados (cinza) quando não houver alunos elegíveis para aquela ação.

## **6.3 Tooltips (hover) em botões desabilitados**

Quando desabilitados (cinza), os botões exibem tooltip no hover:

* Enviar desabilitado: 'Não há alunos para enviar'  
* Pausar desabilitado: 'Não há alunos para pausar'

# **7\. Drawer lateral (operação em lote)**

O drawer é aberto a partir da coluna Ações. Existe um único drawer com scroll no conteúdo, header fixo (título \+ X) e footer fixo com 1 botão de ação, que depende do modo (Enviar ou Pausar).

## **7.1 Estrutura do drawer**

* Missão selecionada (nome).  
* Resumo: Total de alunos (N) e 'Alunos na missão: X de N'.  
* Definir período (checkbox) \+ campo de data (fim) quando marcado.  
* Filtro por nome (funcional).  
* Tabela de alunos com: checkbox (seleção), nome e coluna Status.  
* Botão do footer: ENVIAR (modo send) ou PAUSAR (modo pause).

## **7.2 Filtro por nome**

O filtro por nome deve funcionar em tempo real, restringindo a lista exibida no drawer (modo Enviar ou Pausar).

## **7.3 Seleção (checkbox)**

O usuário pode:

* Selecionar individualmente alunos na tabela.  
* Selecionar todos via checkbox do cabeçalho (seleciona os alunos elegíveis exibidos no modo atual).

## **7.4 Habilitação do botão do drawer**

O botão do drawer segue a regra de elegibilidade do modo:

* Modo ENVIAR: habilita somente se houver ao menos 1 aluno elegível selecionado para enviar/vincular.  
* Modo PAUSAR: habilita somente se houver ao menos 1 aluno elegível selecionado para pausar/desvincular.  
* Quando não há ação possível, o botão fica cinza e não executa ação; pode exibir tooltip/mensagem conforme necessidade.

# **8\. Período (Definir período)**

O drawer oferece a opção 'Definir período'. Quando marcado, o campo de data (fim) é exibido. As datas devem refletir na listagem principal (colunas Início/Fim).

Regras sugeridas/implementadas em protótipo:

* Data de fim: escolhida pelo usuário no drawer.  
* Data de início: pode ser a data atual no momento do primeiro envio/habilitação (ou definida pelo produto).  
* Quando período é futuro (fim no futuro), o status pode ser 'Não iniciada'.

# **9\. Cenários de uso**

## **9.1 Habilitar e enviar para parte da turma**

1. Professor clica em Habilitar (missão sai de 'Não enviada').  
2. Clica em Enviar (seta), drawer abre com alunos elegíveis para enviar.  
3. Seleciona alguns alunos e confirma ENVIAR.  
4. Lista principal atualiza contagens X de N e status conforme regra.

## **9.2 Pausar para parte da turma**

5. Após existir ao menos 1 aluno enviado/vinculado, o botão Pausar fica disponível.  
6. Professor clica em Pausar (pause), drawer abre apenas com alunos aptos a pausar.  
7. Seleciona alunos e confirma PAUSAR.

## **9.3 Finalizada e reinício**

* Missão entra em status Finalizada (roxo).  
* Ação volta a se comportar como Não enviada: professor pode iniciar novamente o processo (novo ciclo).

# **10\. Pontos em aberto / decisões necessárias**

* ~~Definição exata de 'Rendimento médio': cálculo, unidade e se 'NÃO HÁ DADOS' depende de turma sem dados ou aluno sem dados.~~ **RESOLVIDO** — ver Seção 4.2. O cálculo é baseado em erros/acertos dos alunos nas jogadas. A célula exibe traço nos status Não enviada e Não iniciada; `PerformanceCell` nos demais (com `null` → "Não há dados para exibir" se ainda sem dados reais).  
* ~~Critério de 'Finalizada': por data? por conclusão? por ação do professor?~~ **RESOLVIDO** — em produção é um status retornado pela API (valor `2`). A ação "Habilitar" (`send`) está disponível nos status NotSent, Paused e Finished — ou seja, Finalizada pode ser reenviada sem perda de histórico.
* ~~Modelagem da ação 'Pausar' no nível da missão: existe um 'desabilitar' global que volta para Não habilitada? ou apenas pausar/desvincular alunos?~~ **RESOLVIDO** — em produção existe apenas toggle via `enableDisableEducationSystemBooks`. Pausar muda o status para `Paused (1)`; Habilitar/Enviar muda para `Started (3)` ou `NotStarted (4)`. Não existe reset para "Não habilitada" — pelo menos não neste fluxo.
* ~~Regras definitivas de Início/Fim: data de início é sempre 'hoje'? pode ser configurável?~~ **RESOLVIDO** — o modal de habilitar (`EducationSystemMissionsEnableModal.vue`) oferece flat-pickr em modo range (startDate + endDate). A data mínima possível é hoje. Se o professor não quiser definir período, seleciona "Não" e o start/endDate ficam nulos.