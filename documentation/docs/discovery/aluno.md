---
sidebar_position: 3
title: Aluno
description: Pesquisa e hipóteses sobre o estudante
---
import {
  IconCheck,
  IconCircleYellow,
  IconClipboard,
  IconGraduation,
  IconLightbulb,
  IconStudent
} from '@site/src/components/MaterialIcon';


# Discovery: Aluno

Documentação das **dores**, **objetivos** e **oportunidades** identificadas para a persona Aluno, com rastreabilidade de fontes.

---

## Resumo de Fontes

| Fonte | Tipo | Data | Confiança |
|-------|------|------|-----------|
| Hipótese inicial | Suposição da equipe | Fev/2026 | <IconCircleYellow /> Baixa |
| *Observação em sala (pendente)* | *Pesquisa primária* | *—* | *—* |
| *Analytics (pendente)* | *Dados quantitativos* | *—* | *—* |

:::warning Atenção
Os dados abaixo são **hipóteses não validadas**. Foram gerados por IA com base em padrões comuns de EdTech, não em pesquisa real com usuários do Educacross.
:::

---

## Dores Identificadas

| Dor | Impacto | Frequência | Fonte | Confiança |
|-----|---------|------------|-------|-----------|
| Atividades chatas e repetitivas | Alta | Diária | Hipótese | <IconCircleYellow /> |
| Não sabe quantas missões faltam | Média | Semanal | Hipótese | <IconCircleYellow /> |
| Demora para carregar em internet lenta | Alta | Diária | Hipótese | <IconCircleYellow /> |
| Não entende o que errou | Média | Por atividade | Hipótese | <IconCircleYellow /> |

### Como validar

- [ ] Observar 5 alunos usando a plataforma (sem intervir)
- [ ] Analisar taxa de abandono por tipo de missão
- [ ] Medir tempo de carregamento em conexões lentas (3G)
- [ ] Analisar onde alunos clicam após mensagem de erro

---

## Objetivos do Aluno

| Objetivo | Prioridade | Fonte | Confiança |
|----------|------------|-------|-----------|
| Se divertir enquanto aprende | Alta | Hipótese | <IconCircleYellow /> |
| Ganhar recompensas (medalhas, pontos) | Alta | Hipótese | <IconCircleYellow /> |
| Ver progresso de forma visual | Média | Hipótese | <IconCircleYellow /> |
| Competir saudavelmente com colegas | Média | Hipótese | <IconCircleYellow /> |

---

## Critérios de Sucesso (Propostos)

| Critério | Meta | Atual | Fonte |
|----------|------|-------|-------|
| Iniciar missão | < 3 toques | ? | Hipótese |
| Ver progresso claramente | Barra visível | ? | Hipótese |
| Feedback ao completar | Imediato | ? | Hipótese |
| Funcionar offline | Missões baixadas | ? | Hipótese |

---

## Oportunidades de Melhoria

| Oportunidade | Impacto | Esforço | Fonte | Status |
|--------------|---------|---------|-------|--------|
| Modo offline | Alto | Alto | Hipótese | <IconLightbulb /> Ideação |
| Avatar customizável | Médio | Médio | Hipótese | <IconLightbulb /> Ideação |
| Mini-jogos bônus | Alto | Alto | Hipótese | <IconLightbulb /> Ideação |
| Feedback explicativo de erros | Médio | Médio | Hipótese | <IconClipboard /> Backlog |

---

## Jobs-to-be-Done (JTBD)

| Job | Fonte | Confiança |
|-----|-------|-----------|
| Quando abro o app, quero ver minhas missões rapidamente, para saber o que preciso fazer hoje. | Hipótese | <IconCircleYellow /> |
| Quando termino uma atividade, quero saber se fui bem, para me sentir motivado a continuar. | Hipótese | <IconCircleYellow /> |
| Quando erro uma questão, quero entender por que errei, para não errar de novo. | Hipótese | <IconCircleYellow /> |

---

## Considerações Especiais

### Pesquisa com Menores

:::info Ética em Pesquisa
Pesquisas com crianças exigem:
- Consentimento dos pais/responsáveis
- Linguagem adequada à idade
- Sessões curtas (máx 20-30min)
- Ambiente seguro e familiar
- Aprovação de comitê de ética (se aplicável)
:::

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
| Quando abro o app, quero ver minhas missões | [STUDENT-001: Student Dashboard](../journeys/student/student-dashboard) | <IconCheck /> |
| Quando quero aprender algo novo, quero uma trilha personalizada | [STUDENT-002: Learning Path](../journeys/student/learning-path) | <IconClipboard /> Pendente |
| Quando quero explorar, quero acessar jogos e conteúdos | [STUDENT-003: Library & Games](../journeys/student/library-games) | <IconClipboard /> Pendente |

→ [Ver todas as jornadas de Aluno](../journeys/student/)

---

## Referências

- [Persona: Aluno](../personas/aluno) — Visão de produto
- [Fluxo: Completar Missão](../fluxos/completar-missao) — Documentação do fluxo
- [Catálogo de Jornadas](../journeys/) — Todas as jornadas por perfil

### Métodos Recomendados

| Método | Por que funciona | Cuidados |
|--------|------------------|----------|
| Observação em sala | Comportamento real, sem viés de resposta | Não intervir, apenas observar |
| Teste de usabilidade | Ver onde travam | Sessões curtas, com pausas |
| Análise de analytics | Dados quantitativos em escala | Não identifica "por quê" |
| Feedback do professor | Visão de quem acompanha diariamente | Pode ter viés de adulto |

---

## Histórico de Validações

| Data | Método | Resultado | Responsável |
|------|--------|-----------|-------------|
| — | — | Nenhuma validação realizada ainda | — |

---

## Referências

- [Persona: Aluno](../personas/aluno) — Visão de produto
- [Fluxo: Completar Missão](../fluxos/completar-missao) — Documentação do fluxo
- [Jornadas do Estudante](../journeys/student/) — Jornadas detalhadas

