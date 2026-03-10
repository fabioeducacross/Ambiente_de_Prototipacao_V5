---
sidebar_position: 1
title: Administrador
description: Perfil responsável pela gestão de acessos e configurações da escola
---
import { IconAdmin } from '@site/src/components/MaterialIcon';

# Administrador

O Administrador gerencia a escola no Educacross: cadastros, turmas, relatórios consolidados, módulos de avaliação e eventos. É o perfil mais completo dentro de uma unidade escolar.

> Role no sistema: `Admin`

---

## Quem é

| | |
|---|---|
| **Perfil** | Secretário escolar / Coordenador TI |
| **Onde atua** | Secretaria / Coordenação |
| **Frequência de uso** | Diária (início do ano) / Semanal (manutenção) |

---

## Menu de navegação (real)

| Item | Sub-itens | Permissão |
|------|-----------|----------|
| **Painel Inicial** | — | `Admin` |
| **Relatórios** | Visão Geral, Volume de Acessos, Acessos Mensais Alunos, Acessos Professores, Evidências Escolas, Evidências Alunos, Habilidades, Ranking de Conquistas | `Reports` / por permissão |
| **Missões da Escola** | Missões, Missões Plus | `SchoolMissions` |
| **Sistema de Ensino** | — | `EducationSystems` |
| **Cadastros** | Alunos, Turmas, Grupos, Professores, Coordenadores, Diretores | por permissão |
| **Gerenciador** | — | `ModuleManagement` |
| **Eventos** | — | `Events` |
| **Avaliações** | Complexidade Narrativa, Fases da Escrita, Fluência Leitora, Avaliação Digital, Simulados | por módulo |
| **Expedição Leitura** | — | `ReadingExpedition` |
| **Ajudas e Materiais** | — | `SupportMaterials` |

:::info Coordenadores e Diretores
Coordenadores e Diretores são **tipos de usuário cadastrados pelo Admin** (via menu Cadastros). Eles não possuem navegação própria independente — acessam o sistema com as permissões do papel `Admin`, porém com escopos restritos conforme configuração.
:::

---

## Jornadas relacionadas

- [Gestão de Usuários](../journeys/administrator/user-management)

