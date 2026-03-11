---
sidebar_position: 9
title: Story 4.2 - Investigação da Baseline de Produção
description: Evidências da tentativa de localizar a referência real de produção para EButton, EInput e ESelect na Fase 4 do Design System.
---

# Story 4.2 - Investigação da Baseline de Produção

Data: 2026-03-10  
Story base: [docs/stories/4.2.baseline-verificavel-producao-ds.md](docs/stories/4.2.baseline-verificavel-producao-ds.md)  
Plano base: [documentation/docs/design-system/plano-implementacao-storybook-ds.md](documentation/docs/design-system/plano-implementacao-storybook-ds.md)

---

## Objetivo da rodada

Verificar se existe uma referência real, legível e utilizável do ambiente de produção ou legado para EButton, EInput e ESelect, capaz de sustentar comparação factual com o contrato local estrito definido na Story 4.1.

---

## Resultado

**Status da rodada:** bloqueio formal confirmado.

Nesta execução não foi localizada uma baseline externa válida para comparação. Os caminhos documentados no próprio repositório estão ausentes ou vazios, e a busca ampliada não encontrou uma cópia alternativa utilizável do `educacross-frontoffice` contendo os componentes-base alvo fora do próprio workspace atual.

---

## Evidências coletadas

### 1. Caminho documentado pela documentação principal

O documento [documentation/docs/PLANO.md](documentation/docs/PLANO.md#L37) declara como referência o caminho `Ambiente-de-Prototipacao-V4/educacross-frontoffice/`.

Resultado da verificação local:

- `C:\Users\Educacross\Documents\Projetos Educacross\Ambiente-de-Prototipacao-V4\educacross-frontoffice`
- Situação: caminho inexistente no ambiente atual.

### 2. Caminho documentado pela configuração do MCP

O servidor MCP local aponta para [mcp-design-system/server.cjs](mcp-design-system/server.cjs#L20), que resolve o base path padrão como:

- `C:/Users/Educacross/Documents/Educacross/educacross-frontoffice/educacross-frontoffice/src`

Resultado da verificação local:

- `C:\Users\Educacross\Documents\Educacross\educacross-frontoffice`
- `C:\Users\Educacross\Documents\Educacross\educacross-frontoffice\educacross-frontoffice`
- Situação: caminhos inexistentes no ambiente atual.

### 3. Diretório alternativo encontrado anteriormente

Foi verificado também o caminho:

- `C:\Users\Educacross\Documents\Projetos Educacross\DesignSystem-Vuexy\educacross-frontoffice`

Resultado da verificação local:

- O diretório existe.
- Contagem de arquivos recursiva: `0`.
- Situação: diretório vazio, sem código legível para comparação.

### 4. Busca ampliada em Documents

Foi executada busca ampla por diretórios chamados `educacross-frontoffice` dentro de `C:\Users\Educacross\Documents`.

Resultado:

- Apenas `C:\Users\Educacross\Documents\Projetos Educacross\DesignSystem-Vuexy\educacross-frontoffice` foi encontrado.
- Esse diretório permanece vazio.

### 5. Busca por EButton, EInput e ESelect fora do workspace atual

Foi executada busca ampliada por arquivos `EButton*.vue`, `EInput*.vue` e `ESelect*.vue` em `C:\Users\Educacross\Documents`.

Resultado:

- Foram encontrados apenas arquivos do próprio workspace atual, worktrees associadas e projetos não relacionados.
- Não foi encontrada uma cópia externa utilizável do `educacross-frontoffice` com os componentes-base alvo.

---

## Classificação por critério da Story 4.2

| Critério | Resultado |
|---|---|
| Fonte real e legível encontrada | Não |
| Código aplicável a produção/legado disponível | Não |
| EButton verificável externamente | Não |
| EInput verificável externamente | Não |
| ESelect verificável externamente | Não |
| Bloqueio formal comprovado | Sim |

---

## Conclusão operacional

A Story 4.2, nesta rodada, atinge o desfecho alternativo previsto nos critérios de aceite: **bloqueio formal documentado por ausência de fonte externa válida**, sem inferências de compatibilidade.

Com isso:

- não é seguro abrir story de parity com produção;
- não é seguro adicionar aliases ou ajustes de contrato com base em memória, Storybook público ou referência visual isolada;
- a Fase 4 permanece dependente de acesso real ao código legível do `educacross-frontoffice`.

---

## Próximo passo recomendado

Para destravar a continuidade da Fase 4, é necessário um dos seguintes movimentos:

1. Disponibilizar localmente uma cópia somente leitura e não vazia do `educacross-frontoffice`.
2. Atualizar o caminho do MCP e da documentação para um repositório real existente.
3. Entregar um snapshot auditável do código-fonte aplicável a EButton, EInput e ESelect.

Sem um desses três movimentos, a iniciativa deve permanecer bloqueada no recorte de baseline externa.