---
sidebar_position: 1
title: Regras de Domínio
description: Conceitos fundamentais e relacionamentos entre entidades
---

import { IconCheck, IconCircleRed, IconWarning, PriorityHigh, PriorityMedium } from '@site/src/components/StatusIcons';
import { IconAdmin, IconTeacher, IconStudent, IconCoordinator, IconDirector, IconNetworkManager } from '@site/src/components/MaterialIcon';

# Regras de Domínio

Esta página documenta as **regras fundamentais** que definem como o Educacross funciona: relacionamentos entre entidades, hierarquias e conceitos-chave.

---

## <span class="material-symbols-outlined">construction</span> Hierarquia Organizacional

### Estrutura de Rede

```mermaid
graph TD
    R[<span class="material-symbols-outlined">language</span> Rede de Ensino] --> I1[<span class="material-symbols-outlined">school</span> Instituição A]
    R --> I2[<span class="material-symbols-outlined">school</span> Instituição B]
    R --> I3[<span class="material-symbols-outlined">school</span> Instituição C]
    
    I1 --> T1[<span class="material-symbols-outlined">library_books</span> 5º Ano A]
    I1 --> T2[<span class="material-symbols-outlined">library_books</span> 6º Ano B]
    
    I2 --> T3[<span class="material-symbols-outlined">library_books</span> 7º Ano A]
    
    T1 --> A1[<span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Aluno 1]
    T1 --> A2[<span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Aluno 2]
    T1 --> A3[<span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Aluno 3]
    
    T2 --> A4[<span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Aluno 4]
    T2 --> A5[<span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Aluno 5]
    
    style R fill:#7C3AED,color:#fff
    style I1 fill:#F59E0B,color:#fff
    style I2 fill:#F59E0B,color:#fff
    style I3 fill:#F59E0B,color:#fff
    style T1 fill:#10B981,color:#fff
    style T2 fill:#10B981,color:#fff
    style T3 fill:#10B981,color:#fff
```

### Regras de Hierarquia

| ID | Regra | Prioridade | Impacto |
|----|-------|------------|---------|
| **RD-001** | Uma **Rede** pode ter N instituições | <PriorityHigh /> | Estrutura base do sistema |
| **RD-002** | Uma **Instituição** pertence a apenas 1 rede | <PriorityHigh /> | Evita ambiguidade de gestão |
| **RD-003** | Uma **Turma** pertence a apenas 1 instituição | <PriorityHigh /> | Organização lógica |
| **RD-004** | Um **Aluno** pode estar em múltiplas turmas | <PriorityMedium /> | Permite turmas de reforço |
| **RD-005** | Um **Professor** pode lecionar em múltiplas turmas | <PriorityHigh /> | Realidade escolar |
| **RD-006** | Um **Gestor** pode gerenciar múltiplas instituições | <PriorityMedium /> | Estruturas de rede |

---

## <span class="material-symbols-outlined">group</span> Perfis de Usuário

### Tipos de Perfil

```mermaid
graph LR
    U[Usuário] --> GM[<IconNetworkManager /> Gestor de Rede]
    U --> D[<IconDirector /> Diretor]
    U --> C[<IconCoordinator /> Coordenador]
    U --> T[<IconTeacher /> Professor]
    U --> S[<IconStudent /> Aluno]
    U --> A[<IconAdmin /> Administrador]
    
    style GM fill:#7C3AED,color:#fff
    style D fill:#F59E0B,color:#fff
    style C fill:#10B981,color:#fff
    style T fill:#3B82F6,color:#fff
    style S fill:#EC4899,color:#fff
    style A fill:#EF4444,color:#fff
```

### Regras de Perfil

| ID | Regra | Descrição |
|----|-------|-----------|
| **RD-007** | Um usuário pode ter **múltiplos perfis** | Ex: Professor que também é Coordenador |
| **RD-008** | Perfil **Aluno** não pode coexistir com outros perfis | Separação clara de contextos |
| **RD-009** | Mudança de perfil requer **aprovação** | Processo de aceitar/recusar perfil |
| **RD-010** | Perfil **inativo** bloqueia acesso ao sistema | Mas dados são preservados |
| **RD-011** | **Administrador** tem acesso irrestrito | Perfil técnico, não pedagógico |

:::warning Atenção
**RD-008** é crítica: um Aluno nunca pode ter simultaneamente perfil de Professor ou Gestor no mesmo sistema.
:::

---

## <span class="material-symbols-outlined">library_books</span> Sistema de Ensino e Conteúdos

### Estrutura de Conteúdo

