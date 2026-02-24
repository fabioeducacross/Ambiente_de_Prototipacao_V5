---
sidebar_position: 2
title: Coordenador
description: Tipo de usuário gerenciado pelo Administrador com foco pedagógico
---
import { IconCoordinator } from '@site/src/components/MaterialIcon';

# <IconCoordinator size={28} /> Coordenador Pedagógico

:::caution Nota sobre implementação
O Coordenador **não possui uma role de navegação independente** no sistema atual. Ele é um **tipo de usuário cadastrado pelo Administrador** (menu Cadastros → Coordenadores) e acessa a plataforma com permissões do escopo `Admin`, restritas conforme configuração.
:::

---

## Quem é

| | |
|---|---|
| **Perfil** | Coordenador Pedagógico |
| **Onde atua** | Coordenação da escola |
| **Como é cadastrado** | Admin → Cadastros → Coordenadores |
| **Permissão no sistema** | `ManageCoordinators` (quem cadastra) |

---

## Contexto de uso

O Coordenador acompanha a aplicação pedagógica da plataforma. Por estar sob o guarda-chuva do Admin, tem acesso a relatórios e dados de turmas — porém o escopo exato depende da configuração de cada instalação.

---

## Jornadas relacionadas

- [Relatório de Missões](../journeys/coordinator/mission-reports)
- [Relatório de Evidências](../journeys/coordinator/evidence-report)
- [Relatório de Habilidades](../journeys/coordinator/skill-report)

