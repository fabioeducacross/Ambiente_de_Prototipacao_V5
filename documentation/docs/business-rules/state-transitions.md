---
sidebar_position: 4
title: Estados e Transições
description: Ciclos de vida de objetos e regras de mudança de estado
---

import { IconCheck, IconCircleRed, IconWarning, IconConstruction, PriorityHigh, PriorityMedium } from '@site/src/components/StatusIcons';
import { IconAdmin, IconTeacher, IconStudent } from '@site/src/components/MaterialIcon';

# Estados e Transições

Esta página documenta **como objetos mudam de estado** ao longo do tempo, quais transições são permitidas e quais ações disparam mudanças.

:::info Objetivo
Garantir que **estados sejam consistentes** e que transições inválidas sejam bloqueadas antes de causar problemas.
:::

---

## 👤 Estados de Usuário

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Pendente: Cadastro criado
    Pendente --> Ativo: Admin aprova
    Pendente --> Recusado: Admin recusa
    
    Ativo --> Inativo: Admin desativa
    Inativo --> Ativo: Admin reativa
    
    Recusado --> [*]: Não pode ser revertido
    
    note right of Ativo
        Usuário pode acessar<br/>
        o sistema normalmente
    end note
    
    note right of Pendente
        Aguardando aprovação<br/>
        Não pode fazer login
    end note
```

### Tabela de Transições

| Estado Atual | Próximo Estado | Quem Pode Executar | Regra | Reversível? |
|--------------|----------------|--------------------| ------|-------------|
| **Pendente** | Ativo | <IconAdmin /> Admin | Aprovação manual | Sim → Inativo |
| **Pendente** | Recusado | <IconAdmin /> Admin | Rejeição com motivo | ❌ Não |
| **Ativo** | Inativo | <IconAdmin /> Admin | Desativação temporária | ✅ Sim |
| **Inativo** | Ativo | <IconAdmin /> Admin | Reativação | ✅ Sim |

### Regras de Estado

| ID | Regra | Descrição | Impacto |
|----|-------|-----------|---------|
| **EST-001** | Usuário **Pendente** não pode fazer login | Bloqueio até aprovação | Exibe: "Aguardando aprovação" |
| **EST-002** | Usuário **Inativo** perde acesso imediato | Sessão é encerrada | Exibe: "Conta desativada" |
| **EST-003** | Usuário **Recusado** nunca pode ser ativado | Estado final | Cadastro deve ser refeito |
| **EST-004** | Mudança de estado gera **notificação** | Email automático | Usuário é informado |

---

## 📚 Estados de Missão

### Diagrama de Ciclo de Vida

```mermaid
stateDiagram-v2
    [*] --> Rascunho: Professor cria
    Rascunho --> Publicada: Professor publica
    Publicada --> Habilitada: Professor habilita<br/>para turma
    
    Rascunho --> Arquivada: Professor arquiva
    Publicada --> Arquivada: Professor arquiva
    
    Habilitada --> EmAndamento: Aluno inicia
    EmAndamento --> Concluída: Aluno termina
    EmAndamento --> Pausada: Sistema/Aluno pausa
    Pausada --> EmAndamento: Aluno retoma
    
    Arquivada --> [*]: Removida do catálogo
    Concluída --> [*]: Estado final
    
    note right of Rascunho
        Visível apenas<br/>
        para o criador
    end note
    
    note right of Habilitada
        Visível para alunos<br/>
        da turma
    end note
```

### Tabela de Transições de Missão

| Estado Atual | Próximo Estado | Quem Pode | Condições | Reversível? |
|--------------|----------------|-----------|-----------|-------------|
| **Rascunho** | Publicada | <IconTeacher /> Professor | Mín. 5 questões | ✅ Sim |
| **Publicada** | Habilitada | <IconTeacher /> Professor | Turma ativa | ❌ Não pode desabilitar |
| **Habilitada** | Em Andamento | <IconStudent /> Aluno | Clicar em "Iniciar" | ✅ Pode pausar |
| **Em Andamento** | Pausada | Sistema/Aluno | Timeout ou pausa manual | ✅ Pode retomar |
| **Em Andamento** | Concluída | Sistema | Última questão respondida | ❌ Não |
| **Rascunho/Publicada** | Arquivada | <IconTeacher /> Professor | Confirmação | ⚠️ Difícil reverter |

### Regras de Estado de Missão

| ID | Regra | Descrição | Exemplo |
|----|-------|-----------|---------|
| **EST-005** | Missão **Rascunho** não aparece para alunos | Visibilidade restrita | Só o criador vê |
| **EST-006** | Missão **Habilitada** não pode ser editada | Integridade do conteúdo | Bloqueio de edição |
| **EST-007** | Missão **Em Andamento** salva progresso automaticamente | A cada resposta | Evita perda de dados |
| **EST-008** | Missão **Concluída** é estado final | Não pode refazer | Botão "Refazer" desabilitado |
| **EST-009** | Missão **Arquivada** some do catálogo | Não aparece em buscas | Só via relatórios |

---

## 🏫 Estados de Turma

### Diagrama de Estados

```mermaid
stateDiagram-v2
    [*] --> Planejamento: Criada pelo diretor
    Planejamento --> Ativa: Início do ano letivo
    Ativa --> Encerrada: Fim do ano letivo
    Ativa --> Suspensa: Temporariamente inativa
    Suspensa --> Ativa: Reativação
    Encerrada --> Arquivada: Após 2 anos
    
    note right of Planejamento
        Cadastro em andamento<br/>
        Sem alunos ainda
    end note
    
    note right of Ativa
        Alunos podem<br/>
        acessar missões
    end note
    
    note right of Encerrada
        Dados preservados<br/>
        Sem novas atividades
    end note