```mermaid
graph TD
    SE[Sistema de Ensino<br/>Ex: Pró-BNCC] --> L1[<span class="material-symbols-outlined">menu_book</span> Livro 5º Ano]
    SE --> L2[<span class="material-symbols-outlined">menu_book</span> Livro 6º Ano]
    
    L1 --> M1[<span class="material-symbols-outlined">track_changes</span> Missão 1:<br/>Frações]
    L1 --> M2[<span class="material-symbols-outlined">track_changes</span> Missão 2:<br/>Geometria]
    
    M1 --> Q1[<span class="material-symbols-outlined">help</span> Questão 1]
    M1 --> Q2[<span class="material-symbols-outlined">help</span> Questão 2]
    M1 --> Q3[<span class="material-symbols-outlined">help</span> Questão 3]
    
    style SE fill:#7C3AED,color:#fff
    style L1 fill:#3B82F6,color:#fff
    style L2 fill:#3B82F6,color:#fff
    style M1 fill:#10B981,color:#fff
    style M2 fill:#10B981,color:#fff
```

### Regras de Conteúdo

| ID | Regra | Descrição | Exemplo |
|----|-------|-----------|---------|
| **RD-012** | Um **Sistema de Ensino** é composto por N livros | Hierarquia fixa | Pró-BNCC tem 10 livros |
| **RD-013** | Um **Livro** pertence a 1 sistema e 1 série | Organização curricular | Livro de Matemática 5º Ano |
| **RD-014** | Uma **Missão** pertence a 1 livro | Estrutura rígida | Missão de Frações está no Livro 5º Ano |
| **RD-015** | Uma **Missão** contém N questões (mín: 5) | Validação de qualidade | Missão deve ter pelo menos 5 questões |
| **RD-016** | Missão **custom** pode misturar questões de diferentes livros | Flexibilidade para professor | Professor cria missão personalizada |

---

## <span class="material-symbols-outlined">track_changes</span> Habilitação e Visibilidade

### Fluxo de Habilitação

```mermaid
sequenceDiagram
    participant Prof as <span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Professor
    participant Sist as Sistema
    participant Aluno as <span class="material-symbols-outlined">person</span>‍<span class="material-symbols-outlined">school</span> Alunos
    
    Prof->>Sist: Habilita Missão<br/>para Turma 5º A
    Sist->>Sist: Valida permissões
    Sist-->>Prof: <span class="material-symbols-outlined">check_circle</span> Missão habilitada
    Sist->>Aluno: <span class="material-symbols-outlined">notifications</span> Missão disponível<br/>no menu
    
    Note over Aluno: Alunos veem<br/>apenas missões<br/>habilitadas
```

### Regras de Habilitação

| ID | Regra | Impacto na UX |
|----|-------|---------------|
| **RD-017** | Alunos **só veem missões habilitadas** para sua turma | Menu filtrado automaticamente |
| **RD-018** | Professor só pode habilitar missões **de livros compatíveis** com a série da turma | Botão "Habilitar" desabilitado se incompatível |
| **RD-019** | Missão habilitada **não pode ser desabilitada** | Ação irreversível (evita perda de progresso) |
| **RD-020** | Aluno pode **iniciar missão habilitada** a qualquer momento | Sem restrições de horário |
| **RD-021** | Progresso de missão é **individual por aluno** | Cada aluno tem seu próprio status |

:::tip Caso de Uso
**Cenário**: Professor habilita "Missão de Frações" para Turma 5º A.
- <span class="material-symbols-outlined">check_circle</span> Todos os 30 alunos da turma veem a missão
- <span class="material-symbols-outlined">check_circle</span> Aluno A pode estar na questão 3, Aluno B na questão 1
- <span class="material-symbols-outlined">cancel</span> Alunos de outras turmas NÃO veem a missão
:::

---

## <span class="material-symbols-outlined">sync</span> Relacionamentos entre Entidades

### Cardinalidades

| Relacionamento | Tipo | Descrição |
|----------------|------|-----------|
| Rede → Instituições | 1:N | Uma rede tem várias instituições |
| Instituição → Turmas | 1:N | Uma instituição tem várias turmas |
| Turma → Alunos | N:M | Alunos podem estar em múltiplas turmas |
| Professor → Turmas | N:M | Professor leciona em múltiplas turmas |
| Turma → Missões Habilitadas | N:M | Turma pode ter várias missões, missão pode estar em várias turmas |
| Aluno → Missões | N:M | Aluno acessa missões habilitadas para suas turmas |
| Sistema de Ensino → Livros | 1:N | Sistema tem vários livros |
| Livro → Missões | 1:N | Livro tem várias missões |
| Missão → Questões | 1:N | Missão tem várias questões |

