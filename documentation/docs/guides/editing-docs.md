---
sidebar_position: 1
title: Como Editar a Documentação
description: Guia prático para o time editar jornadas e documentos
---

# 📝 Como Editar a Documentação

Este guia mostra as diferentes formas de editar a documentação do Ambiente de Prototipação.

## 🗺️ Fluxo de Edição

```mermaid
graph TD
    Start([👤 Membro do Time]) --> Decision1{🤔 Tipo de<br/>edição?}
    
    Decision1 -->|📝 Correção<br/>rápida| GitHub[🌐 GitHub Web Editor]
    Decision1 -->|🔧 Mudança<br/>complexa| Local[💻 Edição Local]
    Decision1 -->|☁️ Sem setup| Codespaces[☁️ GitHub Codespaces]
    
    GitHub --> Navigate1[📄 Navegar até a página<br/>na wiki]
    Navigate1 --> ClickEdit[✏️ Clicar em Edit this page]
    ClickEdit --> EditOnline[🖊️ Editar no navegador]
    EditOnline --> Commit1[💾 Commit changes]
    Commit1 --> Deploy1[🚀 Deploy automático]
    Deploy1 --> End1([✅ Concluído])
    
    Local --> Clone[📥 git clone repositório]
    Clone --> Install[📦 npm install]
    Install --> StartServer[🖥️ npm start]
    StartServer --> EditLocal[✏️ Editar arquivos<br/>com preview local]
    EditLocal --> Commit2[💾 git commit + push]
    Commit2 --> Deploy2[🚀 Deploy automático]
    Deploy2 --> End2([✅ Concluído])
    
    Codespaces --> CreateSpace[☁️ Criar Codespace]
    CreateSpace --> AutoSetup[⚙️ Setup automático]
    AutoSetup --> EditCloud[✏️ Editar no VS Code Web]
    EditCloud --> Commit3[💾 Commit pelo UI]
    Commit3 --> Deploy3[🚀 Deploy automático]
    Deploy3 --> End3([✅ Concluído])
    
    classDef startEnd fill:#e1f5e1,stroke:#4caf50,stroke-width:3px,color:#000
    classDef action fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#000
    classDef decision fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#000
    classDef deploy fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000
    
    class Start,End1,End2,End3 startEnd
    class Navigate1,ClickEdit,EditOnline,Clone,Install,StartServer,EditLocal,CreateSpace,AutoSetup,EditCloud action
    class Decision1 decision
    class Commit1,Commit2,Commit3,Deploy1,Deploy2,Deploy3 deploy
```

## 🚀 Método 1: Edição Direta no GitHub (Mais Fácil)

**Ideal para:** Correções rápidas, ajustes de texto, atualização de informações

### Passo a Passo

1. **Navegue até a página** que deseja editar na wiki
2. **Role até o final** da página
3. **Clique no botão** <kbd>✏️ Edit this page</kbd>
4. Você será redirecionado para o **GitHub Web Editor**
5. **Faça as alterações** diretamente no editor online
6. **Adicione uma mensagem** de commit descritiva:
   ```
   docs: atualiza jornada PROF-001 com novos pain points
   ```
7. **Escolha uma opção:**
   - ✅ **"Commit directly to main"** - Para mudanças pequenas e diretas
   - 🔀 **"Create a new branch and start a pull request"** - Para mudanças que precisam revisão

8. Clique em **"Commit changes"**

### Vantagens ✨

- ✅ Não precisa clonar repositório
- ✅ Não precisa instalar nada
- ✅ Edição visual com preview
- ✅ Funciona direto no navegador

### Quando Usar

- Corrigir typos e erros de português
- Atualizar informações de status
- Adicionar novos pain points
- Ajustar métricas e KPIs
- Atualizar links e referências

---

## 💻 Método 2: Edição Local (Para Mudanças Complexas)

**Ideal para:** Adicionar novas jornadas, reestruturar documentos, testar diagramas Mermaid

### Pré-requisitos

- Git instalado
- Node.js 18+ instalado
- VS Code (recomendado)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5.git
   cd Ambiente_de_Prototipacao_V5/documentation
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```
   A documentação abrirá em `http://localhost:3000`

4. **Edite os arquivos** em `documentation/docs/`
   - Jornadas: `docs/journeys/`
   - Protótipos: `docs/prototypes/`
   - Guias: `docs/guides/`

5. **Visualize as mudanças** em tempo real no navegador

6. **Commit e push**
   ```bash
   git add .
   git commit -m "docs: adiciona jornada PROF-003"
   git push origin main
   ```

### Vantagens ✨

