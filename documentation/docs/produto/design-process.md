---
sidebar_position: 2
title: Processo de Design de Produto
description: Como aplicamos o Duplo Diamante com prototipação em código
---

# Processo de Design de Produto

## Visão Geral

Este documento descreve nosso **processo de design de produto** adaptado ao contexto da Educacross, onde utilizamos o conceito do **Duplo Diamante** (Double Diamond) integrado com prototipação em código para facilitar a transferência para desenvolvimento e manter a consistência entre Figma e Design System.

---

## O Duplo Diamante Adaptado

O Duplo Diamante é um framework de design que divide o processo em 4 fases:

```mermaid
graph LR
    A[Descobrir] --> B[Definir]
    B --> C[Desenvolver]
    C --> D[Entregar]

    style A fill:#7367F0,stroke:#5E50EE,color:#fff
    style B fill:#28C76F,stroke:#24B263,color:#fff
    style C fill:#FF9F43,stroke:#FF922B,color:#fff
    style D fill:#EA5455,stroke:#E42728,color:#fff
```

### Nossa Adaptação

No contexto da Educacross, **prototipamos com código** desde o início, permitindo:
- ✅ Transferência mais eficiente para desenvolvimento
- ✅ Validação técnica precoce
- ✅ Testes interativos com usuários reais
- ✅ Integração contínua com o Design System

---

## Fluxo Completo do Processo

### Visão Macro

```mermaid
graph TB
    subgraph "Diamante 1: Problema"
        A1[🔍 Descobrir] --> A2[🎯 Definir]
    end

    subgraph "Diamante 2: Solução"
        A2 --> B1[💡 Desenvolver]
        B1 --> B2[🚀 Entregar]
    end

    subgraph "Ciclo de Prototipação"
        B1 --> C1[📝 Documentar Jornada TAL-QUAL]
        C1 --> C2[💻 Prototipar COMO-SERÁ em Código]
        C2 --> C3[🔄 Revisão & Iteração]
        C3 --> C4{Aprovado?}
        C4 -->|Não| C2
        C4 -->|Sim| C5[📐 Atualizar Figma]
        C5 --> C6[🎨 Atualizar Design System]
        C6 --> B2
    end

    style A1 fill:#7367F0,color:#fff
    style A2 fill:#28C76F,color:#fff
    style B1 fill:#FF9F43,color:#fff
    style B2 fill:#EA5455,color:#fff
    style C2 fill:#00CFE8,color:#fff
    style C5 fill:#FF6B9D,color:#fff
    style C6 fill:#9E95F5,color:#fff
```

---

## Fase 1: 🔍 Descobrir (Divergir)

**Objetivo**: Entender o problema, necessidades dos usuários e contexto.

### Atividades

| Atividade | Ferramentas | Entregáveis |
|-----------|-------------|-------------|
| Pesquisa com usuários | Entrevistas, observação | Insights e pontos de dor |
| Análise de dados | Analytics, heatmaps | Métricas de comportamento |
| Benchmarking | Análise competitiva | Referências e boas práticas |
| Mapeamento de jornadas | Miro, Figjam | Jornadas TAL-QUAL documentadas |

### Documentação

Todas as descobertas são documentadas em:
- **Docusaurus**: [`docs/discovery/`](/docs/discovery/)
- **Personas**: [`docs/personas/`](/docs/personas/)

### Exemplo: Descoberta Professor

```markdown
## Pontos de Dor Identificados

1. **Dificuldade em visualizar progresso dos alunos**
   - Falta de dashboards consolidados
   - Dados espalhados em múltiplas telas

2. **Tempo excessivo para configurar missões**
   - Assistente atual tem 5+ passos
   - Muitos campos obrigatórios
```

---

## Fase 2: 🎯 Definir (Convergir)

**Objetivo**: Sintetizar descobertas e definir o problema a ser resolvido.

### Atividades

| Atividade | Ferramentas | Entregáveis |
|-----------|-------------|-------------|
| Priorização | MoSCoW, RICE score | Backlog priorizado |
| Definição de hipóteses | Como Podemos (HMW) | Hipóteses validáveis |
| Criação de Histórias de Usuário | Jira, Linear | Histórias detalhadas |
| Critérios de sucesso | OKRs, KPIs | Métricas de validação |

### Documentação

A definição é documentada em:
- **PRDs**: [`docs/prds/`](/docs/prds/)
- **Jornadas**: [`docs/journeys/`](/docs/journeys/)

