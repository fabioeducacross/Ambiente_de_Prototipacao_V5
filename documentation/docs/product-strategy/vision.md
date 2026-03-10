---
sidebar_position: 1
title: Visão e Estratégia de Produto
description: Nossa visão de longo prazo e estratégia para transformar a educação
---

import { IconCheck, IconConstruction, IconTarget, IconRocket, IconChart, IconLightbulb } from '@site/src/components/MaterialIcon';

# Visão e Estratégia de Produto

Este documento define **onde queremos chegar**, **por que existimos** e **como vamos nos diferenciar** no mercado de edtechs.

:::info Documento Vivo
Esta é uma **fonte de verdade** da estratégia de produto. Deve ser revisada a cada trimestre e atualizada conforme evoluímos.
:::

---

## <span class="material-symbols-outlined">track_changes</span> Nossa Visão (3-5 anos)

> **"Ser a plataforma educacional mais amada por professores e alunos, transformando o aprendizado em uma jornada gamificada, personalizada e alinhada aos objetivos pedagógicos de cada rede de ensino."**

### O Que Significa na Prática

**Para Professores:**
- <span class="material-symbols-outlined">check_circle</span> Economizar **5 horas por semana** em planejamento e correção
- <span class="material-symbols-outlined">check_circle</span> Ter **100% de visibilidade** do progresso de cada aluno
- <span class="material-symbols-outlined">check_circle</span> Personalizar conteúdos em **menos de 5 minutos**

**Para Alunos:**
- <span class="material-symbols-outlined">check_circle</span> Engajamento **diário** com atividades gamificadas
- <span class="material-symbols-outlined">check_circle</span> Aprendizado **autônomo** e no próprio ritmo
- <span class="material-symbols-outlined">check_circle</span> Feedback **imediato** e reconhecimento por conquistas

**Para Gestores:**
- <span class="material-symbols-outlined">check_circle</span> Dados consolidados de **toda a rede** em um só lugar
- <span class="material-symbols-outlined">check_circle</span> Identificação precoce de **alunos em risco**
- <span class="material-symbols-outlined">check_circle</span> ROI educacional **mensurável**

---

## <span class="material-symbols-outlined">rocket_launch</span> Missão

**Por que existimos:**

> **"Democratizar o acesso a uma educação de qualidade através de tecnologia que empodera professores, engaja alunos e gera resultados mensuráveis."**

### Nossos Valores

| Valor | Significado | Como Aplicamos |
|-------|-------------|----------------|
| **<span class="material-symbols-outlined">school</span> Pedagogia Primeiro** | Tecnologia serve a pedagogia, não o contrário | Alinhamento 100% com BNCC |
| **<span class="material-symbols-outlined">handshake</span> Centrado no Usuário** | Construímos com professores, não para eles | User research contínua |
| **<span class="material-symbols-outlined">bar_chart</span> Data-Driven** | Decisões baseadas em dados, não opiniões | Métricas em tudo |
| **<span class="material-symbols-outlined">bolt</span> Simplicidade** | Interfaces intuitivas que não requerem treinamento | Onboarding < 5 minutos |
| **<span class="material-symbols-outlined">public</span> Inclusão** | Acessível mesmo em escolas com baixa conectividade | Offline-first |

---

## <span class="material-symbols-outlined">track_changes</span> North Star Metric

**Métrica que guia TODAS as decisões de produto:**

```mermaid
graph TD
    NSM[<IconTarget /> North Star Metric:<br/>Alunos Ativos Semanais] --> E[Engajamento]
    NSM --> R[Retenção]
    NSM --> V[Valor Percebido]
    
    E --> E1[% de alunos que<br/>completam 1+ missão/semana]
    R --> R1[% que retornam<br/>semana seguinte]
    V --> V1[NPS de professores]
    
    style NSM fill:#7C3AED,color:#fff
    style E fill:#10B981,color:#fff
    style R fill:#3B82F6,color:#fff
    style V fill:#F59E0B,color:#fff
```

### Por Que Essa Métrica?

| Motivo | Explicação |
|--------|------------|
| **Alinha time inteiro** | Produto, marketing, vendas focam no mesmo objetivo |
| **Mede valor real** | Alunos ativos = produto está gerando valor |
| **Leading indicator** | Prediz retenção e NPS futuros |
| **Acionável** | Podemos influenciar diretamente via features |

**Meta 2026:** 60% dos alunos ativos semanalmente (baseline atual: _TODO - preencher quando tivermos dados_)

---

