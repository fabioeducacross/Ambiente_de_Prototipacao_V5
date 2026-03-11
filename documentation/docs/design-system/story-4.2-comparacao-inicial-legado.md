---
sidebar_position: 10
title: Story 4.2 - Comparação Inicial com o Legado
description: Primeiros achados factuais da comparação entre o Design System local e a baseline real do educacross-frontoffice.
---

# Story 4.2 - Comparação Inicial com o Legado

Data: 2026-03-11  
Story base: [docs/stories/4.2.baseline-verificavel-producao-ds.md](docs/stories/4.2.baseline-verificavel-producao-ds.md)  
Baseline externa validada em: `C:\Users\Educacross\Downloads\educacross-frontoffice\educacross-frontoffice`

---

## Resultado desta rodada

A baseline externa deixou de estar bloqueada. Foi localizada uma cópia real e legível do `educacross-frontoffice`, com estrutura completa de projeto e 8410 arquivos.

Com isso, a Story 4.2 saiu do cenário de bloqueio formal e entrou em comparação factual inicial.

---

## 1. Baseline externa validada

### Evidência de disponibilidade

- Caminho validado: `C:\Users\Educacross\Downloads\educacross-frontoffice\educacross-frontoffice`
- Estrutura confirmada: projeto completo com `src/`, `public/`, `tests/`, `package.json` e configuração real de aplicação.
- Contagem recursiva de arquivos: `8410`.

### Consequência

Agora existe fonte externa suficiente para comparação factual com o Design System local, ao menos para os componentes-base prioritários.

---

## 2. ESelect - par direto confirmado

### Evidência no legado

- Arquivo real localizado: `src/components/selects/ESelect.vue`
- Arquivo de testes localizado: `src/components/selects/ESelect.spec.js`

### Achados principais

O `ESelect` do legado existe como componente explícito e é, até aqui, o par mais direto do `ESelect` do Design System local.

Diferenças factuais já confirmadas entre legado e contrato local:

- O legado usa `value` como prop principal; o local usa `modelValue`.
- O legado emite `input`, `change`, `close`, `nextPage`, `input:page`, `clear` e `closeModal`; o local publica `update:modelValue`, `change`, `clear`, `open` e `close`.
- O legado expõe `state`; o contrato local atual usa `invalid` e removeu `state` como API pública.
- O legado inclui props adicionais fora do contrato local atual, como `paginated`, `page`, `totalPages`, `prefix`, `gender`, `tableColumns`, `tableTitle`, `usePortalOnModal` e `skipInitialRequest`.
- O legado usa placeholders e textos conectados a i18n (`selectAnOption`), enquanto o local simplifica isso para strings literais padrão.

### Implicação

Para `ESelect`, a próxima story de parity pode trabalhar com comparação direta de API, porque existe equivalência concreta entre os dois lados.

---

## 3. EButton - baseline real mais próxima é ButtonWaitAction

### Evidências no legado

- Arquivo encontrado: `src/components/form/button/ButtonWaitAction.vue`
- Uso real encontrado em telas do legado:
  - `views/pages/admin-context/records/directors/import/ListImportedDirector.vue`
  - `views/pages/records/students/import/old/ListImportedStudents.vue`

### Achados principais

O `EButton` local não parece ter como par direto um `EButton` no legado. A referência mais coerente encontrada até agora é `ButtonWaitAction.vue`, inclusive porque o próprio componente local declara ter sido baseado nele.

Diferenças factuais já confirmadas:

- O legado usa `label` obrigatório; o local usa slot default.
- O legado tem `variant` e `disabled`; o local expande para `variant`, `size`, `type`, `loading`, `icon` e `block`.
- O legado implementa loading por estado interno `waitAction`, ativado por um contrato de `click(resolve)`; o local publica `loading` como prop explícita.
- O legado usa diretamente `b-button`; o local já abstrai isso em um componente mais semântico e mais rico.

### Implicação

Para `EButton`, a parity com produção deve ser tratada como convergência funcional e comportamental, não como equivalência de API um-para-um por nome.

---

## 4. EInput - não há componente-base canônico explícito encontrado até aqui

### Evidências no legado

Não foi localizado um `EInput.vue` ou equivalente canônico com papel análogo direto ao `EInput` local.

Em vez disso, o legado mostra uso distribuído e recorrente de `b-form-input` em múltiplas telas, componentes de tabela, login e formulários administrativos.

Exemplos confirmados:

- `views/pages/auth-context/login/Login.vue`
- `views/pages/auth-context/login/Register.vue`
- `views/pages/auth-context/login/ForgotPassword.vue`
- `views/pages/admin-context/records/classes/CreateClassesSidebar.vue`
- `views/pages/admin-context/shared/components/table-filter/TableFilter.vue`

### Achados principais

- O legado parece usar `b-form-input` como primitive dominante de input, sem um wrapper-base único equivalente ao `EInput` local.
- Isso sugere que o `EInput` local é uma canonicalização nova do protótipo, não uma simples porta direta do legado.

