---
sidebar_position: 11
title: Accessibility (WCAG)
description: Padrões e diretrizes de acessibilidade na wiki e protótipos
---

# Accessibility (WCAG Compliance)

O Educacross tem como compromisso ser uma plataforma inclusiva. No **Ambiente de Prototipação V5**, seguimos as diretrizes da **WCAG 2.1 (Web Content Accessibility Guidelines)** com nível de conformidade alvo **AA**.

---

## 🏗️ Pilares da Inclusão

### 1. Percepção (Perceivable)
*   **Contraste de Cores**: Garantimos um contraste mínimo de **4.5:1** para texto normal e **3:1** para texto grande.
*   **Conteúdo não textual**: Todos os ícones (Material Symbols) devem possuir nomes descritivos ou labels ARIA quando executam ações.
*   **Estados Visuais**: Elementos interativos devem ter estados claros de `hover`, `focus` e `active`.

### 2. Operabilidade (Operable)
*   **Navegação por Teclado**: Todo o protótipo deve ser navegável via teclado (`Tab`, `Enter`, `Space`).
*   **Foco Visível**: O "outline" de foco não deve ser removido, sendo estilizado para combinar com o Design System.
*   **Ações de Tempo**: Interfaces que exigem interação rápida (como jogos ou timers em missões) devem oferecer opções para pausar ou estender o tempo.

### 3. Compreensão (Understandable)
*   **Linguagem Clara**: Evitamos jargões técnicos complexos, especialmente em interfaces de professores e alunos.
*   **Feedback de Erro**: Formulários de criação de evento no calendário mostram mensagens de erro claras e indicam exatamente onde está o problema.

---

## 🛠️ Ferramentas de Validação

Para garantir a qualidade, utilizamos:
*   **Lighthouse**: Auditoria constante de acessibilidade no build do Docusaurus.
*   **Axe-core**: Extensão utilizada durante o desenvolvimento para identificar problemas de contraste e ARIA.
*   **Simuladores de Daltonismo**: Verificação das cores do Calendário para garantir que Categorias sejam distinguíveis por usuários com protanopia/deuteranopia.

---

## 🎨 Cores e Acessibilidade no Calendário

Conforme definido na [PDR 001](../decisions/PDR001-codificacao-eventos.md), a acessibilidade foi um fator chave na escolha da codificação dupla (Cor + Ícone):

| Categoria | Cor Hex | Acessibilidade |
|-----------|---------|----------------|
| Missões | `#7F6CC3` | Texto em Branco/Escuro conforme contraste |
| Avaliações | `#FE5153` | Acompanhado de ícone específico para não depender apenas da cor |

---

## 📝 Checklist de Acessibilidade para Novos Componentes

- [ ] Possui contraste adequado (4.5:1)?
- [ ] É navegável via teclado?
- [ ] Tem labels ARIA em elementos sem texto?
- [ ] O estado de foco está visível?
- [ ] Passou no teste de simulador de daltonismo?