## <span class="material-symbols-outlined">emoji_events</span> Posicionamento de Mercado

### Competitive Landscape

```mermaid
quadrantChart
    title Posicionamento vs Concorrentes
    x-axis "Simples de Usar" --> "Complexo"
    y-axis "Genérico" --> "Personalizado"
    quadrant-1 "Enterprise"
    quadrant-2 "Líderes"
    quadrant-3 "Commodities"
    quadrant-4 "Nicho"
    
    "Educacross": [0.25, 0.75]
    "Google Classroom": [0.3, 0.2]
    "Khan Academy": [0.4, 0.3]
    "Matific": [0.6, 0.65]
    "Plurall": [0.7, 0.8]
```

### Nossa Diferenciação

| Diferencial | Nós | Concorrente A | Concorrente B |
|-------------|-----|---------------|---------------|
| **Alinhamento BNCC** | <span class="material-symbols-outlined">check_circle</span> 100% mapeado | <span class="material-symbols-outlined">warning</span> Parcial | <span class="material-symbols-outlined">cancel</span> Não |
| **Gamificação** | <span class="material-symbols-outlined">check_circle</span> Nativa | <span class="material-symbols-outlined">warning</span> Básica | <span class="material-symbols-outlined">check_circle</span> Avançada |
| **White-label** | <span class="material-symbols-outlined">check_circle</span> Total | <span class="material-symbols-outlined">cancel</span> Não | <span class="material-symbols-outlined">warning</span> Limitado |
| **Offline-first** | <span class="material-symbols-outlined">check_circle</span> Sim | <span class="material-symbols-outlined">cancel</span> Não | <span class="material-symbols-outlined">cancel</span> Não |
| **Customização** | <span class="material-symbols-outlined">check_circle</span> Missões custom | <span class="material-symbols-outlined">warning</span> Limitado | <span class="material-symbols-outlined">cancel</span> Fixo |
| **Preço** | <span class="material-symbols-outlined">payments</span><span class="material-symbols-outlined">payments</span> | <span class="material-symbols-outlined">payments</span><span class="material-symbols-outlined">payments</span><span class="material-symbols-outlined">payments</span> | <span class="material-symbols-outlined">payments</span> |

### Positioning Statement

> **"Para redes de ensino públicas e privadas que precisam de uma solução completa de engajamento e acompanhamento, o Educacross é a única plataforma que combina gamificação com total alinhamento à BNCC, permitindo que cada rede personalize a experiência visual e pedagógica, mantendo simplicidade de uso mesmo em escolas com internet limitada."**

---

## <span class="material-symbols-outlined">track_changes</span> Objetivos Estratégicos (2026)

### 1. Consolidar Liderança em Redes Públicas

**Objetivo:** Ser a plataforma #1 em redes municipais/estaduais

**Iniciativas:**
- <span class="material-symbols-outlined">check_circle</span> Offline-first architecture
- <span class="material-symbols-outlined">check_circle</span> Suporte a baixa conectividade
- <span class="material-symbols-outlined">check_circle</span> Preço competitivo para setor público
- <span class="material-symbols-outlined">sync</span> Integrações com sistemas de gestão escolar (SGE)

**Métricas de Sucesso:**
- 20+ redes públicas usando o produto
- 100.000+ alunos ativos
- NPS > 50 de coordenadores pedagógicos

---

### 2. Escalar com White-Label

**Objetivo:** Permitir que redes personalizem totalmente a plataforma

**Iniciativas:**
- <span class="material-symbols-outlined">check_circle</span> White-label visual (cores, logos, domínios)
- <span class="material-symbols-outlined">sync</span> White-label pedagógico (sistemas de ensino próprios)
- <span class="material-symbols-outlined">sync</span> Multi-tenant architecture escalável

**Métricas de Sucesso:**
- 5+ redes com white-label ativo
- Tempo de onboarding < 2 semanas
- 0 bugs críticos em deploys de white-label

---

### 3. Expandir para Novos Segmentos

**Objetivo:** Crescer além de ensino fundamental

**Iniciativas:**
- <span class="material-symbols-outlined">assignment</span> **TODO:** Validar com pesquisa de mercado
- Possíveis segmentos: Ensino Médio, EJA, Educação Infantil

**Métricas de Sucesso:**
- _TODO: Definir após validação de segmento_

---

## <span class="material-symbols-outlined">explore</span> Pilares Estratégicos

### Pilar 1: Experiência do Professor

**Tese:** Professores felizes = Alunos engajados

