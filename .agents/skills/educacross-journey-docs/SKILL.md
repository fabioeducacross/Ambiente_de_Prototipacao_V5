# Educacross Journey Documentation

**Skill para documentação de jornadas educacionais com screenshots e padrões**

---

## 📋 TL;DR

**Problema**: 50+ jornadas sem padrão de documentação consistente.

**Solução**: Template Markdown + screenshots validados + integração Docusaurus.

**Naming convention**:
- Professor: `PROF-001-nome-amigavel.md`
- Aluno: `ALUNO-002-nome-amigavel.md`
- Admin: `ADMIN-003-nome-amigavel.md`

**Screenshot requirements**:
- Resolução: **1440x900** (16:10)
- Formato: PNG
- Naming: `001-descricao-kebab-case.png`
- Anotações: Numbered circles (❶, ❷, ❸) em vermelho (#EA5455)

**Estrutura obrigatória**:
```markdown
# 🎯 [Título da Jornada]

## 📝 Objetivo
[O que o usuário vai alcançar]

## ✅ Pré-requisitos
- [ ] Item 1
- [ ] Item 2

## 📸 Passo a Passo

### Passo 1: [Ação]
![Screenshot](./screenshots/001-acao.png)

❶ Clique aqui  
❷ Preencha o campo  
❸ Confirme  

### Passo 2: [Próxima ação]
...

## ⚠️ Casos de Erro
[O que pode dar errado e como resolver]

## 🔗 Jornadas Relacionadas
- [Nome da jornada](./outra-jornada.md)
```

---

## 🎯 Quando Criar Uma Journey Doc

### ✅ Crie documentação quando:
- Nova funcionalidade com fluxo > 3 telas
- Processo crítico de negócio (matrículas, avaliações, pagamentos)
- Jornada reportada como "confusa" por usuários
- Onboarding de novos perfis (professor, aluno, gestor)
- Integração com sistemas externos (LMS, pagamento)

### ❌ NÃO documente quando:
- Fluxo trivial (1-2 cliques óbvios)
- Feature em desenvolvimento (aguarde estabilização)
- Jornada idêntica a outra existente (faça referência)

---

## 📁 Estrutura de Arquivos

```
documentation/docs/journeys/
├── README.md                          # Índice de todas as jornadas
├── professor/
│   ├── PROF-001-criar-atividade.md
│   ├── PROF-002-corrigir-avaliacoes.md
│   ├── PROF-003-visualizar-relatorios.md
│   └── screenshots/
│       ├── prof-001-001-dashboard.png
│       ├── prof-001-002-formulario.png
│       └── prof-002-001-lista-avaliacoes.png
├── aluno/
│   ├── ALUNO-001-acessar-plataforma.md
│   ├── ALUNO-002-realizar-atividade.md
│   ├── ALUNO-003-ver-notas.md
│   └── screenshots/
├── admin/
│   ├── ADMIN-001-criar-turma.md
│   ├── ADMIN-002-gerenciar-usuarios.md
│   └── screenshots/
└── gestor/
    ├── GESTOR-001-relatorios-gerenciais.md
    └── screenshots/
```

### Naming Rules

**Arquivos Markdown**:
- Formato: `{PERFIL}-{NÚMERO}-{descricao-kebab-case}.md`
- PERFIL: `PROF`, `ALUNO`, `ADMIN`, `GESTOR`
- NÚMERO: 3 dígitos zero-padded (`001`, `002`, `010`)
- Descrição: kebab-case, max 50 chars, sem acentos

**Screenshots**:
- Formato: `{perfil}-{numero-doc}-{sequencia}-{descricao}.png`
- Exemplo: `prof-001-001-dashboard.png`, `aluno-002-003-confirmacao.png`
- Sequência: 3 dígitos (001, 002, 003...)
- Descrição: kebab-case, max 30 chars

**Exemplos válidos**:
- ✅ `PROF-001-criar-atividade-missao.md`
- ✅ `ALUNO-015-submeter-trabalho-final.md`
- ✅ `ADMIN-003-exportar-dados-turma.md`
- ❌ `professor-criar-atividade.md` (sem prefixo PROF-)
- ❌ `PROF-1-atividade.md` (número não zero-padded)
- ❌ `PROF-001-Criar_Atividade.md` (PascalCase, underscore)

---

## 📸 Screenshot Standards

### Resolução e Formato
- **Resolução obrigatória**: 1440x900 (aspect ratio 16:10)
- **Formato**: PNG (com compressão)
- **Peso máximo**: 500KB por imagem
- **DPI**: 72 (web)

**Por quê 1440x900?**
- Resolução comum em laptops modernos
- Aspect ratio 16:10 mostra mais conteúdo vertical que 16:9
- Boa legibilidade em telas Retina quando scaled para 720x450

### Captura de Tela

**Browser setup**:
1. Chrome/Edge em modo janela (não fullscreen)
2. Tamanho da janela: exatamente 1440x900
3. Zoom: 100% (Ctrl+0)
4. DevTools fechado
5. Extensões ocultas (modo anônito ou perfil limpo)

**O que capturar**:
- ✅ UI completa (incluir navbar, sidebar se relevantes)
- ✅ Estado típico da feature (dados exemplo realistas)
- ✅ Hover states e tooltips (se essenciais)
- ❌ Informações sensíveis (emails reais, CPFs, etc.)
- ❌ Console de desenvolvedor aberto
- ❌ Janelas de sistema (downloads, notificações OS)

**Ferramentas recomendadas**:
- **Windows**: Win + Shift + S (Snipping Tool), ShareX
- **Mac**: Cmd + Shift + 4 (área), Cmd + Shift + 5 (gravação)
- **Browser**: Extensões Nimbus Screenshot, Awesome Screenshot
- **Automatização**: Playwright (ver script abaixo)

### Anotações

**Numbered circles** para guiar o olhar:

```html
<!-- Em Markdown, use Unicode circled numbers -->
❶ Primeiro passo
❷ Segundo passo
❸ Terceiro passo
❹ ❺ ❻ ❼ ❽ ❾ ❿

<!-- OU use imagens inline -->
![1](./icons/number-1.svg) Primeiro passo
![2](./icons/number-2.svg) Segundo passo
```

**Cores das anotações** (Vuexy palette):
- Ação obrigatória: **#EA5455** (Danger Red)
- Informação importante: **#00CFE8** (Info Cyan)
- Sucesso/confirmação: **#28C76F** (Success Green)
- Atenção/cuidado: **#FF9F43** (Warning Orange)

**Editing tools**:
- [Skitch](https://evernote.com/products/skitch) (Mac): setas, círculos numerados
- [Greenshot](https://getgreenshot.org/) (Windows): anotações simples
- [Excalidraw](https://excalidraw.com/): desenhar sobre screenshot, exportar PNG
- Figma: criar artboard 1440x900, importar screenshot, adicionar shapes

**Boas práticas**:
- Máximo 5 anotações por screenshot (evitar poluição visual)
- Círculos numerados com offset de 10-15px do elemento apontado
- Setas devem ter tamanho 2-3px, cor sólida
- Blur em dados sensíveis: usar Gaussian Blur radius 10-15px

---

## 📝 Template de Journey

### Estrutura Completa

```markdown
---
title: [Nome Amigável da Jornada]
sidebar_position: [número]
---

# 🎯 [Nome Amigável da Jornada]

> **Persona**: Professor / Aluno / Administrador / Gestor  
> **Duração estimada**: 5-10 minutos  
> **Última atualização**: 2026-02-12

---

## 📝 Objetivo

[Descreva em 1-2 parágrafos O QUE o usuário vai alcançar ao seguir esta jornada]

**Ao final desta jornada, você será capaz de:**
- ✅ [Resultado concreto 1]
- ✅ [Resultado concreto 2]
- ✅ [Resultado concreto 3]

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de que:

- [ ] Você está logado na plataforma como [perfil]
- [ ] Você tem permissão de [permissão específica]
- [ ] [Condição técnica, ex: turma já criada, alunos matriculados]
- [ ] [Recurso disponível, ex: material didático preparado]

---

## 📸 Passo a Passo

### Passo 1: [Ação Inicial - Verbo Imperativo]

![Screenshot do Passo 1](./screenshots/[perfil]-[num]-001-[acao].png)

**Instruções:**

❶ Clique no botão **"[Nome do Botão]"** no topo da tela  
❷ Observe o modal que será aberto  
❸ Verifique se [condição importante]  

:::tip Dica Útil
[Informação que facilita ou acelera o processo]
:::

---

### Passo 2: [Segunda Ação]

![Screenshot do Passo 2](./screenshots/[perfil]-[num]-002-[acao].png)

**Instruções:**

❶ Preencha o campo **"[Nome do Campo]"** com [tipo de dado]  
❷ Selecione [opção] no dropdown  
❸ Certifique-se de que [validação importante]  

:::caution Atenção
Se você [condição], [consequência negativa]. Para evitar, [solução].
:::

---

### Passo 3: [Confirmação/Finalização]

![Screenshot do Passo 3](./screenshots/[perfil]-[num]-003-[acao].png)

**Instruções:**

❶ Revise as informações preenchidas  
❷ Clique em **"Confirmar"** para salvar  
❸ Aguarde a mensagem de sucesso  

:::success Pronto!
Você completou [objetivo da jornada]. A [entidade] foi criada/atualizada com sucesso.
:::

---

## ⚠️ Casos de Erro

### Erro: "[Mensagem de Erro Literal]"

**Causa**: [Por que este erro acontece]

**Solução**:
1. [Passo para resolver 1]
2. [Passo para resolver 2]
3. [Passo para resolver 3]

---

### Erro: "[Outra Mensagem de Erro]"

**Causa**: [Explicação]

**Solução**:
[Passos de resolução]

---

## 🔗 Jornadas Relacionadas

- 📚 [Nome da Jornada Anterior](./jornada-anterior.md) - Contexto necessário
- 🚀 [Próxima Jornada Sugerida](./proxima-jornada.md) - Continuação natural
- 🔍 [Jornada Relacionada](./jornada-relacionada.md) - Feature complementar

---

## 📊 Métricas e Validação

**Como validar que a jornada funcionou**:
- [ ] [Item verificável 1]
- [ ] [Item verificável 2]
- [ ] [Item verificável 3]

**Tempo médio de conclusão**: [X] minutos  
**Taxa de sucesso esperada**: [Y]%  

---

## 🆘 Suporte

Se você encontrou problemas não documentados aqui:

- **FAQ**: [Link para FAQ](../../faq.md)
- **Suporte técnico**: suporte@educacross.com.br
- **Comunidade**: [Discord/Slack/Fórum](https://link)

---

**Autor**: [Nome/Time]  
**Revisores**: [Nome1], [Nome2]  
**Versão**: 1.0.0  
**Última revisão**: 2026-02-12  
```

---

## 🔧 Integração Docusaurus

### Sidebar Configuration

```typescript
// documentation/sidebars.ts
{
  journeys: [
    {
      type: 'category',
      label: '📚 Jornadas do Professor',
      collapsed: false,
      items: [
        'journeys/professor/PROF-001-criar-atividade',
        'journeys/professor/PROF-002-corrigir-avaliacoes',
        'journeys/professor/PROF-003-visualizar-relatorios'
      ]
    },
    {
      type: 'category',
      label: '🎓 Jornadas do Aluno',
      items: [
        'journeys/aluno/ALUNO-001-acessar-plataforma',
        'journeys/aluno/ALUNO-002-realizar-atividade'
      ]
    }
  ]
}
```

### Admonitions (Alertas)

Docusaurus suporta 5 tipos de admonitions:

```markdown
:::note
Informação neutra ou nota de rodapé
:::

:::tip Dica Útil
Dica que acelera ou facilita o processo
:::

:::info Informação Importante
Contexto relevante que o usuário deve saber
:::

:::caution Atenção
Aviso sobre possíveis problemas ou cuidados necessários
:::

:::danger Perigo
Ação irreversível ou que pode causar perda de dados
:::
```

**Quando usar cada tipo**:
- `note`: Contexto adicional opcional (ex: "Este recurso está em beta")
- `tip`: Atalhos, truques, boas práticas (ex: "Use Ctrl+S para salvar")
- `info`: Informações técnicas importantes (ex: "Máximo 500 caracteres")
- `caution`: Avisos de validação ou erros comuns (ex: "Não use acentos")
- `danger`: Ações irreversíveis (ex: "Deletar turma não pode ser desfeito")

### Frontmatter Metadata

```yaml
---
title: Criar Atividade de Missão
sidebar_position: 1
sidebar_label: Criar Atividade
pagination_label: Tutorial - Criar Atividade
description: Aprenda a criar uma nova atividade do tipo Missão para seus alunos
keywords: [atividade, missão, professor, criar]
tags:
  - professor
  - atividades
  - tutorial
---
```

**Campos obrigatórios**:
- `title`: Título completo da página (aparece no `<title>` HTML)
- `sidebar_position`: Ordem na sidebar (número inteiro)

**Campos opcionais**:
- `sidebar_label`: Texto curto na sidebar (se diferente do title)
- `description`: Meta description para SEO
- `keywords`: Array de palavras-chave para busca
- `tags`: Categorização para filtros

---

## 🤖 Automação

### Script 1: Criar Nova Journey

```bash
# Uso:
node scripts/create-journey.js PROF-004 "Exportar Relatórios"

# Gera:
# - documentation/docs/journeys/professor/PROF-004-exportar-relatorios.md
# - documentation/docs/journeys/professor/screenshots/ (pasta)
# - Adiciona entrada em sidebars.ts
```

Ver implementação: [scripts/create-journey.js](../scripts/create-journey.js)

### Script 2: Validar Screenshots

```bash
# Validar todas as screenshots de uma jornada
node scripts/validate-screenshots.js PROF-001

# Validar pasta inteira
node scripts/validate-screenshots.js professor/

# Gera relatório:
# ✅ prof-001-001-dashboard.png (1440x900, 245KB)
# ❌ prof-001-002-form.png (1920x1080) → ERRO: Resolução incorreta
# ⚠️  prof-001-003-confirm.png (1440x900, 850KB) → AVISO: Peso > 500KB
```

Ver implementação: [scripts/validate-screenshots.js](../scripts/validate-screenshots.js)

### Script 3: Gerar Índice

```bash
# Gera README.md com todas as jornadas organizadas por perfil
node scripts/generate-journey-index.js

# Resultado:
# documentation/docs/journeys/README.md
# - Tabela com TODAS as jornadas
# - Filtros por perfil, status, versão
# - Links funcionando
```

---

## ✅ Checklist de Journey

Ao criar ou revisar uma jornada:

- [ ] Nome do arquivo segue pattern `{PERFIL}-{NUM}-{slug}.md`
- [ ] Frontmatter completo (title, sidebar_position, description)
- [ ] Seção **Objetivo** clara e concisa (1-2 parágrafos)
- [ ] **Pré-requisitos** listados e verificáveis
- [ ] **Passo a Passo** com screenshots para CADA passo crítico
- [ ] Screenshots em 1440x900 PNG, peso < 500KB
- [ ] Anotações numeradas (❶❷❸) em elementos chave
- [ ] **Casos de Erro** documentados (top 3-5 erros comuns)
- [ ] **Jornadas Relacionadas** linkadas (contexto antes/depois)
- [ ] Admonitions usados apropriadamente (tip/caution/danger)
- [ ] Sem informações sensíveis (emails reais, CPFs, senhas)
- [ ] Testado por alguém que NÃO escreveu a documentação
- [ ] Revisado por PO ou especialista de domínio
- [ ] Adicionado em `sidebars.ts` na categoria correta

---

## 🚫 Anti-Patterns

### ❌ Screenshots sem anotações

```markdown
### Passo 1: Criar Atividade

![Screenshot](./screenshots/001-form.png)

Preencha o formulário e clique em Salvar.
```

**Problema**: Usuário não sabe ONDE clicar, QUAL campo preencher.

**Solução**: Adicionar numbered circles e texto específico:

```markdown
### Passo 1: Criar Atividade

![Screenshot](./screenshots/001-form.png)

❶ Digite o título no campo **"Nome da Atividade"**  
❷ Selecione **"Missão"** no dropdown de Tipo  
❸ Clique no botão **"Salvar"** (canto inferior direito)  
```

### ❌ Passos muito granulares

```markdown
### Passo 1: Abrir menu
Clique no ícone de menu.

### Passo 2: Clicar em Configurações
No menu aberto, clique em Configurações.

### Passo 3: Rolar até Notificações
Role a página até encontrar a seção Notificações.
```

**Problema**: Jornada fica longa e entediante.

**Solução**: Agrupar ações relacionadas:

```markdown
### Passo 1: Acessar Configurações de Notificações

![Screenshot](./screenshots/001-navegacao.png)

❶ Clique no ícone de **menu** (☰) no topo  
❷ Selecione **"Configurações"**  
❸ Role até a seção **"Notificações"**  
```

### ❌ Descrições genéricas

```markdown
## Objetivo

Este documento explica como usar a feature de atividades.
```

**Problema**: Usuário não sabe o que VAI CONSEGUIR fazer.

**Solução**: Seja específico e orientado a resultado:

```markdown
## Objetivo

Aprenda a criar uma nova atividade do tipo **Missão** para seus alunos, desde a definição do título e objetivos até a publicação com data programada.

**Ao final desta jornada, você será capaz de:**
- ✅ Criar atividades de Missão com objetivos de aprendizagem
- ✅ Configurar datas de início e término
- ✅ Anexar arquivos e recursos multimídia
- ✅ Publicar imediatamente ou agendar para data futura
```

---

## 📚 Recursos

- [Template Completo](../references/journey-template.md)
- [Script Gerador](../scripts/create-journey.js)
- [Validador de Screenshots](../scripts/validate-screenshots.js)
- [Docusaurus Docs](https://docusaurus.io/docs/markdown-features)
- [Admonitions Guide](https://docusaurus.io/docs/markdown-features/admonitions)

---

**Última atualização**: 2026-02-12  
**Versão**: 1.0.0