- ✅ Preview em tempo real
- ✅ Validação de Markdown
- ✅ Autocomplete no VS Code
- ✅ Teste de diagramas Mermaid
- ✅ Busca e replace em múltiplos arquivos

---

## 🎨 Método 3: GitHub Codespaces (Recomendado para Times)

**Ideal para:** Colaboração em tempo real, sem configuração local

### Passo a Passo

1. Acesse o repositório no GitHub
2. Clique em **Code** → **Codespaces** → **Create codespace on main**
3. Aguarde o ambiente inicializar
4. No terminal integrado, execute:
   ```bash
   cd documentation
   npm install
   npm start
   ```
5. Edite e visualize mudanças no navegador integrado
6. Commit pelo Source Control do VS Code Web

### Vantagens ✨

- ✅ Ambiente completo na nuvem
- ✅ Sem setup local
- ✅ Mesmo ambiente para todos
- ✅ 60 horas grátis/mês por usuário

---

## 📐 Guia de Sintaxe Markdown

### Cabeçalhos
```markdown
# H1 - Título Principal
## H2 - Seção
### H3 - Subseção
```

### Listas
```markdown
- Item não ordenado
- Outro item

1. Item ordenado
2. Segundo item
```

### Tabelas
```markdown
| Coluna 1 | Coluna 2 |
|----------|----------|
| Valor A  | Valor B  |
```

### Links
```markdown
[Texto do Link](https://exemplo.com)
[Link Interno](../outro-doc)
```

### Imagens
```markdown
![Texto Alternativo](/img/screenshots/imagem.png)
```

### Alertas Coloridos
```markdown
:::tip Dica
Use isso para dicas úteis
:::

:::warning Atenção
Informações importantes
:::

:::danger Cuidado
Avisos críticos
:::

:::info Info
Informações adicionais
:::
```

### Código
````markdown
```javascript
const exemplo = 'código inline'
```
````

### Diagramas Mermaid
````markdown
```mermaid
graph TD
    A[Início] --> B{Decisão}
    B -->|Sim| C[OK]
    B -->|Não| D[Cancelar]
```
````

---

## 🎯 Boas Práticas

### Mensagens de Commit

Use o padrão:
```
<tipo>: <descrição curta>

<descrição detalhada opcional>
```

**Tipos:**
- `docs:` - Alterações na documentação
- `feat:` - Nova jornada ou seção
- `fix:` - Correção de erro
- `style:` - Formatação, typos
- `refactor:` - Reestruturação sem mudar conteúdo

**Exemplos:**
```bash
docs: atualiza pain points da jornada PROF-001
feat: adiciona jornada PROF-005 de relatórios
fix: corrige links quebrados na seção de protótipos
```

### Estrutura de Arquivos

```
docs/
├── journeys/           # Jornadas de usuário
│   ├── teacher/        # Contexto Professor
│   ├── admin/          # Contexto Admin
│   └── student/        # Contexto Aluno
├── prototypes/         # Documentação de protótipos
├── guides/             # Guias como este
└── intro.md            # Página inicial
```

### Nomes de Arquivos

- Use **kebab-case**: `education-system-books.md`
- Não use espaços ou caracteres especiais
- Prefira nomes descritivos

### Diagramas Mermaid

- Use emojis para contexto visual: 🏠 📋 📚 👀 🤔 ⚙️
- Defina cores com `classDef`:
  ```mermaid
  classDef action fill:#e3f2fd,stroke:#2196f3
  class MeuNo action
  ```
- Quebre textos longos com `<br/>`

---

## 🆘 Problemas Comuns

### O diagrama Mermaid não aparece

**Causa:** Sintaxe incorreta
**Solução:** 
1. Verifique se há erro no console do navegador
2. Valide a sintaxe em [mermaid.live](https://mermaid.live)
3. Certifique-se que o bloco começa com ` ```mermaid `

### Imagem não carrega

**Causa:** Caminho incorreto
**Solução:**
- Imagens devem estar em `/documentation/static/img/`
- No Markdown, use `/img/nome.png` (sem `static/`)

### Mudanças não aparecem no site

**Causa:** Cache do navegador
**Solução:**
1. Hard refresh: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
2. Limpe o cache do Docusaurus: `npm run clear`

---

## 📞 Suporte

- **Dúvidas sobre Markdown:** [Guia Docusaurus](https://docusaurus.io/docs/markdown-features)
- **Diagramas Mermaid:** [Documentação Mermaid](https://mermaid.js.org/intro/)
- **Issues no GitHub:** [Criar Issue](https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/issues/new)

---

**Última atualização:** 03/02/2026 | **Versão:** 1.0
