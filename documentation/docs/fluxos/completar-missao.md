---
sidebar_position: 3
title: Completar Missão
description: Fluxo do aluno ao completar uma missão
---
import { IconSparkle } from '@site/src/components/MaterialIcon';


import { PriorityHigh, StatusPlanned } from '@site/src/components/StatusIcons';

# Fluxo: Completar Missão

## Visão Geral

| Atributo | Valor |
|----------|-------|
| **ID** | FLX-003 |
| **Persona** | [Aluno](../personas/aluno) |
| **Frequência** | Diária |
| **Prioridade** | <PriorityHigh /> |
| **Status** | <StatusPlanned /> |

---

## Contexto

### Gatilho
Aluno deseja realizar uma missão disponibilizada pelo professor.

### Pré-condições
- Aluno logado
- Missão habilitada pelo professor
- Dispositivo compatível (tablet, celular, computador)

### Resultado Esperado
- Aluno completa atividades da missão
- Progresso é registrado
- Recompensas são entregues

---

## Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> TelaInicial: Aluno abre app
    
    TelaInicial --> ListaMissoes: Vê missões disponíveis
    ListaMissoes --> Missao: Seleciona missão
    
    Missao --> Atividade: Inicia primeira atividade
    Atividade --> ProximaAtividade: Completa atividade
    ProximaAtividade --> Atividade: Ainda há atividades
    ProximaAtividade --> Conclusao: Todas completas
    
    Conclusao --> Recompensa: Recebe feedback
    Recompensa --> [*]: Volta para lista
```

---

## Elementos de Gamificação

| Momento | Elemento | Feedback |
|---------|----------|----------|
| Início | Animação de entrada | "Vamos lá!" |
| Acerto | Som + visual | <IconSparkle /> +10 pontos |
| Erro | Feedback gentil | "Tente de novo!" |
| Conclusão | Celebração | 🎉 Confetti + medalha |

---

## Próximos Passos

- Capturar screenshots do fluxo atual
- Documentar componentes de gamificação
- Mapear pontos de melhoria de UX

---

## Referências

- [Persona: Aluno](../personas/aluno)
- [Jornadas do Estudante](../journeys/student/)