**Apostas:**
1. Dashboard com KPIs acionáveis (não apenas números)
2. Criação de missões custom em < 5 minutos
3. Sugestões de intervenções baseadas em dados

**Anti-padrões:**
- <span class="material-symbols-outlined">cancel</span> Complexidade excessiva
- <span class="material-symbols-outlined">cancel</span> Muitos cliques para ações simples
- <span class="material-symbols-outlined">cancel</span> Relatórios que ninguém entende

---

### Pilar 2: Gamificação que Educa

**Tese:** Gamificação deve reforçar aprendizado, não distrair

**Apostas:**
1. Rankings que celebram progresso, não apenas pontos
2. Missões que exigem raciocínio, não sorte
3. Recompensas alinhadas a conquistas pedagógicas

**Anti-padrões:**
- <span class="material-symbols-outlined">cancel</span> Gamificação vazia (pontos sem contexto)
- <span class="material-symbols-outlined">cancel</span> Competição que exclui alunos com dificuldade
- <span class="material-symbols-outlined">cancel</span> Mecânicas que viciam sem educar

---

### Pilar 3: Dados que Acionam

**Tese:** Dados sem ação são inúteis

**Apostas:**
1. Alertas inteligentes (aluno em risco, baixa participação)
2. Drill-down de habilidades BNCC
3. Comparação contextualizada (turma vs rede)

**Anti-padrões:**
- <span class="material-symbols-outlined">cancel</span> Dashboards genéricos
- <span class="material-symbols-outlined">cancel</span> Métricas de vaidade
- <span class="material-symbols-outlined">cancel</span> Dados sem recomendações

---

## <span class="material-symbols-outlined">bar_chart</span> Métricas de Sucesso da Estratégia

| Categoria | Métrica | Baseline (2025) | Meta 2026 | Status |
|-----------|---------|-----------------|-----------|--------|
| **Adoção** | Alunos ativos (MAU) | _TODO_ | 200.000 | <span class="material-symbols-outlined">sync</span> |
| **Engajamento** | % alunos ativos semanalmente | _TODO_ | 60% | <span class="material-symbols-outlined">sync</span> |
| **Retenção** | Churn mensal de redes | _TODO_ | < 5% | <span class="material-symbols-outlined">sync</span> |
| **Satisfação** | NPS de professores | _TODO_ | > 50 | <span class="material-symbols-outlined">sync</span> |
| **Eficácia** | % de missões concluídas | 75% | 85% | <IconCheck /> |
| **Performance** | Tempo médio na plataforma | _TODO_ | 15-25min/sessão | <span class="material-symbols-outlined">sync</span> |

:::warning Métricas a Definir
Seções marcadas com _TODO_ devem ser preenchidas quando implementarmos analytics em produção.
:::

---

## <span class="material-symbols-outlined">construction</span> O Que NÃO Vamos Fazer (Estratégia de "NO")

| Pedido Comum | Por Que NÃO |
|--------------|-------------|
| **Rede social entre alunos** | Risco de moderação e responsabilidade legal |
| **Videochamadas integradas** | Fora do core, existem soluções melhores (Zoom, Meet) |
| **Venda direta para pais** | Modelo B2B2C é complexo, foco em B2B2B (rede → escola → professor) |
| **Conteúdo não-BNCC** | Dilui nosso diferencial, aumenta manutenção |
| **Mobile app nativo** | PWA resolve 80% dos casos com 20% do esforço |

---

## <span class="material-symbols-outlined">sync</span> Ciclo de Revisão

Este documento deve ser revisado:

- **Trimestralmente:** Ajuste de métricas e iniciativas
- **Anualmente:** Revisão profunda da visão e posicionamento
- **Eventos especiais:** Pivô estratégico, mudança de mercado, novo concorrente

**Próxima revisão agendada:** <span class="material-symbols-outlined">calendar_today</span> _TODO: Definir data do próximo review_

---

## <span class="material-symbols-outlined">link</span> Documentos Relacionados

- [Regras de Negócio](../business-rules/) - Como o produto funciona
- [Personas](../personas/) - Quem são nossos usuários
- [Jornadas](../journeys/) - O que eles fazem no produto
- Roadmap - _TODO: Criar roadmap trimestral_

---

:::tip Contribua
Este documento é colaborativo. Se você tem insights de usuários, pesquisas de mercado ou dados que mudam a estratégia, abra um **Product Decision Record** documentando sua proposta.
:::

---

**Última atualização:** Fevereiro 2026  
**Responsável:** Time de Produto  
**Status:** <IconConstruction /> Em construção (70% completo)
