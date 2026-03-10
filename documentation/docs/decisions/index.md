---
sidebar_position: 0
title: Product Decision Records (PDRs)
description: Registro de decisões importantes de produto
---

# <span class="material-symbols-outlined">track_changes</span> Product Decision Records (PDRs)

Registro histórico de decisões importantes de produto e suas justificativas.

:::info Por Que PDRs?
**PDRs** (inspirados em ADRs - Architecture Decision Records) capturam:
- **Contexto** da decisão no momento
- **Alternativas consideradas** e seus trade-offs
- **Justificativa** baseada em dados
- **Consequências esperadas** e como medir

Isso evita refazer debates já resolvidos e fornece contexto para novos membros do time.
:::

---

## <span class="material-symbols-outlined">rocket_launch</span> Como Usar

### Para Product Managers
1. Use o [Template PDR](./template.md) quando tomar **decisões impactantes**
2. Liste pelo menos 3 alternativas consideradas
3. Documente trade-offs e justificativa com dados
4. Marque como "Aceito" após consenso com stakeholders

### Quando Criar um PDR?

Crie PDR para decisões que:
- <span class="material-symbols-outlined">check_circle</span> Impactam múltiplas features ou o produto inteiro
- <span class="material-symbols-outlined">check_circle</span> São difíceis de reverter (alto custo de mudança)
- <span class="material-symbols-outlined">check_circle</span> Têm trade-offs significativos
- <span class="material-symbols-outlined">check_circle</span> Afetam experiência do usuário core
- <span class="material-symbols-outlined">check_circle</span> Mudam regras de negócio fundamentais
- <span class="material-symbols-outlined">cancel</span> Não crie PDR para decisões triviais (ex: cor de botão, wording de label)

### Para Desenvolvedores
- PDRs explicam **por quê** certas regras existem
- Consulte antes de propor mudanças em lógica de negócio
- Use PDRs como referência em code reviews

### Para Novos Membros
- Leia PDRs para entender decisões passadas
- Evite reabrir debates já resolvidos
- Se discordar, proponha novo PDR com novos dados

---

## <span class="material-symbols-outlined">library_books</span> Template e Exemplos

<div className="cards-grid">
  <div className="feature-card">
    <div className="feature-card-icon"><span class="material-symbols-outlined">edit_note</span></div>
    <div className="feature-card-content">
      <h3>Template PDR</h3>
      <p>Use este template para criar novos PDRs</p>
      <a href="./template" className="card-link">
        Ver Template <span className="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-card-icon"><span class="material-symbols-outlined">emoji_events</span></div>
    <div className="feature-card-content">
      <h3>PDR-001: Ranking por Turma</h3>
      <p>Por que ranking é apenas por turma, nunca nacional</p>
      <a href="./template" className="card-link">
        Ver Exemplo <span className="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-card-icon"><span class="material-symbols-outlined">lock</span></div>
    <div className="feature-card-content">
      <h3>PDR-002: Missões Não Desabilitáveis</h3>
      <p>Por que professores não podem desabilitar missões de gestores</p>
      <a href="./template" className="card-link">
        Ver Exemplo <span className="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  </div>

  <div className="feature-card">
    <div className="feature-card-icon"><span class="material-symbols-outlined">military_tech</span></div>
    <div className="feature-card-content">
      <h3>PDR-003: Medalhas com Nota Mínima</h3>
      <p>Por que medalhas exigem 70% de acerto mínimo</p>
      <a href="./template" className="card-link">
        Ver Exemplo <span className="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  </div>
</div>

---

## <span class="material-symbols-outlined">assignment</span> Lista de PDRs por Status

### <span class="material-symbols-outlined">check_circle</span> Aceitos (Ativos)

| ID | Título | Data | Autor | Impacto |
|----|--------|------|-------|---------|
| [PDR-001](./template) | Ranking por Turma | 2025-02-10 | Time Produto | Alto |
| [PDR-002](./template) | Missões Não Desabilitáveis | 2025-02-12 | Time Produto | Alto |
| [PDR-003](./template) | Medalhas com Nota Mínima 70% | 2025-02-15 | Time Produto | Médio |

---

### <span class="material-symbols-outlined">construction</span> Em Discussão

_Nenhum PDR em discussão no momento_

---

### <span class="material-symbols-outlined">cancel</span> Rejeitados

_Adicione PDRs rejeitados aqui para referência histórica_

---

### <span class="material-symbols-outlined">sync</span> Substituídos

_Adicione PDRs que foram substituídos por decisões posteriores_

---

## <span class="material-symbols-outlined">bar_chart</span> PDRs por Categoria

### <span class="material-symbols-outlined">sports_esports</span> Gamificação
- [PDR-001: Ranking por Turma](./template)
- [PDR-003: Medalhas com Nota Mínima](./template)

### <span class="material-symbols-outlined">group</span> Controle de Acesso
- [PDR-002: Missões Não Desabilitáveis](./template)

### <span class="material-symbols-outlined">library_books</span> Conteúdo Pedagógico
_Adicione PDRs relacionados a conteúdo BNCC aqui_

### <span class="material-symbols-outlined">bar_chart</span> Analytics e Métricas
_Adicione PDRs relacionados a métricas e dashboards aqui_

### <span class="material-symbols-outlined">handyman</span> Arquitetura de Produto
_Adicione PDRs sobre estrutura do produto aqui_

---

