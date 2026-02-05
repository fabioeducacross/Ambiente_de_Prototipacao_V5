---
sidebar_position: 2
title: 👨‍💼 Gestor
description: Pesquisa e hipóteses sobre o gestor/coordenador
---

# Discovery: Gestor

Documentação das **dores**, **objetivos** e **oportunidades** identificadas para a persona Gestor, com rastreabilidade de fontes.

---

## Resumo de Fontes

| Fonte | Tipo | Data | Confiança |
|-------|------|------|-----------|
| Hipótese inicial | Suposição da equipe | Fev/2026 | 🟡 Baixa |
| *Entrevistas (pendente)* | *Pesquisa primária* | *—* | *—* |
| *Analytics (pendente)* | *Dados quantitativos* | *—* | *—* |

:::warning Atenção
Os dados abaixo são **hipóteses não validadas**. Foram gerados por IA com base em padrões comuns de EdTech, não em pesquisa real com usuários do Educacross.
:::

---

## Dores Identificadas

| Dor | Impacto | Frequência | Fonte | Confiança |
|-----|---------|------------|-------|-----------|
| Não sabe quem está pendente de aprovação | Alta | Diária | Hipótese | 🟡 |
| Difícil comparar desempenho entre turmas | Alta | Semanal | Hipótese | 🟡 |
| Processo de aprovar perfis é manual e lento | Média | Diária | Hipótese | 🟡 |
| Relatórios não têm formato para diretoria | Média | Mensal | Hipótese | 🟡 |

### Como validar

- [ ] Entrevistar 3 coordenadores sobre rotina de aprovação
- [ ] Medir tempo médio entre solicitação e aprovação
- [ ] Analisar quais formatos de relatório são mais exportados

---

## Objetivos do Gestor

| Objetivo | Prioridade | Fonte | Confiança |
|----------|------------|-------|-----------|
| Gerenciar acessos rapidamente | Alta | Hipótese | 🟡 |
| Ter visão consolidada de todas turmas | Alta | Hipótese | 🟡 |
| Garantir que professores usem a plataforma | Média | Hipótese | 🟡 |
| Reportar resultados para diretoria | Média | Hipótese | 🟡 |

---

## Critérios de Sucesso (Propostos)

| Critério | Meta | Atual | Fonte |
|----------|------|-------|-------|
| Ver perfis pendentes | 1 tela | ? | Hipótese |
| Aprovar/Recusar perfil | < 2 cliques | ? | Hipótese |
| Comparar turmas | Dashboard único | ? | Hipótese |
| Exportar relatório | Formato compatível | ? | Hipótese |

---

## Oportunidades de Melhoria

| Oportunidade | Impacto | Esforço | Fonte | Status |
|--------------|---------|---------|-------|--------|
| Aprovação em lote | Alto | Médio | Hipótese | 📋 Backlog |
| Filtros por escola/tipo/data | Médio | Baixo | Hipótese | 📋 Backlog |
| Notificação push de pendências | Alto | Alto | Hipótese | 💡 Ideação |
| Templates de relatório | Médio | Médio | Hipótese | 💡 Ideação |

---

## Jobs-to-be-Done (JTBD)

| Job | Fonte | Confiança |
|-----|-------|-----------|
| Quando chego na escola, quero ver se há perfis pendentes, para não atrasar o acesso de novos usuários. | Hipótese | 🟡 |
| Quando a diretoria pede métricas, quero gerar relatório consolidado, para mostrar o ROI da plataforma. | Hipótese | 🟡 |
| Quando preciso recusar um perfil, quero registrar o motivo, para ter histórico da decisão. | Hipótese | 🟡 |

---

## Histórico de Validações

| Data | Método | Resultado | Responsável |
|------|--------|-----------|-------------|
| — | — | Nenhuma validação realizada ainda | — |

---

## Jornadas Relacionadas

As seguintes jornadas implementam os JTBDs acima:

| JTBD | Jornada | Status |
|------|---------|--------|
| Quando chego na escola, quero ver perfis pendentes | [ADMIN-006: User Management](../journeys/admin/user-management) | ✅ |
| Quando a diretoria pede métricas, quero gerar relatório | [ADMIN-001: Mission Reports](../journeys/admin/mission-reports) | ✅ |
| Quando preciso recusar um perfil, quero registrar o motivo | [ADMIN-006: User Management](../journeys/admin/user-management) | ✅ |
| Quando analiso competências, quero ver mapas de habilidades | [ADMIN-004: Skill Report](../journeys/admin/skill-report) | ✅ |

→ [Ver todas as jornadas de Gestor](../journeys/admin/)

---

## Referências

- [Persona: Gestor](../personas/gestor) — Visão de produto
- [Fluxo: Aceitar/Recusar Perfil](../fluxos/aceitar-recusar-perfil) — Documentação do fluxo
- [Catálogo de Jornadas](../journeys/) — Todas as jornadas por perfil

