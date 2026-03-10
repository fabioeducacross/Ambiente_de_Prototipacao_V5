---
sidebar_position: 5
title: Auditor
description: Perfil com acesso restrito a avaliações de fluência leitora
---
import { IconAuditor } from '@site/src/components/MaterialIcon';

# Auditor

O Auditor é um perfil especializado com acesso **exclusivo ao módulo de Fluência Leitora**. Atua na aplicação e acompanhamento de avaliações de leitura.

> Role no sistema: `Auditor`

---

## Quem é

| | |
|---|---|
| **Perfil** | Avaliador / Especialista em Fluência Leitora |
| **Onde atua** | Escola ou Secretaria de Educação |
| **Frequência de uso** | Por demanda (período de avaliações) |

---

## Menu de navegação (real)

| Item | Sub-itens | Permissão |
|------|-----------|----------|
| **Avaliações** | Fluência Leitora | `ReadingFluencyEvaluation` |

:::info
Este é o perfil com menor escopo de acesso no sistema. Todo o fluxo está concentrado em `Avaliações → Fluência Leitora` (`readingMeterListAuditor`).
:::
