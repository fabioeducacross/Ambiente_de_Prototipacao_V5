import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ambiente de Prototipação V5',
  tagline: 'Documentação de Jornadas Educacionais e Design System Vuexy',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://fabioeducacross.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Ambiente_de_Prototipacao_V5/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fabioeducacross', // Usually your GitHub org/user name.
  projectName: 'Ambiente_de_Prototipacao_V5', // Usually your repo name.

  // Permite que o servidor dev suba mesmo com links pendentes até que as páginas sejam criadas
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
  },

  markdown: {
    mermaid: true,
    // Migração para Docusaurus v4: tratamento de links markdown quebrados
    preprocessor: ({filePath, fileContent}) => fileContent,
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: false,
        language: 'pt',
        maxSearchResults: 8,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Edit this page - Link para editar documentos no GitHub
          editUrl:
            'https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/edit/main/documentation/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Edit this page - Link para editar posts no GitHub
          editUrl:
            'https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/edit/main/documentation/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // Google Analytics configuration
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // TODO: Replace with actual tracking ID
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Educacross Prototipação',
      logo: {
        alt: 'Educacross Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          to: '/docs/journeys',
          label: 'Jornadas',
          position: 'left',
        },
        {
          to: '/docs/prototypes',
          label: 'Protótipos',
          position: 'left',
        },
        {
          href: 'https://fabioeducacross.github.io/DesignSystem-Vuexy',
          label: 'Design System',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '📚 Documentação',
          items: [
            {
              label: 'Começar',
              to: '/docs/intro',
            },
            {
              label: 'Regras de Negócio',
              to: '/docs/category/regras-de-negocio',
            },
            {
              label: 'Produto',
              to: '/docs/category/produto',
            },
            {
              label: 'Jornadas',
              to: '/docs/journeys',
            },
          ],
        },
        {
          title: '🤝 Ajuda e Suporte',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5/discussions',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
            },
            {
              label: 'Guia de Início Rápido',
              to: '/docs/setup/quickstart',
            },
          ],
        },
        {
          title: '🔗 Recursos',
          items: [
            {
              label: 'Design System Vuexy',
              href: 'https://fabioeducacross.github.io/DesignSystem-Vuexy',
            },
            {
              label: 'Educacross',
              href: 'https://educacross.com.br',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Educacross. Construído com ❤️ e Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