### Exemplo: Definição do Problema

```markdown
## Problema Prioritário

**Como podemos** reduzir o tempo de configuração de missões customizadas
de 15min para 5min, mantendo a flexibilidade?

### Hipótese

Se simplificarmos o assistente de 5 para 3 passos e pré-popularmos
campos com sugestões inteligentes, então:
- ↓ 60% tempo de configuração
- ↑ 40% missões criadas por professor
```

---

## Fase 3: 💡 Desenvolver (Divergir)

**Objetivo**: Explorar múltiplas soluções através de prototipação em código.

### Nossa Abordagem: Prototipação Código-Primeiro

#### Por que prototipar com código?

1. **Transferência eficiente**: Código do protótipo serve de base para produção
2. **Validação técnica**: Detecta limitações técnicas cedo
3. **Testes reais**: Usuários interagem com protótipo funcional
4. **Design System integrado**: Usa componentes reais desde o início

#### Fluxo de Prototipação

```mermaid
graph TD
    A[📋 Documentar Jornada TAL-QUAL] --> B[🌿 Criar Branch Base]
    B --> C[📸 Criar Branch Funcionalidade COMO-SERÁ]
    C --> D[💻 Desenvolver Protótipo em Vue]
    D --> E[🚀 Publicação Prévia Automática]
    E --> F[👥 Revisão com Partes Interessadas]
    F --> G{Aprovado?}
    G -->|Não| H[📝 Ajustar baseado em retorno]
    H --> D
    G -->|Sim| I[✅ Protótipo Validado]
    I --> J[Fase 4: Entregar]

    style A fill:#7367F0,color:#fff
    style D fill:#00CFE8,color:#fff
    style E fill:#28C76F,color:#fff
    style F fill:#FF9F43,color:#fff
    style I fill:#28C76F,color:#fff
```

### Estrutura de Ramificações Git

Seguimos o fluxo documentado em [`PROTOTYPES-WORKFLOW.md`](/PROTOTYPES-WORKFLOW.md):

```bash
prototypes/
├── as-is                          # Base que replica produção
│   ├── Tag: as-is-v1.0           # Versão inicial
│   ├── Tag: as-is-v1.1           # Após Sistema de Educação V2
│   └── Tag: as-is-v1.2           # Após Missões V3
│
└── feature/                       # Protótipos COMO-SERÁ
    ├── education-system-v2        # Assistente de livros
    ├── missions-v3                # Linha do tempo de missões
    └── reports-v2                 # Painéis interativos
```

### Exemplo Prático

#### 1. Criar Base TAL-QUAL

```bash
# Documentar estado atual em produção
cd Ambiente_de_Prototipacao_V5/

git checkout -b prototypes/as-is
# Desenvolver réplica do estado atual
npm run dev

git add .
git commit -m "proto: criar base tal-qual v1.0"
git tag -a as-is-v1.0 -m "Base TAL-QUAL v1.0"
git push origin prototypes/as-is --tags
```

#### 2. Prototipar COMO-SERÁ

```bash
# Partir da base
git checkout prototypes/as-is
git checkout -b prototypes/feature/missions-v3

# Desenvolver melhorias
npm run dev
# Implementar linha do tempo de missões, filtros avançados, etc.

# Commits incrementais
git add src/views/missions/
git commit -m "proto: adicionar visão de linha do tempo para missões"
git push origin prototypes/feature/missions-v3
```

#### 3. Publicação Prévia Automática

GitHub Actions cria URL de prévia:
```
https://missions-v3.prototypes.educacross.dev
```

#### 4. Coleta de Retorno

```markdown
## Retorno Rodada 1 - Missões V3

### Positivo ✅
- Linha do tempo visual muito mais clara
- Filtros por data funcionando bem

### Melhorar ⚠️
- Adicionar filtro por matéria
- Carregamento lento com muitas missões (>100)

### Próximos Passos
- [ ] Implementar filtro por matéria
- [ ] Adicionar paginação/virtualização
```

---

## Fase 4: 🚀 Entregar (Convergir)

**Objetivo**: Implementar solução em produção e atualizar documentação de design.

### Fluxo de Entrega