### Diagrama ER Simplificado

```mermaid
erDiagram
    REDE ||--o{ INSTITUICAO : possui
    INSTITUICAO ||--o{ TURMA : tem
    TURMA ||--o{ ALUNO : matricula
    PROFESSOR }o--o{ TURMA : leciona
    TURMA }o--o{ MISSAO : habilita
    ALUNO }o--o{ MISSAO : realiza
    
    SISTEMA_ENSINO ||--o{ LIVRO : composto
    LIVRO ||--o{ MISSAO : contem
    MISSAO ||--o{ QUESTAO : possui
    
    REDE {
        int id PK
        string nome
    }
    
    INSTITUICAO {
        int id PK
        string nome
        int redeId FK
    }
    
    TURMA {
        int id PK
        string nome
        string serie
        int instituicaoId FK
    }
    
    ALUNO {
        int id PK
        string nome
        string email
    }
    
    PROFESSOR {
        int id PK
        string nome
        string email
    }
    
    MISSAO {
        int id PK
        string titulo
        int livroId FK
        int ordem
    }
    
    QUESTAO {
        int id PK
        string enunciado
        int missaoId FK
    }
```

---

## <span class="material-symbols-outlined">balance</span> Regras de Consistência

### Validações de Integridade

| ID | Regra | Exemplo de Violação |
|----|-------|---------------------|
| **RD-022** | Não pode deletar Instituição com turmas ativas | <IconCircleRed /> Escola com 5 turmas em andamento |
| **RD-023** | Não pode deletar Turma com alunos matriculados | <IconCircleRed /> Turma com 30 alunos ativos |
| **RD-024** | Não pode deletar Missão habilitada | <IconCircleRed /> Missão que alunos já começaram |
| **RD-025** | Não pode alterar série da turma se tiver missões habilitadas | <IconCircleRed /> Mudar turma de 5º para 6º ano |
| **RD-026** | Aluno inativado perde acesso mas dados são preservados | <IconWarning /> Aluno transferido mantém histórico |

:::danger Regras Críticas de Integridade
As regras **RD-022 a RD-026** são **destrutivas** e devem exibir confirmação dupla na interface antes de qualquer ação.
:::

---

## <span class="material-symbols-outlined">school</span> Séries e Ano Letivo

### Estrutura de Séries

| Série | Faixa Etária | Sistema de Ensino Compatível |
|-------|--------------|------------------------------|
| 1º Ano EF | 6-7 anos | Pró-BNCC, Sistema Anglo |
| 2º Ano EF | 7-8 anos | Pró-BNCC, Sistema Anglo |
| 3º Ano EF | 8-9 anos | Pró-BNCC, Sistema Anglo |
| 4º Ano EF | 9-10 anos | Pró-BNCC, Sistema Anglo, SAS |
| 5º Ano EF | 10-11 anos | Pró-BNCC, Sistema Anglo, SAS |
| 6º Ano EF | 11-12 anos | Todos os sistemas |
| ... | ... | ... |

### Regras de Série

| ID | Regra | Descrição |
|----|-------|-----------|
| **RD-027** | Turma deve ter **série definida** | Obrigatório para vincular conteúdos |
| **RD-028** | Missões são filtradas por **compatibilidade de série** | Só aparecem missões da série correta |
| **RD-029** | Ano letivo é definido por **período** (data início/fim) | Ex: 2024 começa em 01/02/2024 |
| **RD-030** | Aluno pode **progressir automaticamente** de série no novo ano letivo | Configurável pela rede |

---

## <span class="material-symbols-outlined">bar_chart</span> Métricas e Agregações

### Regras de Agregação

| ID | Regra | Escopo |
|----|-------|--------|
| **RD-031** | Progresso da turma = **média** dos progressos individuais | Dashboard do Professor |
| **RD-032** | Taxa de participação = **alunos que iniciaram missão** / total de alunos | Relatório de Engajamento |
| **RD-033** | Desempenho por habilidade = **% de acertos** por tag BNCC | Relatório de Aprendizagem |
| **RD-034** | Ranking é calculado por **pontos totais** (não por % de acertos) | Gamificação |

---

## <span class="material-symbols-outlined">link</span> Referências

- [Controle de Acesso](./access-control) - Quem pode fazer o quê
- [Validações](./validation-rules) - Regras de preenchimento
- [Estados e Transições](./state-transitions) - Como objetos mudam de estado

---

:::tip Dúvidas sobre Regras de Domínio?
Entre em contato com o time de produto ou consulte as [jornadas documentadas](../journeys/).
:::
