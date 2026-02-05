---
sidebar_position: 2
title: Personas
description: Conheça os usuários do Educacross
---
import { IconTeacher, IconStudent, IconAdmin, IconCoordinator, IconDirector, IconCheck } from '@site/src/components/MaterialIcon';

# Personas

O Educacross é projetado para atender diversos perfis de usuários em diferentes níveis da hierarquia educacional.

## Visão Geral

```mermaid
mindmap
  root((Educacross))
    Professor
      Engajar alunos
      Acompanhar progresso
    Aluno
      Realizar missões
      Aprender brincando
    Gestão Escolar
      Administrador
        Acessos e Turmas
      Coordenador
        Pedagógico
      Diretor
        Estratégico
    Gestão de Rede
      Gestor de Rede
        Acompanhamento consolidado
```

---

## Perfis de Usuário

### [<IconTeacher size={24} /> Professor](./professor)
O protagonista em sala de aula. Responsável por selecionar o conteúdo (missões/jogos) e acompanhar o desenvolvimento dos alunos no dia a dia.

### [<IconStudent size={24} /> Aluno](./aluno)
O usuário final. Utiliza a plataforma para aprender matemática e letramento de forma lúdica e gamificada.

### [<IconAdmin size={24} /> Administrador](./administrator)
O braço operacional. Responsável por cadastros, senhas, enturmação e garantia de que todos conseguem acessar o sistema.

### [<IconCoordinator size={24} /> Coordenador](./coordinator)
O apoio pedagógico. Monitora se a metodologia está sendo aplicada, analisa relatórios de aprendizagem e orienta professores.

### [<IconDirector size={24} /> Diretor](./director)
O gestor estratégico da unidade. Acompanha indicadores macro de uso e retorno sobre o investimento (ROI).

### [<span class="material-symbols-outlined" style={{fontSize: '24px', verticalAlign: 'middle', marginRight: '5px'}}>group</span> Gestor de Rede](./network-manager)
A visão consolidada. Acompanha o desempenho de múltiplas escolas de uma rede (privada ou pública) para identificar pontos de atenção.

---

## Matriz de Responsabilidades

| Responsabilidade | Professor | Admin | Coord | Diretor | Rede |
|------------------|:---------:|:-----:|:-----:|:-------:|:----:|
| Encarregar Missões | <IconCheck size={14} /> | | | | |
| Jogar (Gamificação) | | | | | | (Só Aluno) |
| Criar/Editar Turmas | | <IconCheck size={14} /> | | | |
| Aprovar Cadastros | | <IconCheck size={14} /> | | | |
| Relatórios Pedagógicos | <IconCheck size={14} /> | | <IconCheck size={14} /> | | |
| Relatórios de Acesso | | | | <IconCheck size={14} /> | <IconCheck size={14} /> |
| Visão Multi-escola | | | | | <IconCheck size={14} /> |
