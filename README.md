# Ambiente de Prototipação V5

Ambiente de prototipação para criar jornadas educacionais usando Vue 3 e o Design System Vuexy.

## 📖 Visão Geral

Este projeto é um ambiente de prototipação para a criação e teste de jornadas educacionais da [Educacross](https://educacross.com.br/). Utiliza Vue 3 com Vite, o Design System baseado no Vuexy, e um sistema de dados simples em JSON.

## 🚀 Características

- **Vue 3** com Composition API e `<script setup>`
- **Vue Router** para navegação entre páginas
- **Design System Vuexy** inspirado em cores e componentes
- **Banco de dados JSON** simples e eficiente
- **Interface Responsiva** que funciona em desktop e mobile
- **Sistema de Jornadas Educacionais** completo

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

### Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

O servidor será iniciado em [http://localhost:5173](http://localhost:5173)

### Build para Produção

```bash
# Criar build de produção
npm run build

# Visualizar build de produção localmente
npm run preview
```

### Publicação (GitHub Pages)

1. Faça push para `v1.1` ou `main` (ou use **Run workflow** no GitHub Actions para `Deploy Vite to GitHub Pages`).
2. O workflow executa `npm ci` + `npm run build` e publica o conteúdo de `dist`.
3. Acesse a versão pública em https://fabioeducacross.github.io/Ambiente_de_Prototipacao_V5/.

## 📁 Estrutura do Projeto

```
Ambiente_de_Prototipacao_V5/
├── public/                      # Arquivos estáticos
│   └── vuexy/                  # Assets do Design System Vuexy
│       ├── css/                # CSS do Vuexy
│       ├── js/                 # JavaScript do Vuexy
│       ├── fonts/              # Fontes do Vuexy
│       └── vendors/            # Bibliotecas de terceiros
├── src/
│   ├── components/             # Componentes Vue reutilizáveis
│   ├── data/                   # Dados em JSON
│   │   └── journeys.json      # Dados das jornadas educacionais
│   ├── router/                 # Configuração do Vue Router
│   │   └── index.js           # Rotas da aplicação
│   ├── views/                  # Páginas/Views da aplicação
│   │   ├── Home.vue           # Página inicial
│   │   ├── JourneyList.vue    # Lista de jornadas
│   │   └── JourneyDetail.vue  # Detalhes de uma jornada
│   ├── App.vue                # Componente raiz
│   ├── main.js                # Arquivo de entrada
│   └── style.css              # Estilos globais
├── index.html                  # HTML principal
├── package.json               # Dependências e scripts
├── vite.config.js             # Configuração do Vite
└── README.md                  # Este arquivo
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

Os dados são armazenados em arquivos JSON na pasta `src/data/`. Atualmente, incluímos:

### Jornadas Educacionais (`journeys.json`)

Cada jornada contém:
- **id**: Identificador único
- **titulo**: Título da jornada
- **descricao**: Descrição detalhada
- **categoria**: Categoria da jornada (Fundamentos, Metodologia, Avaliação, etc.)
- **duracao**: Duração estimada
- **nivel**: Nível de dificuldade (Iniciante, Intermediário, Avançado)
- **objetivos**: Array de objetivos de aprendizagem
- **modulos**: Array de módulos com lições
- **status**: Status da jornada (ativo, inativo, etc.)

### Exemplo de Estrutura

```json
{
  "id": 1,
  "titulo": "Introdução à Educação Digital",
  "descricao": "Jornada de aprendizado para iniciantes...",
  "categoria": "Fundamentos",
  "duracao": "4 semanas",
  "nivel": "Iniciante",
  "objetivos": [...],
  "modulos": [...],
  "status": "ativo"
}
```

## 🔧 Personalização

### Adicionar Nova Jornada

1. Abra o arquivo `src/data/journeys.json`
2. Adicione um novo objeto seguindo a estrutura existente
3. A jornada aparecerá automaticamente na lista

### Criar Nova Página

1. Crie um novo arquivo em `src/views/`
2. Adicione a rota em `src/router/index.js`
3. Navegue para a nova página usando `<router-link>` ou programaticamente

### Adicionar Componente Reutilizável

1. Crie um novo arquivo em `src/components/`
2. Importe e use o componente em suas views

## 🌐 Rotas Disponíveis

- `/` - Página inicial (Home)
- `/jornadas` - Lista de todas as jornadas
- `/jornada/:id` - Detalhes de uma jornada específica

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
