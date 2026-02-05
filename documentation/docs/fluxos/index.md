---
sidebar_position: 3
title: Fluxos Críticos
description: Documentação detalhada dos fluxos mais importantes do Educacross
---

# Fluxos Críticos

Esta seção documenta os fluxos de usuário mais importantes da plataforma, com foco em:

- **Contexto** — Quando e por que o fluxo acontece
- **Atores** — Quem participa do fluxo
- **Estados** — Telas e transições
- **Regras de negócio** — Validações e condições
- **Evidências visuais** — Screenshots e protótipos

---

## Lista de Fluxos

| ID | Fluxo | Persona | Prioridade | Status |
|----|-------|---------|------------|--------|
| FLX-001 | [Aceitar/Recusar Perfil](./aceitar-recusar-perfil) | Gestor | 🔴 Alta | ✅ Documentado |
| FLX-002 | [Habilitar Missões](./habilitar-missoes) | Professor | 🔴 Alta | 🚧 Em progresso |
| FLX-003 | [Completar Missão](./completar-missao) | Aluno | 🔴 Alta | 📋 Planejado |
| FLX-004 | [Gerar Relatório](./gerar-relatorio) | Gestor/Professor | 🟡 Média | 📋 Planejado |

---

## Matriz Fluxo × Persona

```mermaid
quadrantChart
    title Fluxos por Frequência e Complexidade
    x-axis Baixa Frequência --> Alta Frequência
    y-axis Baixa Complexidade --> Alta Complexidade
    quadrant-1 Otimizar UX
    quadrant-2 Prioridade Máxima
    quadrant-3 Manter Simples
    quadrant-4 Automatizar
    "Aceitar Perfil": [0.7, 0.3]
    "Habilitar Missões": [0.9, 0.5]
    "Completar Missão": [0.95, 0.2]
    "Gerar Relatório": [0.2, 0.6]
```

---

## Estrutura de Documentação

Cada fluxo segue este template:

### 1. Contexto
- Gatilho: O que inicia o fluxo
- Pré-condições: O que precisa estar pronto
- Resultado esperado: O que muda após o fluxo

### 2. Diagrama de Estados
```mermaid
stateDiagram-v2
    [*] --> Estado1
    Estado1 --> Estado2: Ação
    Estado2 --> [*]: Conclusão
```

### 3. Telas e Componentes
- Screenshots AS-IS (estado atual)
- Componentes utilizados (links para Storybook)
- Mockups TO-BE (melhorias propostas)

### 4. Regras de Negócio
- Validações
- Mensagens de erro
- Casos de borda

### 5. API
- Endpoints envolvidos
- Payloads de exemplo
- Códigos de resposta

---

## Próximos Passos

- Documentar [Fluxo de Habilitar Missões](./habilitar-missoes)
- Capturar screenshots reais do ambiente de produção
- Validar fluxos com usuários reais

