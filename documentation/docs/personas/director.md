---
sidebar_position: 3
title: Diretor
description: Tipo de usuário gerenciado pelo Administrador com visão estratégica
---
import { IconDirector } from '@site/src/components/MaterialIcon';

# Diretor Escolar

:::caution Nota sobre implementação
O Diretor **não possui uma role de navegação independente** no sistema atual. Ele é um **tipo de usuário cadastrado pelo Administrador** (menu Cadastros → Diretores) e acessa a plataforma com permissões do escopo `Admin`, restritas conforme configuração.
:::

---

## Quem é

| | |
|---|---|
| **Perfil** | Diretor(a) Escolar / Mantenedor |
| **Onde atua** | Diretoria da escola |
| **Como é cadastrado** | Admin → Cadastros → Diretores |
| **Permissão no sistema** | `ManageManagers` (quem cadastra) |

---

## Contexto de uso

O Diretor tem visão macro da escola. Por estar sob o guarda-chuva do Admin, acessa os relatórios consolidados — porém o escopo exato de acesso depende da configuração de cada instalação.

---

## Jornadas relacionadas

- [Relatório de Acessos](../journeys/director/student-access-report)