### Implicação

Para `EInput`, a parity com produção deve ser analisada como convergência com padrão de uso distribuído de input, e não como comparação direta com um componente-base legado único.

---

## 5. Matriz decisória completa

| Componente local | Baseline no legado | Alinhado | Divergente | Nao verificavel | Decisao recomendada |
|---|---|---|---|---|---|
| `ESelect` | `src/components/selects/ESelect.vue` | Existe componente correspondente; suporta `options`, `label`, `trackBy`, `multiple`, `searchable`, `clearable`, `disabled`, `loading`, `variant`, `placeholder` | `value` vs `modelValue`; `state` no legado vs `invalid` no local; eventos extras no legado (`input`, `nextPage`, `input:page`, `closeModal`); props adicionais (`paginated`, `page`, `totalPages`, `prefix`, `gender`, `tableColumns`, `tableTitle`, `usePortalOnModal`, `skipInitialRequest`) | Uso canônico por import não ficou totalmente rastreado nesta rodada, apesar do componente e dos testes existirem | Abrir parity direta de API para `ESelect`, com decisão explícita sobre `state` e paginação |
| `EButton` | `src/components/form/button/ButtonWaitAction.vue` | Ambos representam ação clicável com `variant`, `disabled` e estado de espera/loading | `label` obrigatório no legado vs slot no local; loading controlado internamente por `waitAction` no legado vs prop `loading` no local; local expõe `size`, `type`, `icon` e `block` sem par direto confirmado | Não ficou comprovado nesta rodada se `ButtonWaitAction` é o único baseline de botão de ação reutilizado no legado | Tratar como convergência funcional/comportamental, não parity nominal |
| `EInput` | uso distribuído de `b-form-input` | O legado usa primitivas de input amplamente em fluxos reais de login, filtros e formulários; `type`, `placeholder`, `disabled` e binding de valor são padrões recorrentes | Não existe wrapper-base canônico equivalente ao `EInput` local; o local formaliza `invalid`, `readonly` e `size` em um componente próprio | Ainda falta consolidar quais estados/atributos recorrentes do legado devem ser preservados como contrato canônico | Tratar como convergência por padrão de uso, não por componente legado único |

---

## 6. Lista objetiva de gaps validados

### Gaps validados de ESelect

1. O legado usa `value` e o local usa `modelValue`.
2. O legado expõe `state` como estado visual; o local publica `invalid` e removeu `state` do contrato.
3. O legado possui paginação e controle de fluxo adicional (`paginated`, `page`, `totalPages`, `nextPage`, `input:page`, `skipInitialRequest`).
4. O legado possui contexto textual e de modal mais rico (`prefix`, `gender`, `tableColumns`, `tableTitle`, `usePortalOnModal`, `closeModal`).
5. O contrato local atual simplifica i18n e textos padrão frente ao legado.

### Gaps validados de EButton

1. O legado usa `label` obrigatório como interface principal; o local usa slot.
2. O legado controla o estado de espera com `waitAction` interno e contrato assíncrono de clique; o local usa `loading` como prop externa.
3. O local expõe capacidades sem paralelo direto confirmado no legado (`size`, `type`, `icon`, `block`).
4. O paralelo factual atual é `ButtonWaitAction`, então a convergência precisa ser de comportamento, não de assinatura nominal.

### Gaps validados de EInput

1. Não foi encontrado componente-base legado único equivalente ao `EInput` local.
2. O baseline real do legado é uso distribuído de `b-form-input`, não um wrapper canônico.
3. O `EInput` local já representa uma canonicalização nova do protótipo, então parity exige definição de quais padrões recorrentes do legado entram no contrato, e não simples espelhamento de um componente existente.

---

## 7. Leitura consolidada da rodada

| Componente local | Baseline no legado | Tipo de comparação viável |
|---|---|---|
| `ESelect` | `src/components/selects/ESelect.vue` | Comparação direta de API |
| `EButton` | `src/components/form/button/ButtonWaitAction.vue` | Convergência funcional/comportamental |
| `EInput` | uso distribuído de `b-form-input` | Convergência por padrão, não por par direto |

---

## 8. Próximo passo recomendado

Abrir a próxima rodada da Story 4.2 com foco em matriz comparativa objetiva dos três componentes:

1. `ESelect`: listar props/eventos equivalentes e divergentes entre legado e contrato local.
2. `EButton`: decidir se a referência principal será `ButtonWaitAction` e quais diferenças devem virar API pública ou permanecer abstração local.
3. `EInput`: levantar o conjunto mínimo de comportamentos recorrentes de `b-form-input` no legado que o Design System local precisa preservar.

Com essa matriz, a próxima story já pode ser aberta de forma segura, desde que trate separadamente:

1. parity direta de API para `ESelect`;
2. convergência funcional de `EButton` com `ButtonWaitAction`;
3. definição do contrato mínimo canônico de `EInput` a partir do padrão recorrente de `b-form-input`.