```mermaid
graph TD
    A[✅ Protótipo Aprovado] --> B[🔄 Migrar Código para Produção]
    B --> C[🧪 Testes em Homologação]
    C --> D[📦 Publicação em Produção]
    D --> E[📐 Atualizar Figma]
    E --> F[🎨 Atualizar Design System]
    F --> G[🔄 Sincronizar Base TAL-QUAL]
    G --> H[🏷️ Marcar Nova Versão]
    H --> I[🗑️ Arquivar Ramificação de Funcionalidade]

    style A fill:#28C76F,color:#fff
    style B fill:#00CFE8,color:#fff
    style D fill:#EA5455,color:#fff
    style E fill:#FF6B9D,color:#fff
    style F fill:#9E95F5,color:#fff
    style G fill:#7367F0,color:#fff
```

### 1. Migração para Produção

```bash
# Mudar para repositório de produção
cd educacross-frontoffice/

git checkout develop
git checkout -b feature/EC-1234-missions-v3

# Copiar e adaptar código do protótipo
# - Ajustar importações
# - Integrar APIs reais
# - Adicionar validações
# - Escrever testes

git add .
git commit -m "feat(missions): implementar visão de linha do tempo com filtros

JIRA: EC-1234
Protótipo: prototypes/feature/missions-v3

Mudanças:
- Adicionar componente de linha do tempo
- Adicionar filtros de data e matéria
- Adicionar paginação para 100+ missões
- Adicionar testes unitários e E2E

Fecha EC-1234"

git push origin feature/EC-1234-missions-v3
# Abrir PR → develop → homolog → master
```

### 2. Atualizar Figma

Após implementação em produção, **atualizamos o Figma** com o design final:

#### Processo

1. **Capturar Capturas de Tela** da implementação real
   ```bash
   # Usar Playwright para capturas de tela consistentes
   npm run test:e2e:screenshots
   ```

