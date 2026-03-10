---
sidebar_position: 6
title: Gestor
description: Perfil de gestão escolar com foco em relatórios consolidados e aprovação de acessos
---
import { IconAdmin, IconCoordinator } from '@site/src/components/MaterialIcon';

# Gestor Escolar

O Gestor é o responsável pela administração pedagógica e operacional da escola na plataforma. Tem foco em **acompanhamento de desempenho consolidado**, **aprovação de perfis de acesso** e **geração de relatórios para a diretoria**.

> Role no sistema: `Admin` (com escopos restritos conforme configuração da escola)

---

## Quem é

| | |
|---|---|
| **Perfil** | Diretor(a), Coordenador(a) ou Secretário(a) com perfil de gestão |
| **Onde atua** | Direção ou Coordenação da escola |
| **Frequência de uso** | Semanal (relatórios) / Diária (aprovações pendentes) |
| **Como é cadastrado** | Administrador (TI) → Cadastros → Coordenadores / Diretores |

---

## Menu de navegação (real)

| Item | Sub-itens | Permissão |
|------|-----------|----------|
| **Painel Inicial** | — | `Admin` |
| **Relatórios** | Missões, Evidências, Habilidades, Acesso Alunos, Acesso Professores | `Reports` |
| **Aprovação de Perfis** | Perfis Pendentes, Histórico de Aprovações | `ManageProfiles` |
| **Sistema de Ensino** | — | `EducationSystems` |
| **Cadastros** | Professores, Coordenadores, Diretores | `ManageManagers` / `ManageCoordinators` |
| **Eventos** | — | `Events` (leitura) |

:::info Gestor vs Administrador
O **Administrador** (admin de TI) gerencia configurações técnicas, integrações e todos os módulos da escola. O **Gestor** é um papel pedagógico e de gestão: acompanha resultados, aprova acessos e reporta à diretoria — com acesso **somente leitura** para a maioria das funções.
:::

---

## Contexto de uso

O Gestor usa a plataforma principalmente em dois momentos:

1. **Início do dia**: Verificar perfis de acesso pendentes de aprovação para não atrasar o acesso de novos professores ou alunos.
2. **Reuniões pedagógicas / conselho de classe**: Consultar relatórios consolidados por escola, turma e disciplina para apresentar resultados à diretoria ou rede.

As dores principais (levantadas na fase de Discovery) são:
- Não saber quais perfis estão pendentes de aprovação
- Dificuldade para comparar desempenho entre turmas em um único painel
- Relatórios não formatados para apresentação à diretoria

---

## Jornadas relacionadas

- [Relatório de Missões](../journeys/coordinator/mission-reports)
- [Relatório de Evidências](../journeys/coordinator/evidence-report)
- [Relatório de Habilidades](../journeys/coordinator/skill-report)
- [Relatório de Acesso Escolar](../journeys/director/student-access-report)
- [Gestão de Usuários e Acessos](../journeys/administrator/user-management)
