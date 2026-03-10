---
sidebar_position: 2
title: Gestor
description: Pesquisa e hipóteses sobre o gestor/coordenador
---
import { IconAdmin, IconCheck, IconCircleYellow, IconClipboard, IconLightbulb } from '@site/src/components/MaterialIcon';


# Discovery: Gestor

Documentação das **dores**, **objetivos** e **oportunidades** identificadas para a persona Gestor, com rastreabilidade de fontes.

---

## Resumo de Fontes

| Fonte | Tipo | Data | Confiança |
|-------|------|------|-----------|
| Hipótese inicial | Suposição da equipe | Fev/2026 | <IconCircleYellow /> Baixa |
| *Entrevistas (pendente)* | *Pesquisa primária* | *—* | *—* |
| *Analytics (pendente)* | *Dados quantitativos* | *—* | *—* |

:::warning Atenção
Os dados abaixo são **hipóteses não validadas**. Foram gerados por IA com base em padrões comuns de EdTech, não em pesquisa real com usuários do Educacross.
:::

---

## Dores Identificadas

| Dor | Impacto | Frequência | Fonte | Confiança |
|-----|---------|------------|-------|-----------|
| Não sabe quem está pendente de aprovação | Alta | Diária | Hipótese | <IconCircleYellow /> |
| Difícil comparar desempenho entre turmas | Alta | Semanal | Hipótese | <IconCircleYellow /> |
| Processo de aprovar perfis é manual e lento | Média | Diária | Hipótese | <IconCircleYellow /> |
| Relatórios não têm formato para diretoria | Média | Mensal | Hipótese | <IconCircleYellow /> |

### Como validar

- [ ] Entrevistar 3 coordenadores sobre rotina de aprovação
- [ ] Medir tempo médio entre solicitação e aprovação
- [ ] Analisar quais formatos de relatório são mais exportados

---

## Objetivos do Gestor

| Objetivo | Prioridade | Fonte | Confiança |
|----------|------------|-------|-----------|
| Gerenciar acessos rapidamente | Alta | Hipótese | <IconCircleYellow /> |
| Ter visão consolidada de todas turmas | Alta | Hipótese | <IconCircleYellow /> |
| Garantir que professores usem a plataforma | Média | Hipótese | <IconCircleYellow /> |
| Reportar resultados para diretoria | Média | Hipótese | <IconCircleYellow /> |

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
| Aprovação em lote | Alto | Médio | Hipótese | <IconClipboard /> Backlog |
| Filtros por escola/tipo/data | Médio | Baixo | Hipótese | <IconClipboard /> Backlog |
| Notificação push de pendências | Alto | Alto | Hipótese | <IconLightbulb /> Ideação |
| Templates de relatório | Médio | Médio | Hipótese | <IconLightbulb /> Ideação |

---

## Jobs-to-be-Done (JTBD)

| Job | Fonte | Confiança |
|-----|-------|-----------|
| Quando chego na escola, quero ver se há perfis pendentes, para não atrasar o acesso de novos usuários. | Hipótese | <IconCircleYellow /> |
| Quando a diretoria pede métricas, quero gerar relatório consolidado, para mostrar o ROI da plataforma. | Hipótese | <IconCircleYellow /> |
| Quando preciso recusar um perfil, quero registrar o motivo, para ter histórico da decisão. | Hipótese | <IconCircleYellow /> |

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
| Quando chego na escola, quero ver perfis pendentes | [ADMIN-001: User Management](../journeys/administrator/user-management) | <IconCheck /> |
| Quando a diretoria pede métricas, quero gerar relatório | [ADMIN-001: Mission Reports](../journeys/coordinator/mission-reports) | <IconCheck /> |
| Quando preciso recusar um perfil, quero registrar o motivo | [ADMIN-001: User Management](../journeys/administrator/user-management) | <IconCheck /> |
| Quando analiso competências, quero ver mapas de habilidades | [ADMIN-004: Skill Report](../journeys/coordinator/skill-report) | <IconCheck /> |

→ [Ver todas as jornadas de Gestor](../journeys/administrator/user-management)

---

## Referências

- [Persona: Gestor](../personas/gestor) — Visão de produto
- [Fluxo: Aceitar/Recusar Perfil](../fluxos/aceitar-recusar-perfil) — Documentação do fluxo
- [Catálogo de Jornadas](../journeys/) — Todas as jornadas por perfil

