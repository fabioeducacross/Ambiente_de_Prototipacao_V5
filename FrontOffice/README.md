# Educacross FrontOffice - Protótipos de Jornadas

> Ambiente de prototipação para jornadas de usuário da plataforma Educacross usando Vue 3 + Vite + Design System Vuexy

## 📋 Visão Geral

Este projeto contém os protótipos interativos de todas as jornadas das 6 personas principais da plataforma Educacross:

- 👨‍🏫 **Professor** - Gestão de turmas, missões e acompanhamento
- 👨‍🎓 **Aluno** - Acesso a missões e acompanhamento de progresso
- 👥 **Coordenador** - Coordenação pedagógica e análise de turmas
- 🏢 **Diretor** - Gestão escolar e indicadores estratégicos
- ⚙️ **Administrador** - Configuração do sistema e gestão de usuários
- 🌐 **Gestor de Rede** - Gestão de múltiplas escolas

## 🚀 Tecnologias

- **Vue 3** - Composition API com `<script setup>`
- **Vite** - Build tool e dev server ultra-rápido
- **Vue Router** - Navegação entre jornadas
- **Design System Vuexy** - CSS variables, componentes e paleta de cores
- **Bootstrap Icons** - Ícones consistentes

## 📦 Estrutura do Projeto

```
FrontOffice/
├── src/
│   ├── assets/           # Imagens, logos, etc
│   ├── components/       # Componentes reutilizáveis
│   ├── router/           # Configuração de rotas
│   ├── views/            # Páginas principais
│   │   ├── teacher/      # Jornadas do professor
│   │   ├── student/      # Jornadas do aluno
│   │   ├── coordinator/  # Jornadas do coordenador
│   │   ├── director/     # Jornadas do diretor
│   │   ├── administrator/# Jornadas do administrador
│   │   ├── network-manager/ # Jornadas do gestor de rede
│   │   └── Home.vue      # Página inicial (seletor de personas)
│   ├── App.vue           # Componente raiz
│   ├── main.js           # Entry point
│   └── style.css         # Design System Vuexy (CSS variables)
├── public/               # Arquivos estáticos
├── index.html            # HTML principal
├── vite.config.js        # Configuração do Vite
└── package.json          # Dependências
```

## 🎨 Design System Vuexy

O projeto usa a paleta de cores e componentes do **Vuexy**:

### Cores Principais
- **Primary:** `#7367F0` (roxo)
- **Success:** `#28C76F` (verde)
- **Info:** `#00CFE8` (ciano)
- **Warning:** `#FF9F43` (laranja)
- **Danger:** `#EA5455` (vermelho)

### Cores GitHub (Categorias)
- **Blue:** `#0969DA`
- **Purple:** `#8250DF`
- **Green:** `#1A7F37`
- **Red:** `#D1242F`
- **Orange:** `#BF8700`
- **Cyan:** `#00CFE8`

### Componentes Disponíveis
- `.card` - Cards com hover effects
- `.btn` - Botões (primary, success, danger, outline)
- `.badge` - Badges coloridos
- `.grid` - Sistema de grid responsivo
- Utilitários de spacing, cores e tipografia

## 🛠️ Comandos

### Instalar dependências
```bash
npm install
```

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```
Acessa em: http://localhost:5174

### Build para produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

## 📖 Integração com Documentação

O FrontOffice está integrado com a **Documentação Docusaurus** do projeto:

- **Documentação:** http://localhost:3003
- **Protótipos:** http://localhost:5174

Cada dashboard possui link direto para a documentação da jornada correspondente.

## 🗺️ Jornadas Implementadas

### Status Atual

| Persona | Dashboard | Jornadas | Status |
|---------|-----------|----------|--------|
| Professor | ✅ | PROF-001 a PROF-004 | ⏳ Em desenvolvimento |
| Aluno | ✅ | ALUNO-001 a ALUNO-004 | 📋 Planejado |
| Coordenador | ✅ | COORD-001 a COORD-003 | 📋 Planejado |
| Diretor | ✅ | DIR-001 a DIR-003 | 📋 Planejado |
| Administrador | ✅ | ADM-001 a ADM-003 | 📋 Planejado |
| Gestor de Rede | ✅ | REDE-001 a REDE-003 | 📋 Planejado |

### Próximos Passos

1. ✅ Estrutura base criada
2. ✅ Home page e navegação implementadas
3. ✅ Dashboards de todas as personas
4. 🔄 **Próximo:** Implementar PROF-001 (Criar Turma)
5. 📋 Implementar jornadas prioritárias de cada persona
6. 📋 Criar componentes reutilizáveis
7. 📋 Conectar com backend (quando disponível)

## 🔗 Links Úteis

- [Documentação Completa](http://localhost:3003)
- [Design System Vuexy](https://fabioeducacross.github.io/DesignSystem-Vuexy)
- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## 📝 Convenções de Código

### Vue Components
```vue
<script setup>
// Composition API com <script setup>
import { ref, computed } from 'vue'
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Estilos com escopo */
</style>
```

### Naming
- **Componentes:** PascalCase (`MyComponent.vue`)
- **Views:** PascalCase (`Dashboard.vue`)
- **Rotas:** camelCase (`teacherDashboard`)
- **CSS classes:** kebab-case (`.persona-card`)

### CSS Variables
Use sempre as CSS variables do Design System:
```css
color: var(--primary);
background: var(--gray-100);
padding: var(--spacing-md);
border-radius: var(--radius-lg);
```

## 🤝 Contribuindo

1. Cada jornada deve ter sua própria página em `src/views/[persona]/`
2. Usar componentes reutilizáveis sempre que possível
3. Manter consistência com o Design System Vuexy
4. Documentar jornadas complexas no README
5. Testar responsividade (mobile, tablet, desktop)

## 📄 Licença

Educacross © 2026 - Uso interno
