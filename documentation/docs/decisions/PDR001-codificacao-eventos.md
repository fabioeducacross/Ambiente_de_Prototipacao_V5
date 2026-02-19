---
sidebar_position: 1
title: PDR 001: Codificação de Eventos no Calendário
description: Decisão sobre como diferenciar eventos por cores e ícones
---

# PDR 001: Codificação de Eventos no Calendário

*   **Status**: ✅ Aceito
*   **Data**: 2026-02-12
*   **Autor**: Equipe de Produto / UX

---

## 📋 Contexto

Com a consolidação de diferentes fontes de dados no Calendário Unificado (Missões Educacross, Atividades de Rede, Eventos do Professor e Atividades Escolares), surgiu o desafio de como tornar essas informações rapidamente escaneáveis para o usuário sem sobrecarregar a interface.

O usuário precisa saber rapidamente:
1.  **O que é o evento?** (Categoria: Missão, Avaliação, Feriado, etc.)
2.  **De onde veio o evento?** (Origem: Educacross, Secretaria, Escola ou ele mesmo)

---

## ⚖️ Decisão

Decidimos utilizar uma **estratégia de codificação dupla**:
1.  **Cores Sólidas para Categorias**: O "fundo" do card/chip do evento indica a categoria pedagógica.
2.  **Ícones Simbólicos para Origem**: Um ícone discreto no canto esquerdo do chip indica quem criou/postou aquele evento.

### Prioridade Visual
UX Research indicou que a **Categoria** é a informação primária para o planejamento diário ("Tenho uma avaliação amanhã?"), enquanto a **Origem** é secundária para entendimento de hierarquia ("Isso veio da rede ou eu que criei?"). Por isso, a cor (elemento mais forte visualmente) foi atribuída à categoria.

---

## 🔄 Alternativas Consideradas

### Alternativa A: Borda colorida para Origem + Cor de fundo para Categoria
*   **Pró**: Máxima distinção.
*   **Contra**: Poluição visual extrema ("Carnaval de cores"). Alto ruído cognitivo em calendários muito cheios.

### Alternativa B: Apenas texto indicando origem e categoria
*   **Pró**: Simplicidade técnica.
*   **Contra**: Lentidão na leitura. O usuário precisa ler cada item individualmente em vez de identificar padrões visuais.

---

## ✅ Justificativa

A abordagem escolhida (Ícone + Cor) equilibra densidade de informação com limpeza visual:
*   Mecanismo de **Pre-attentive processing**: O cérebro capta a cor instantaneamente antes mesmo da leitura.
*   **Acessibilidade**: Usuários daltônicos podem contar com os ícones e o rótulo textual, enquanto usuários em geral se beneficiam da cor.
*   **Consistência**: Alinha-se ao Design System Vuexy, utilizando a paleta extendida para calendários.

---

## 📈 Consequências

### Positivas
*   Redução no tempo de escaneamento visual do calendário.
*   Clareza imediata sobre a carga de trabalho imposta por diferentes níveis da hierarquia (ex: identificar rapidamente o que é evento da Rede).

### Riscos / Atenção
*   Necessidade de uma legenda sempre acessível para novos usuários.
*   Limitação de categorias: Não podemos ter 50 cores diferentes, pois o cérebro humano distingue bem apenas ~7-9 cores em uma grade.

---

## 🛠️ Implementação

A implementação deve seguir as variáveis de CSS definidas no `SPEC-CALENDARIO-PROTOTIPO.md` e utilizar os `Material Symbols` para os ícones de origem.