## <span class="material-symbols-outlined">link</span> Recursos Relacionados

- [**Regras de Negócio**](../business-rules/) - Regras implementadas (PDRs explicam o "por quê")
- [**PRDs**](../prds/) - Especificações de features (PDRs referenciados em PRDs)
- [**Product Vision & Strategy**](../product-strategy/vision.md) - Direção estratégica (PDRs devem alinhar)

---

## <span class="material-symbols-outlined">school</span> Boas Práticas

:::tip Dicas para Escrever PDRs Eficazes

### 1. Use Dados, Não Opiniões
<span class="material-symbols-outlined">cancel</span> "Achamos melhor..."  
<span class="material-symbols-outlined">check_circle</span> "73% dos alunos relataram desmotivação com ranking nacional"

### 2. Liste Pelo Menos 3 Alternativas
Mostre que considerou múltiplas opções, não apenas 2 (sua favorita vs strawman).

### 3. Seja Honesto sobre Trade-offs
Toda decisão tem trade-offs. Documente o que estamos sacrificando.

### 4. Defina Condições de Reversão
"Se X acontecer, vamos reverter em Y prazo". Isso reduz medo de decidir.

### 5. Conecte à Estratégia
Toda decisão deve alinhar com [Product Vision](../product-strategy/vision.md).

### 6. Atualize se Contexto Mudar
Se novos dados surgem, crie PDR-XXX-v2 ou marque original como "Substituído".

:::

---

## <span class="material-symbols-outlined">bar_chart</span> Fluxo de Decisão

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#7C3AED','primaryTextColor':'#fff','primaryBorderColor':'#6D28D9','lineColor':'#A78BFA','secondaryColor':'#10B981','tertiaryColor':'#F59E0B'}}}%%
flowchart TD
    A[Problema ou decisão<br/>precisa ser tomada] --> B{Impacto é<br/>significativo?}
    B -->|Baixo| C[Decidir sem PDR]
    B -->|Alto| D[PM cria draft PDR]
    D --> E[Lista 3+ alternativas]
    E --> F[Coleta dados/evidências]
    F --> G[Cria matriz de decisão]
    G --> H[Circule com stakeholders]
    H --> I{Consenso?}
    I -->|Não| J[Coleta mais dados<br/>ou ajusta alternativas]
    J --> H
    I -->|Sim| K[Marca como Aceito]
    K --> L[Implementa decisão]
    L --> M[Mede consequências]
    M --> N{Hipótese<br/>confirmada?}
    N -->|Sim| O[<span class="material-symbols-outlined">check_circle</span> PDR permanece ativo]
    N -->|Não| P[Cria PDR-XXX-v2<br/>com novos dados]
    P --> D
    
    style O fill:#10B981,color:#fff
    style D fill:#7C3AED,color:#fff
    style P fill:#F59E0B,color:#fff
```

---

## <span class="material-symbols-outlined">trending_up</span> Métricas de Qualidade dos PDRs

| Métrica | Meta | Atual |
|---------|------|-------|
| **PDRs criados por quarter** | 5-10 | - |
| **Decisões revertidas** | < 10% | - |
| **Stakeholders consultados** | 100% | - |
| **Decisões com dados quantitativos** | > 80% | - |

---

## <span class="material-symbols-outlined">explore</span> Quando NÃO Criar PDR

**Não perca tempo documentando:**
- <span class="material-symbols-outlined">close</span> Decisões triviais (cor de botão, wording)
- <span class="material-symbols-outlined">close</span> Decisões facilmente reversíveis (< 1 dia de work)
- <span class="material-symbols-outlined">close</span> Decisões puramente técnicas (escolha de biblioteca)
- <span class="material-symbols-outlined">close</span> Experimentos A/B (documente resultado, não a decisão de experimentar)

**Mas SEMPRE documente:**
- <span class="material-symbols-outlined">check</span> Mudanças em regras de negócio core
- <span class="material-symbols-outlined">check</span> Decisões que impactam múltiplas squads
- <span class="material-symbols-outlined">check</span> Trade-offs entre UX e performance
- <span class="material-symbols-outlined">check</span> "Vamos NÃO fazer X" (anti-features)

---

## <span class="material-symbols-outlined">search</span> Busca de PDRs

Use as tags abaixo para filtrar PDRs:

**Por Impacto:**
- [#alto-impacto](#) - Decisões críticas para o produto
- [#médio-impacto](#) - Decisões importantes mas não críticas
- [#baixo-impacto](#) - Decisões documentadas para histórico

**Por Área:**
- [#gamification](#) - Ranking, medalhas, pontos
- [#access-control](#) - Permissões, perfis, hierarquia
- [#content](#) - BNCC, missões, questões
- [#analytics](#) - Dashboards, métricas, relatórios
- [#ux](#) - Experiência do usuário

**Por Status:**
- [#aceito](#) - Decisões ativas
- [#em-discussao](#) - Ainda sendo debatidas
- [#rejeitado](#) - Não implementadas
- [#substituido](#) - Substituídas por decisão posterior

---

## <span class="material-symbols-outlined">phone</span> Contato

**Dúvidas sobre PDRs?**  
Entre em contato com o Time de Produto.

**Quer propor revisão de uma decisão?**  
Traga novos dados e proponha PDR-XXX-v2.

---

**Última atualização:** Fevereiro 2026  
**Mantido por:** Time de Produto