```

### Tabela de Transições de Turma

| Estado Atual | Próximo Estado | Quem Pode | Regra | Impacto |
|--------------|----------------|-----------|-------|---------|
| **Planejamento** | Ativa | Diretor/Admin | Definir data de início | Alunos ganham acesso |
| **Ativa** | Suspensa | Diretor/Admin | Motivo obrigatório | Alunos perdem acesso temporário |
| **Suspensa** | Ativa | Diretor/Admin | Resolver pendência | Alunos recuperam acesso |
| **Ativa** | Encerrada | Sistema | Data fim atingida | Alunos só visualizam dados |
| **Encerrada** | Arquivada | Sistema | Após 2 anos | Dados migram para arquivo histórico |

### Regras de Estado de Turma

| ID | Regra | Descrição |
|----|-------|-----------|
| **EST-010** | Turma **Planejamento** não permite habilitar missões | Deve estar ativa primeiro |
| **EST-011** | Turma **Suspensa** bloqueia acesso de alunos | Professores ainda veem dados |
| **EST-012** | Turma **Encerrada** é read-only | Nenhuma edição permitida |
| **EST-013** | Turma **Arquivada** só acessível via relatórios | Não aparece em listas normais |

---

## 🎯 Estados de Progresso do Aluno

### Diagrama de Progresso em Missão

```mermaid
stateDiagram-v2
    [*] --> NãoIniciada: Missão habilitada
    NãoIniciada --> EmAndamento: Aluno clica "Iniciar"
    EmAndamento --> EmAndamento: Responde questões
    
    EmAndamento --> Pausada: Timeout 30min inativo
    Pausada --> EmAndamento: Aluno retoma
    
    EmAndamento --> Concluída: Última questão<br/>respondida
    Concluída --> [*]: Fim do ciclo
    
    note right of EmAndamento
        Progresso: X/N questões<br/>
        Pontos acumulados<br/>
        Tempo decorrido
    end note
    
    note right of Concluída
        Pontuação final<br/>
        % de acertos<br/>
        Tempo total
    end note
```

### Transições de Progresso

| Estado Atual | Próximo Estado | Gatilho | Dados Salvos | Reversível? |
|--------------|----------------|---------|--------------|-------------|
| **Não Iniciada** | Em Andamento | Clicar "Iniciar Missão" | Timestamp início | ✅ Sim |
| **Em Andamento** | Em Andamento | Responder questão | Respostas + pontos | ✅ Sim |
| **Em Andamento** | Pausada | 30 min inativo | Progresso preservado | ✅ Sim |
| **Pausada** | Em Andamento | Clicar "Continuar" | Carrega progresso salvo | ✅ Sim |
| **Em Andamento** | Concluída | Responder última questão | Pontuação final | ❌ Não |

### Regras de Progresso

| ID | Regra | Descrição | Exemplo |
|----|-------|-----------|---------|
| **EST-014** | Progresso é **salvo automaticamente** a cada resposta | Evita perda de dados | Aluno responde Q3 → salvo instantaneamente |
| **EST-015** | Missão **pausada** pode ser retomada em até 7 dias | Após 7 dias, perde progresso | Pausou 02/02 → até 09/02 pode retomar |
| **EST-016** | Missão **concluída** não pode ser refeita | Estado final | Botão "Refazer" não existe |
| **EST-017** | **Pontuação** é calculada ao concluir | Soma de acertos × peso | Ver [Cálculos](./calculation-rules) |

---

## 🔔 Estados de Notificação

### Ciclo de Vida de Notificação

```mermaid
stateDiagram-v2
    [*] --> Pendente: Sistema gera notificação
    Pendente --> Enviada: Sistema envia
    Enviada --> Lida: Usuário abre
    Enviada --> Expirada: 30 dias sem leitura
    
    Lida --> Arquivada: Usuário arquiva
    Expirada --> Arquivada: Sistema arquiva
    
    Arquivada --> [*]: Removida após 90 dias
    
    note right of Pendente
        Fila de envio<br/>
        Aguardando processamento
    end note
