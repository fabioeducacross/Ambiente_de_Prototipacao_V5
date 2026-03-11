# Ambiente de Prototipação V5

Workspace de prototipação da Educacross com `FrontOffice/` como aplicação ativa, wiki Docusaurus e artefatos de apoio ao design system.

## 📖 Visão Geral

Este repositório reúne 3 superfícies: o `FrontOffice/` (desenvolvimento ativo), a wiki em `documentation/` e a pasta `src/` da raiz, mantida apenas como legado/histórico. A stack principal continua sendo Vue 3 + Vite, com Bootstrap, protótipos por persona e dados locais/mockados.

## 🚀 Características

- **FrontOffice ativo** em `FrontOffice/` com Vue 3, Vite e `<script setup>`
- **Rotas por persona** para professor, aluno, administrador, coordenador, diretor e gestor de rede
- **Módulos dedicados** para calendários e sistema de ensino
- **Storybook canônico** em `design-system/` para catálogo de componentes
- **Wiki Docusaurus** para documentação, jornadas e screenshots de referência
- **Dados locais/mockados** em arquivos do próprio repositório
- **Interface responsiva** com Design System inspirado no Vuexy

## 📋 Pré-requisitos

- Node.js 18+ 
- npm 9+

## 🛠️ Instalação

```bash
# Clonar o repositório
git clone https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5.git

# Navegar para o diretório do projeto
cd Ambiente_de_Prototipacao_V5

# Instalar dependências
npm install
```

## 💻 Uso

### Desenvolvimento — todos os servidores de uma vez

```bash
# Na raiz do projeto — inicia os 3 servidores simultaneamente
npm run dev:all
```

| Servidor | URL | Descrição |
|----------|-----|-----------|
| `[ROOT]`  | http://localhost:5173 | Vite raiz (serve FrontOffice) |
| `[FO]`    | http://localhost:5174 | FrontOffice — protótipos por persona |
| `[DOCS]`  | http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/ | Wiki Docusaurus |

> O `dev:all` mata automaticamente processos nas portas 5173, 5174 e 3000 antes de iniciar — pode rodar mesmo se os servidores já estiverem rodando ou tiverem travado.

### Servidores individuais

```bash
npm run dev          # FrontOffice via vite.config.js da raiz (porta 5174)
npm run dev:fo       # FrontOffice diretamente (porta 5174)
npm run dev:docs     # Docusaurus wiki (porta 3000)
npm run dev:ds       # Storybook / design system (porta 6006)
```

### Storybook / Design System

Na primeira utilização do subprojeto `design-system/`, instale as dependências dele separadamente:

```bash
npm run setup:ds
```

Depois disso:

```bash
npm run dev:ds    # Storybook local em http://localhost:6006
npm run build:ds  # Build estático do Storybook
```

### Build para Produção

```bash
npm run build    # Build do FrontOffice
npm run preview  # Preview do build localmente
```

### Publicação (GitHub Pages)

1. Faça push para `v1.1` ou `main` (ou use **Run workflow** no GitHub Actions para `Deploy Vite to GitHub Pages`).
2. O workflow executa `npm ci` + `npm run build` e publica o conteúdo de `dist`.
3. Acesse a versão pública em https://fabioeducacross.github.io/Ambiente_de_Prototipacao_V5/.

## 📁 Estrutura do Projeto

```
Ambiente_de_Prototipacao_V5/
├── FrontOffice/                  # Aplicação ativa do workspace
│   ├── src/
│   │   ├── views/                # Home, About e telas por persona
│   │   ├── modules/              # calendário, sistema-de-ensino
│   │   ├── components/           # Componentes reutilizáveis do FrontOffice
│   │   ├── shared/               # Recursos compartilhados entre módulos
│   │   ├── data/                 # Mocks e fixtures
│   │   └── router/               # Rotas ativas
│   └── package.json
├── documentation/                # Wiki Docusaurus
│   ├── docs/
│   ├── src/components/
│   └── static/img/screenshots/
├── design-system/                # Storybook / design system local
│   ├── .storybook/
│   ├── stories/
│   ├── registry/
│   └── tokens/
├── public/                       # Assets públicos compartilhados
├── src/                          # Protótipo legado (somente consulta)
├── package.json                  # Scripts raiz
├── vite.config.js                # Root Vite apontando para `FrontOffice/`
└── README.md                     # Este arquivo
```

