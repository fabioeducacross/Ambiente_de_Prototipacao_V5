---
sidebar_position: 1
title: Professor
description: Pesquisa e hipóteses sobre o professor
---
import { IconCheck, IconCircleYellow, IconClipboard, IconLightbulb, IconTeacher } from '@site/src/components/MaterialIcon';


# Discovery: Professor

Documentação das **dores**, **objetivos** e **oportunidades** identificadas para a persona Professor, com rastreabilidade de fontes.

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
| Alunos desmotivados com conteúdo digital | Alta | Diária | Hipótese | <IconCircleYellow /> |
| Dificuldade em ver progresso individual | Alta | Semanal | Hipótese | <IconCircleYellow /> |
| Muitos cliques para habilitar missões | Média | Diária | Hipótese | <IconCircleYellow /> |
| Relatórios confusos ou incompletos | Média | Mensal | Hipótese | <IconCircleYellow /> |

### Como validar

- [ ] Entrevistar 5 professores sobre rotina de uso
- [ ] Analisar tempo médio para habilitar missão (analytics)
- [ ] Revisar tickets de suporte relacionados a relatórios

---

## Objetivos do Professor

| Objetivo | Prioridade | Fonte | Confiança |
|----------|------------|-------|-----------|
| Engajar alunos nas atividades digitais | Alta | Hipótese | <IconCircleYellow /> |
| Acompanhar progresso de cada aluno | Alta | Hipótese | <IconCircleYellow /> |
| Personalizar ritmo por grupo | Média | Hipótese | <IconCircleYellow /> |
| Economizar tempo na preparação | Média | Hipótese | <IconCircleYellow /> |

---

## Critérios de Sucesso (Propostos)

| Critério | Meta | Atual | Fonte |
|----------|------|-------|-------|
| Habilitar missão | < 3 cliques | ? | Hipótese |
| Ver dashboard completo | 1 tela | ? | Hipótese |
| Identificar aluno em risco | < 10 seg | ? | Hipótese |
| Gerar relatório | < 2 min | ? | Hipótese |

### Como medir

- [ ] Implementar tracking de cliques no fluxo de habilitação
- [ ] Medir tempo até primeira ação no dashboard
- [ ] Survey de satisfação após gerar relatório

---

## Oportunidades de Melhoria

| Oportunidade | Impacto | Esforço | Fonte | Status |
|--------------|---------|---------|-------|--------|
| Ações em lote para missões | Alto | Médio | Hipótese | <IconClipboard /> Backlog |
| Atalhos rápidos nos cards | Médio | Baixo | Hipótese | <IconClipboard /> Backlog |
| Alertas de alunos inativos | Alto | Alto | Hipótese | <IconLightbulb /> Ideação |
| Templates de habilitação | Médio | Médio | Hipótese | <IconLightbulb /> Ideação |

---

## Jobs-to-be-Done (JTBD)

```
Quando [CONTEXTO], eu quero [MOTIVAÇÃO], para que [RESULTADO ESPERADO].
```

| Job | Fonte | Confiança |
|-----|-------|-----------|
| Quando preparo a aula da semana, quero ver rapidamente os livros disponíveis, para escolher o conteúdo certo para minha turma. | Hipótese | <IconCircleYellow /> |
| Quando quero liberar atividades, quero habilitar várias missões de uma vez, para não perder tempo repetindo a mesma ação. | Hipótese | <IconCircleYellow /> |
| Quando a coordenação pede relatório, quero exportar dados de desempenho, para mostrar o progresso da turma. | Hipótese | <IconCircleYellow /> |

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
| Quando preparo a aula, quero ver os livros disponíveis | [PROF-001: Education System Books](../journeys/teacher/education-system-books) | <IconCheck /> |
| Quando quero liberar atividades, quero habilitar missões | [PROF-002: Education System Missions](../journeys/teacher/education-system-missions) | <IconCheck /> |
| Quando o conteúdo padrão não atende, quero criar missões | [PROF-003: Custom Missions](../journeys/teacher/custom-missions) | <IconCheck /> |
| Quando preciso avaliar a turma, quero configurar eventos | [PROF-004: Events Management](../journeys/teacher/events-management) | <IconCheck /> |
| Quando a coordenação pede relatório, quero exportar dados | [PROF-007: Mission Analytics](../journeys/teacher/mission-analytics) | <IconCheck /> |

→ [Ver todas as jornadas de Professor](../journeys/teacher/)

---

## Referências

- [Persona: Professor](../personas/professor) — Visão de produto
- [Fluxo: Habilitar Missões](../fluxos/habilitar-missoes) — Documentação do fluxo
- [Fluxo: Gerar Relatório](../fluxos/gerar-relatorio) — Documentação do fluxo
| — | — | Nenhuma validação realizada ainda | — |

---

## Próximos Passos

1. **Agendar entrevistas** — Recrutar 5 professores para entrevista de 30min
2. **Definir roteiro** — Perguntas sobre rotina, dores e desejos
3. **Analisar resultados** — Atualizar esta página com dados reais

---

## Referências

- [Persona: Professor](../personas/professor) — Visão de produto
- [Fluxo: Habilitar Missões](../fluxos/habilitar-missoes) — Documentação do fluxo
- [Jornadas do Professor](../journeys/teacher/) — Jornadas detalhadas