```

### Regras de Notificações

| ID | Regra | Descrição |
|----|-------|-----------|
| **EST-018** | Notificação **não lida** aparece com badge vermelho | Contador de não lidas |
| **EST-019** | Notificação **expirada** some automaticamente | Após 30 dias sem leitura |
| **EST-020** | Notificação **arquivada** só acessível via histórico | Link "Ver arquivadas" |

---

## 🎓 Estados de Perfil

### Diagrama de Aprovação de Perfil

```mermaid
stateDiagram-v2
    [*] --> PendenteAceitação: Perfil atribuído
    PendenteAceitação --> Aceito: Usuário aceita
    PendenteAceitação --> Recusado: Usuário recusa
    
    Aceito --> Ativo: Sistema ativa
    Ativo --> Inativo: Admin desativa
    Inativo --> Ativo: Admin reativa
    
    Recusado --> [*]: Perfil removido
    
    note right of PendenteAceitação
        Usuário decide se<br/>
        quer assumir o perfil
    end note
    
    note right of Ativo
        Perfil disponível<br/>
        para login
    end note
```

### Fluxo de Aceitar/Recusar Perfil

```mermaid
sequenceDiagram
    participant A as Admin
    participant S as Sistema
    participant U as Usuário
    
    A->>S: Atribui perfil "Professor"<br/>ao Usuário João
    S->>U: 📧 Email: "Você foi atribuído<br/>como Professor"
    
    U->>S: Acessa link no email
    S-->>U: Exibe tela:<br/>"Aceitar perfil Professor?"
    
    alt Usuário aceita
        U->>S: Clica "Aceitar"
        S->>S: Muda estado → Ativo
        S-->>U: ✅ "Perfil ativado"
        S->>A: 📧 "João aceitou perfil"
    else Usuário recusa
        U->>S: Clica "Recusar"
        S->>S: Muda estado → Recusado
        S-->>U: "Perfil removido"
        S->>A: 📧 "João recusou perfil"
    end
```

### Regras de Perfil

| ID | Regra | Descrição |
|----|-------|-----------|
| **EST-021** | Perfil **Pendente** não pode fazer login com esse perfil | Bloqueio até aceitar |
| **EST-022** | Perfil **Recusado** é removido permanentemente | Não pode reverter |
| **EST-023** | Perfil **Ativo** permite login imediato | Sem delay |
| **EST-024** | Perfil **Inativo** bloqueia acesso mas preserva dados | Pode reativar |

---

## 📊 Estados de Relatório

### Ciclo de Geração de Relatório

```mermaid
stateDiagram-v2
    [*] --> Solicitado: Usuário solicita
    Solicitado --> Processando: Sistema inicia
    Processando --> Concluído: Geração OK
    Processando --> Erro: Falha
    
    Erro --> Solicitado: Tentar novamente
    Concluído --> Disponível: Pronto para download
    Disponível --> Expirado: 7 dias após geração
    
    Expirado --> [*]: Removido
    
    note right of Processando
        Pode levar minutos<br/>
        para grandes volumes
    end note
    
    note right of Disponível
        Download habilitado<br/>
        Link válido por 7 dias
    end note
```

### Regras de Relatórios

| ID | Regra | Descrição | Timeout |
|----|-------|-----------|---------|
| **EST-025** | Relatório **Processando** exibe barra de progresso | Feedback visual | Máx. 5 min |
| **EST-026** | Relatório **Erro** permite nova tentativa | Botão "Tentar novamente" | 3 tentativas |
| **EST-027** | Relatório **Disponível** expira em 7 dias | Link de download temporário | 7 dias |

---

## 🔗 Referências

- [Regras de Domínio](./domain-rules) - Entidades base
- [Controle de Acesso](./access-control) - Quem pode mudar estados
- [Validações](./validation-rules) - Condições para transições

---

:::tip Princípio de Design
**Estados devem ser explícitos na interface**:
- Use badges coloridos (Ativo = verde, Pendente = amarelo, Inativo = cinza)
- Desabilite ações inválidas (botão "Editar" desabilitado para missão habilitada)
- Exiba mensagens claras ao tentar transições bloqueadas
:::
