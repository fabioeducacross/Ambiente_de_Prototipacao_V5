---
title: Matriz de Sincronizacao de Jornadas
description: Mapeamento entre o catalogo da Home do FrontOffice, a wiki e o catalogo de prototipos.
---

# Matriz de Sincronizacao de Jornadas

## Objetivo

Registrar qual documento e qual rota sao a referencia de cada card exibido na Home do FrontOffice, evitando colisao entre IDs canonicos da wiki e IDs provisórios de prototipo.

## Hierarquia de Fonte Unica

1. `documentation/docs/journeys/teacher/index.md` e a fonte canonica para IDs e nomes de jornadas do contexto Professor.
2. `documentation/docs/prototypes/index.md` e a fonte canonica para rotas navegaveis ja prototipadas.
3. `FrontOffice/src/data/journeys.ts` e apenas o catalogo de exibicao da Home.
4. `FrontOffice/src/data/journeys.ts` so pode reutilizar IDs canonicos `PROF-*` quando houver correspondencia 1:1 com a wiki.
5. Cards prototipicos sem jornada canonica devem usar namespace proprio, por exemplo `PROF-PROT-*`.
6. Jornadas experimentais documentadas fora do indice canonico, como `calendar.md` com `PROF-XXX`, devem usar namespace intermediario de prototipo, por exemplo `PROF-CAL-*`, ate receberem ID oficial no indice.

## Matriz Atual

| Card na Home | Rota / target | Referencia na wiki | Referencia em prototipos | Status de sincronizacao | Regra aplicada |
|---|---|---|---|---|---|
| `PROF-PROT-001` Dashboard Professor | `/professor` | Sem jornada canonica 1:1 | `Dashboard Professor (Jornada Completa)` em `documentation/docs/prototypes/index.md` | Prototipo-only | Mantido fora de `PROF-*` canonico |
| `PROF-CAL-001` Calendario de Eventos | `/teacher/calendar` | `documentation/docs/journeys/teacher/calendar.md` (`PROF-XXX`) | `Calendario` em `documentation/docs/prototypes/index.md` | Parcial | Namespace proprio ate a wiki promover um ID oficial |
| `PROF-001` Livros do Sistema Educacional | `/teacher/trilhas-az` | `documentation/docs/journeys/teacher/education-system-books.md` | `Sistema de Ensino (Trilhas A-Z)` em `documentation/docs/prototypes/index.md` | Alinhado por conceito | Reutiliza ID canonico |
| `PROF-PROT-002` Missoes da Escola | `/professor/missoes` | Sem jornada canonica 1:1 | `Lista de Missoes` em `documentation/docs/prototypes/index.md` | Prototipo-only | Mantido fora de `PROF-*` canonico |
| `PROF-002` Missoes do Livro do Sistema Educacional | `null` | `documentation/docs/journeys/teacher/education-system-missions.md` | Sem rota prototipada dedicada | Canonico planejado | Mantido como backlog da Home |
| `PROF-003` Missoes Personalizadas | `null` | `documentation/docs/journeys/teacher/custom-missions.md` | Sem rota prototipada dedicada | Canonico planejado | Mantido como backlog da Home |
| `PROF-004` Gestao de Eventos | `null` | `documentation/docs/journeys/teacher/events-management.md` | Sem rota prototipada dedicada | Canonico planejado | Mantido como backlog da Home |

## Ajuste Aplicado em 2026-03-06

### IDs removidos da Home por conflito

- `PROF-001` Criar Turma
- `PROF-002` Criar Missao
- `PROF-003` Acompanhar Progresso
- `PROF-004` Avaliar Atividades

Esses quatro cards usavam IDs oficiais da wiki para nomes e significados que nao batiam com as jornadas documentadas.

### IDs normalizados na Home

- `TRILHAS-AZ` -> `PROF-001`
- `SIDEBAR-PROTO` -> `PROF-PROT-001`
- `MISSION-ACTIVE` -> `PROF-PROT-002`
- `CAL` -> `PROF-CAL-001`

## Regra Operacional para Proximas Edicoes

Sempre que uma nova jornada for adicionada em `FrontOffice/src/data/journeys.ts`:

1. Verificar se ela ja existe em `documentation/docs/journeys/teacher/index.md`.
2. Se existir e o significado for o mesmo, reutilizar o ID canonico.
3. Se a rota existir mas a jornada ainda for um prototipo isolado, usar `PROF-PROT-*`.
4. Se a jornada estiver documentada fora do indice oficial, usar um namespace temporario especifico e registrar aqui.
5. So promover um card prototipico para `PROF-*` canonico quando wiki e rota estiverem semanticamente alinhadas.
