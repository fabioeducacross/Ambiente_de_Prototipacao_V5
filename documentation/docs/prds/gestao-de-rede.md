---
sidebar_position: 3
title: PRD: Gestão de Rede
description: Especificação da funcionalidade de gestão centralizada de múltiplas instituições
---

import { IconCheck, IconWarning, IconConstruction, PriorityHigh, PriorityMedium, PriorityLow } from '@site/src/components/StatusIcons';

# PRD: Gestão de Rede (Network Management)

Este documento detalha o funcionamento da **Gestão de Rede**, permitindo que gestores públicos ou privados controlem múltiplas escolas de maneira centralizada e padronizada.

---

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **ID** | PRD-002 |
| **Título** | Gestão de Rede |
| **Autor** | Equipe de Produto |
| **Data de Criação** | 2026-02-12 |
| **Última Atualização** | 2026-02-12 |
| **Status** | <IconConstruction /> Rascunho |
| **Prioridade** | <PriorityMedium /> Média |
| **Trimestre** | Q2 2026 |
| **Squad** | Administração e Escala |

---

## 🎯 1. Contexto e Problema

### 1.1 Qual é o Problema?

Gestores de grandes redes (secretarias de educação ou grupos escolares) operam de forma fragmentada. Cada escola acaba se tornando uma "ilha" de dados, dificultando a padronização pedagógica e a visão consolidada de performance.

**Dores identificadas:**
- Dificuldade em comparar o desempenho entre diferentes escolas da mesma rede.
- Falta de um calendário escolar unificado (feriados, recessos, datas de avaliações nacionais).
- Processo manual e lento para redistribuição de licenças e recursos entre instituições.
- Ausência de alertas antecipados para escolas com indicadores críticos de evasão ou baixo desempenho.

### 1.2 Para Quem é Este Problema?

**Personas afetadas:**
- [x] [Gestor de Rede](../personas/network-manager.md)
- [x] [Administrador](../personas/administrator.md)
- [x] [Diretor](../personas/director.md) (pela transparência dos dados)

---

## 🎯 2. Objetivos e Métricas de Sucesso

### 2.1 Objetivo da Feature

Implementar um Dashboard Executivo e ferramentas de configuração global que permitam gerenciar todas as escolas da rede em um único ponto de acesso, garantindo equidade e eficiência operacional.

### 2.2 Métricas de Sucesso (KPIs)

| Métrica | Meta (TO-BE) |
|---------|--------------|
| **Criação de Relatório Consolidado** | < 2 minutos (atualmente manual/dias) |
| **Tempo de Configuração de Calendário Global** | < 15 minutos para toda a rede |
| **Acuracidade dos Dados de Rede** | 99% em tempo real |

---

## 🛠️ 3. Requisitos Funcionais

### 3.1 Painel do Gestor de Rede (Dashboard)
- [ ] **Visão de Mapa**: Localização geográfica das escolas com indicadores de status (Verde/Amarelo/Vermelho).
- [ ] **Rankings de Performance**: Comparativos de engajamento e correção de missões.
- [ ] **Filtros Globais**: Ver dados por série, disciplina ou turno em toda a rede.

### 3.2 Configurações Globais (Governance)
- [ ] **Calendário Unificado**: Definir datas que se aplicam a todas as escolas (ex: Feriado Municipal).
- [ ] **Currículo Padronizado**: Forçar a disponibilização de certas missões ou livros para toda a rede em datas específicas.
- [ ] **Gestão de Licenças**: Monitorar e mover "vagas" de alunos entre escolas conforme a matrícula.

---

## 🛠️ 4. Requisitos Não Funcionais

- **Escalabilidade**: Suportar até 5.000 escolas em uma única rede sem perda de performance no dashboard.
- **Segurança**: Permissões granulares - o gestor de uma escola não pode ver os dados detalhados de outra escola vizinha sem autorização da Rede.

---

## 📈 5. Roadmap

1. **MVP**: Dashboard consolidado com métricas de MAU e Conclusão de Missões.
2. **Fase 2**: Ferramenta de configuração de Calendário Global.
3. **Fase 3**: Sistema de Alertas Preditivos (IA) para escolas em risco.