2. **Atualizar Quadros no Figma**
   - Projeto: [Educacross Design System](https://figma.com/educacross-ds)
   - Criar nova página: `Missões V3 - Implementação`
   - Importar capturas de tela de referência
   - Redesenhar componentes baseados no código real

3. **Documentar Componentes**
   ```markdown
   ## Card de Missão em Linha do Tempo

   ### Propriedades
   - `mission`: Object (dados da missão)
   - `onEdit`: Function (callback edição)
   - `onDelete`: Function (callback exclusão)

   ### Variantes
   - Padrão
   - Hover
   - Selecionado
   - Desabilitado

   ### Tokens Utilizados
   - Cor: `--primary-500`
   - Espaçamento: `--space-4`
   - Raio da borda: `--radius-lg`
   ```

#### Integração Figma → Código

Usamos o **MCP Figma** para sincronização:

```bash
# Extrair tokens do Figma para código
npm run figma:sync-tokens

# Gera: src/design-system/tokens/colors.ts
# Gera: src/design-system/tokens/spacing.ts
# Gera: src/design-system/tokens/typography.ts
```

Ver: [`MCP_FIGMA_QUICKSTART.md`](/MCP_FIGMA_QUICKSTART.md)

### 3. Atualizar Design System

Após Figma atualizado, **sincronizamos o Design System** (Docusaurus):

```bash
cd Ambiente_de_Prototipacao_V5/documentation/

# 1. Adicionar capturas de tela
cp ../educacross-frontoffice/screenshots/missions-v3-*.png \
   static/img/screenshots/missions/

# 2. Documentar componente
# Criar: docs/design-system/components/timeline-mission-card.md
```

#### Exemplo: Documentação de Componente

```markdown
---
title: Card de Missão em Linha do Tempo
sidebar_position: 12
---

## Visão Geral

Componente de card de missão para visualização em linha do tempo.

## Prévia

![Card de Missão em Linha do Tempo](/img/screenshots/missions/timeline-card.png)

## Uso

\`\`\`vue
<template>
  <TimelineMissionCard
    :mission="mission"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>
\`\`\`

## Propriedades

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|------|------|----------|---------|-------------|
| `mission` | `Mission` | ✅ | - | Dados da missão |
| `showActions` | `boolean` | ❌ | `true` | Exibir botões de ação |

## Tokens de Design

\`\`\`css
.timeline-mission-card {
  --card-bg: var(--color-surface-primary);
  --card-border: var(--color-border-default);
  --card-shadow: var(--shadow-md);
  --card-padding: var(--space-4);
  --card-radius: var(--radius-lg);
}
\`\`\`

## Figma

[Ver no Figma →](https://figma.com/file/.../timeline-mission-card)
```

### 4. Sincronizar Base TAL-QUAL

Após publicação em produção, **atualizamos a base** de protótipos:

```bash
cd Ambiente_de_Prototipacao_V5/

git checkout prototypes/as-is
git pull origin prototypes/as-is

# Copiar código final de produção
cp -r ../educacross-frontoffice/src/views/missions/ \
      src/views/missions/

git add .
git commit -m "proto: sincronizar tal-qual com produção v1.2

Migrado da produção:
- Missões V3 com visão de linha do tempo
- Componente: TimelineMissionCard.vue
- Integrado: 2026-02-20

Publicação em produção: master@abc123
Ramificação de funcionalidade: feature/EC-1234-missions-v3"

# Atualizar versão
npm version minor  # 1.1.0 → 1.2.0

# Marcar nova versão
git tag -a as-is-v1.2 -m "Base TAL-QUAL v1.2 - Missões V3"
git push origin prototypes/as-is --tags
```

### 5. Arquivar Ramificação de Funcionalidade

```bash
# Deletar ramificação de protótipo (já migrada)
git branch -d prototypes/feature/missions-v3
git push origin --delete prototypes/feature/missions-v3
```

---

## Ferramentas do Processo

### Pilha de Design

| Ferramenta | Uso | Link |
|------------|-----|------|
| **Figma** | Documentação visual pós-implementação | [Educacross DS](https://figma.com/educacross-ds) |
| **Docusaurus** | Design System + Documentação técnica | [`/documentation`](../intro) |
| **Vue 3 + Vite** | Prototipação em código | [`Ambiente_de_Prototipacao_V5`](../../README.md) |
| **Playwright** | Capturas de tela e validação visual | [`/validation`](../../validation) |
| **MCP Figma** | Sincronização Figma ↔ Código | [`MCP_FIGMA_QUICKSTART.md`](../../MCP_FIGMA_QUICKSTART.md) |

### Pilha de Colaboração

| Ferramenta | Uso |
|------------|-----|
| **GitHub** | Versionamento + Prévia de publicação |
| **Jira** | Gestão de backlog e histórias de usuário |
| **Miro** | Workshops e mapeamento de jornadas |
| **Loom** | Vídeos de demonstração de protótipos |

---

## Princípios do Processo

### 1. O Código é a Fonte da Verdade

O código implementado é a fonte da verdade. Figma e Design System são **documentados** após implementação, não antes.

**Por quê?**
- Evita divergências entre design e código
- Protótipos validam viabilidade técnica cedo
- Transferência mais eficiente

### 2. Iteração Contínua

Não esperamos "design perfeito" antes de prototipar. Iteramos rapidamente com código.

**Ciclo típico**: 3-5 dias
- Dia 1-2: Protótipo inicial
- Dia 3: Revisão + Retorno
- Dia 4: Ajustes
- Dia 5: Aprovação

### 3. Documentação Incremental

Documentamos **durante** o processo, não apenas no final.

- Jornadas TAL-QUAL: Durante descoberta
- Protótipos COMO-SERÁ: Durante desenvolvimento
- Componentes DS: Após implementação
- Figma: Após publicação em produção

### 4. Design System Vivo

O Design System evolui **com** os protótipos, não antes.

```mermaid
graph LR
    A[Protótipo Novo] --> B[Componente Criado]
    B --> C[Revisão]
    C --> D{Reutilizável?}
    D -->|Sim| E[Adicionar ao DS]
    D -->|Não| F[Manter local]
    E --> G[Documentar no Docusaurus]
    G --> H[Sincronizar Figma]

    style A fill:#00CFE8,color:#fff
    style E fill:#28C76F,color:#fff
    style G fill:#9E95F5,color:#fff
    style H fill:#FF6B9D,color:#fff
```

---

## Lista de Verificação do Processo

Use esta lista para garantir que todas as etapas foram seguidas:

### Fase 1: Descobrir

- [ ] Pesquisa com usuários realizada
- [ ] Dados de analytics coletados
- [ ] Jornadas TAL-QUAL mapeadas
- [ ] Personas atualizadas
- [ ] Descoberta documentada em `/docs/discovery/`

### Fase 2: Definir

- [ ] Problema prioritário definido
- [ ] Hipóteses formuladas (Como Podemos)
- [ ] Histórias de usuário criadas no Jira
- [ ] Critérios de sucesso definidos (KPIs)
- [ ] PRD criado em `/docs/prds/`

### Fase 3: Desenvolver (Prototipar)

- [ ] Base TAL-QUAL atualizada (`prototypes/as-is`)
- [ ] Ramificação de funcionalidade criada (`prototypes/feature/nome`)
- [ ] Protótipo desenvolvido em Vue 3
- [ ] Prévia de publicação gerada automaticamente
- [ ] Revisão com partes interessadas realizada
- [ ] Retorno documentado e iterado
- [ ] Protótipo aprovado

### Fase 4: Entregar

#### Código
- [ ] Código migrado para `educacross-frontoffice`
- [ ] Testes unitários escritos
- [ ] Testes E2E escritos
- [ ] PR aberta e revisada
- [ ] Publicação em homologação validada
- [ ] Publicação em produção realizada

#### Design
- [ ] Capturas de tela capturadas do código real
- [ ] Figma atualizado com design implementado
- [ ] Componentes documentados no Figma
- [ ] Tokens sincronizados (Figma → Código)

#### Design System
- [ ] Componente documentado em `/docs/design-system/`
- [ ] Capturas de tela adicionadas em `/static/img/screenshots/`
- [ ] Propriedades e variantes documentadas
- [ ] Link para Figma adicionado

#### Base
- [ ] Base TAL-QUAL atualizada com código de produção
- [ ] Nova marcação criada (ex: `as-is-v1.2`)
- [ ] Ramificação de funcionalidade arquivada/deletada
- [ ] CHANGELOG atualizado

---

## Métricas de Sucesso do Processo

### Tempo de Entrega

Tempo médio da descoberta até produção:

| Complexidade | Meta | Média Atual |
|--------------|--------|-------------|
| Pequena (&lt; 5 dias dev) | 2 semanas | 10 dias ✅ |
| Média (5-10 dias dev) | 4 semanas | 3 semanas ✅ |
| Grande (&gt; 10 dias dev) | 8 semanas | 6 semanas ✅ |

### Qualidade

| Métrica | Meta | Média Atual |
|---------|--------|-------------|
| Bugs encontrados pós-publicação | &lt; 3 | 2 ✅ |
| Divergência design vs código | &lt; 5% | 3% ✅ |
| Retrabalho após retorno | &lt; 20% | 15% ✅ |

### Eficiência

| Métrica | Meta | Média Atual |
|---------|--------|-------------|
| Tempo de transferência (design → dev) | &lt; 1 dia | 0.5 dia ✅ |
| Reuso de componentes DS | &gt; 70% | 75% ✅ |
| Protótipos que vão para produção | &gt; 80% | 85% ✅ |

---

## Referências

### Documentação Interna
- [Fluxo de Protótipos](/PROTOTYPES-WORKFLOW.md)
- [Design System](../design-system/integration)
- [Guia de Jornadas](../journeys/)
- [Modelo de PRD](../prds/template)

### Metodologias
- [Double Diamond (Design Council)](https://www.designcouncil.org.uk/our-resources/the-double-diamond/)
- [Jobs to Be Done (JTBD)](https://jtbd.info/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

### Ferramentas
- [Figma Best Practices](https://www.figma.com/best-practices/)
- [Vue 3 Style Guide](https://vuejs.org/style-guide/)
- [Docusaurus Docs](https://docusaurus.io/)

---

## Perguntas Frequentes

### Por que prototipar com código e não apenas com Figma?

**Resposta**: Código permite validar viabilidade técnica cedo, testar com usuários reais, e facilita a transferência. Figma é usado para **documentar** o design final implementado, não para especificar.

### Como garantir que Figma não diverge do código?

**Resposta**: Atualizamos Figma **após** publicação em produção, usando capturas de tela do código real como referência. Também sincronizamos tokens via MCP Figma.

### E se parte interessada pedir mudanças no meio do desenvolvimento?

**Resposta**: É esperado! Por isso iteramos rapidamente com prévias de publicação. Cada push gera nova URL para validação.

### Quanto tempo leva um ciclo completo?

**Resposta**: Depende da complexidade:
- Funcionalidade pequena: 2 semanas (descoberta → produção)
- Funcionalidade média: 4 semanas
- Funcionalidade grande: 6-8 semanas

### Como decidimos se um componente vai para o Design System?

**Resposta**: Seguimos regra dos "3 usos":
1. Usado em 1 lugar → componente local
2. Usado em 2 lugares → avaliar reusabilidade
3. Usado em 3+ lugares → promover para Design System

---

**Última atualização**: Fevereiro 2026
**Versão**: 1.0
**Mantido por**: Time de Produto Educacross