## 🎨 Design System

O projeto utiliza o Design System baseado no Vuexy com a seguinte paleta de cores:

- **Primary**: `#7367F0` (Roxo)
- **Secondary**: `#82868B` (Cinza)
- **Success**: `#28C76F` (Verde)
- **Danger**: `#EA5455` (Vermelho)
- **Warning**: `#FF9F43` (Laranja)
- **Info**: `#00CFE8` (Ciano)

### Referência do Design System

Para mais informações sobre o Design System completo, visite:
[https://fabioeducacross.github.io/DesignSystem-Vuexy/](https://fabioeducacross.github.io/DesignSystem-Vuexy/)

## 📊 Sistema de Dados

Os mocks e fixtures usados pelo FrontOffice ficam principalmente em `FrontOffice/src/data/`.

Atualmente, os arquivos-base incluem:

- `calendar-mock-teacher.json`
- `eventsCalendar.json`
- `journeys.ts`
- `trilhas-az.json`

Sempre que possível, mantenha dados de protótipo próximos da feature: use `FrontOffice/src/data/` para dados compartilhados e os módulos em `FrontOffice/src/modules/` quando o mock pertencer a uma feature específica.

## 🔧 Personalização

### Adicionar ou ajustar dados mockados

1. Edite arquivos em `FrontOffice/src/data/`
2. Se o dado pertencer a uma feature isolada, prefira armazená-lo próximo ao módulo correspondente em `FrontOffice/src/modules/`
3. Reutilize estruturas já existentes antes de criar novos formatos

### Criar Nova Página

1. Crie a view em `FrontOffice/src/views/` ou dentro de `FrontOffice/src/modules/`
2. Registre a rota em `FrontOffice/src/router/index.js`
3. Adicione metadados de `title`, `persona` e `breadcrumb` quando fizer sentido

### Adicionar Componente Reutilizável

1. Verifique primeiro `FrontOffice/src/components/`
2. Para componentes cross-feature, use `FrontOffice/src/shared/`
3. Importe o componente nas views ou módulos necessários

## 🌐 Rotas Disponíveis

As rotas ativas ficam em `FrontOffice/src/router/index.js`. Hoje, os principais grupos são:

- `/` - Home do ambiente de prototipação
- `/teacher`, `/teacher/calendar`, `/teacher/calendar-figma`, `/teacher/trilhas-az`
- `/student`, `/administrator`, `/coordinator`, `/director`, `/network-manager`
- `/professor/*` - Jornada isolada do professor com subrotas de gestão, missões, relatórios, jogos, avaliações e programas
- `/sobre` - Página editorial sobre o ambiente

## 🧭 Convenção de Breadcrumb (FrontOffice)

Para as telas da jornada **Professor** (`/professor/*`), o projeto usa breadcrumb em ordem hierárquica:

- 1º item: agrupador/seção de navegação (com link de retorno)
- 2º item: tela atual (item ativo)

Seções padronizadas (exemplos):

- `Missões da Escola`
- `/professor/relatorios/evidencias`
- `/professor/relatorios/habilidades`
- `/professor/relatorios/acesso-alunos`
- `Gestão (Escola / Turmas)`
- `Jogos`
- `Avaliações`
- `Expedições`
- `Eventos`
- `Formação e Apoio`
- `Programas / Sistemas (Atalhos)`

## 🚧 Desenvolvimento Futuro

### Funcionalidades Planejadas

- [ ] Sistema de autenticação de usuários
- [ ] Painel administrativo para gerenciar jornadas
- [ ] Sistema de progresso do aluno
- [ ] Integração com APIs externas
- [ ] Mais componentes do Design System Vuexy
- [ ] Testes unitários e de integração
- [ ] Documentação Storybook dos componentes

### Integrações Possíveis

- Integração completa com o [Design System Vuexy](https://github.com/fabioeducacross/DesignSystem-Vuexy)
- Sistema de backend para persistência de dados
- Gamificação e badges de conquistas
- Sistema de avaliações e feedbacks

## 📚 Recursos

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Design System Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy/)
- [Educacross](https://educacross.com.br/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👥 Autores

- **Educacross Team** - [https://educacross.com.br/](https://educacross.com.br/)

## 📞 Contato

Para questões ou suporte, abra uma issue no repositório do GitHub.
