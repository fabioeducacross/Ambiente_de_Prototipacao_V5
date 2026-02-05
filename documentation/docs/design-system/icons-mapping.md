---
sidebar_position: 1
title: Mapeamento de Ícones
description: Tabela de mapeamento de emojis para ícones Feather e Material
---

# Mapeamento de Ícones

Este documento mapeia todos os emojis utilizados na documentação para seus equivalentes nas bibliotecas de ícones oficiais do projeto.

## Bibliotecas Utilizadas

| Biblioteca | Versão | Uso Principal | Documentação |
|------------|--------|---------------|--------------|
| **Feather Icons** | 5.1.0 | Ícones de UI (navegação, ações, feedback) | [feathericons.com](https://feathericons.com/) |
| **Material Symbols** | Outlined | Ícones de conteúdo e conceitos | [fonts.google.com/icons](https://fonts.google.com/icons?icon.style=Outlined) |

---

## Tabela Completa de Mapeamento

### Status e Indicadores

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| ✅ | Check/Concluído | `check-circle` | `check_circle` | Status concluído, ativo |
| ❌ | X/Erro | `x-circle` | `cancel` | Status erro, descontinuado |
| ⚠️ | Alerta | `alert-triangle` | `warning` | Avisos, atenção |
| 🚧 | Em construção | `tool` | `construction` | Em desenvolvimento |
| ⏳ | Pendente | `clock` | `hourglass_empty` | Aguardando, pendente |
| 🔄 | Refresh/Ciclo | `refresh-cw` | `sync` | Refatoração, atualização |

### Prioridades (Círculos Coloridos)

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 🔴 | Círculo vermelho | `circle` (red) | `circle` (red) | Alta prioridade |
| 🟡 | Círculo amarelo | `circle` (yellow) | `circle` (yellow) | Média prioridade |
| 🟢 | Círculo verde | `circle` (green) | `circle` (green) | Baixa prioridade |

### Personas e Usuários

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 👨‍🏫 | Professor | `user` | `school` | Contexto professor |
| 👨‍💼 | Admin/Gestor | `briefcase` | `admin_panel_settings` | Contexto administrativo |
| 👨‍🎓 | Estudante | `user` | `person` | Contexto estudante |
| 🎓 | Formatura | `award` | `school` | Educação, graduação |

### Navegação e UI

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 🏠 | Casa/Home | `home` | `home` | Página inicial |
| 🔗 | Link | `link` | `link` | Links externos |
| 🔍 | Busca | `search` | `search` | Pesquisa, auditoria |
| 👁️ | Olho/Visualizar | `eye` | `visibility` | Ver detalhes |
| ⚙️ | Engrenagem | `settings` | `settings` | Configurações |

### Conteúdo e Documentação

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 📚 | Livros | `book` | `menu_book` | Biblioteca, livros |
| 📖 | Livro aberto | `book-open` | `auto_stories` | Leitura, documentação |
| 📋 | Prancheta | `clipboard` | `assignment` | Tarefas, lista |
| 📝 | Nota/Editar | `edit-3` | `edit_note` | Edição, escrita |
| 📄 | Documento | `file-text` | `description` | Arquivo, documento |

### Dados e Análise

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 📊 | Gráfico barras | `bar-chart-2` | `bar_chart` | Relatórios, métricas |
| 📈 | Gráfico linha | `trending-up` | `trending_up` | Crescimento, tendência |
| 🎯 | Alvo | `target` | `gps_fixed` | Objetivo, meta |

### Funcionalidades

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 🎮 | Controle/Game | `play` | `sports_esports` | Jogos, gamificação |
| 💡 | Lâmpada | `zap` | `lightbulb` | Ideia, dica |
| ✨ | Brilho | `star` | `auto_awesome` | Destaque, novo |
| 🚀 | Foguete | `send` | `rocket_launch` | Lançamento, deploy |
| 🎨 | Paleta | `droplet` | `palette` | Design, cores |

### Arquitetura e Técnico

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 📐 | Régua/Arquitetura | `layout` | `architecture` | Padrões, estrutura |
| 🧩 | Puzzle | `box` | `extension` | Componentes, módulos |
| 🔌 | Plug/API | `zap` | `electrical_services` | Integração, API |
| 🛣️ | Estrada | `map` | `route` | Rotas, navegação |
| 🗄️ | Arquivo/Store | `database` | `storage` | Banco de dados, Vuex |

### Comunicação

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 📞 | Telefone | `phone` | `call` | Contato |
| 📡 | Antena | `wifi` | `cell_tower` | API, conexão |
| 🌐 | Globo | `globe` | `public` | Web, internacional |

### Colaboração

| Emoji | Descrição | Feather Icon | Material Symbol | Uso |
|:-----:|-----------|--------------|-----------------|-----|
| 🤝 | Aperto de mãos | `users` | `handshake` | Parceria, contribuição |
| 🐙 | GitHub | `github` | `code` | Repositório |
| 📸 | Câmera | `camera` | `photo_camera` | Screenshot, imagem |

---

## Como Usar

### Feather Icons (Vue Component)

```vue
<template>
  <!-- Importar do vue-feather-icons -->
  <feather-icon icon="CheckCircleIcon" size="16" />
  <feather-icon icon="AlertTriangleIcon" size="16" class="text-warning" />
  <feather-icon icon="XCircleIcon" size="16" class="text-danger" />
</template>

<script>
import { CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from 'vue-feather-icons'
</script>
```

### Material Symbols (CSS Class)

```html
<!-- Adicionar fonte no CSS -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

<!-- Usar no HTML -->
<span class="material-symbols-outlined">check_circle</span>
<span class="material-symbols-outlined text-warning">warning</span>
<span class="material-symbols-outlined text-danger">cancel</span>
```

### Docusaurus (MDX Component)

```jsx
// Componente React para MDX
import { IconCheck, IconWarning, IconX } from '@site/src/components/StatusIcons';

<IconCheck size={16} /> Concluído
<IconWarning size={16} /> Em progresso
<IconX size={16} /> Cancelado
```

---

## Convenções de Cores

| Contexto | Cor | CSS Class | Hex |
|----------|-----|-----------|-----|
| Sucesso/Ativo | Verde | `text-success` | `#28C76F` |
| Erro/Cancelado | Vermelho | `text-danger` | `#EA5455` |
| Alerta/Progresso | Laranja | `text-warning` | `#FF9F43` |
| Info/Link | Ciano | `text-info` | `#00CFE8` |
| Primary/Ação | Roxo | `text-primary` | `#7367F0` |

---

## Referências

- [Feather Icons - Catálogo Completo](https://feathericons.com/)
- [Material Symbols - Catálogo Completo](https://fonts.google.com/icons?icon.style=Outlined)
- [vue-feather-icons - npm](https://www.npmjs.com/package/vue-feather-icons)
- [Design System Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)

---

**Última Atualização**: 5 de fevereiro de 2026
