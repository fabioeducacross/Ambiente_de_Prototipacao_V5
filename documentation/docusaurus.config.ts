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

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
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
          title: 'Documentação',
          items: [
            {
              label: 'Começar',
              to: '/docs/intro',
            },
            {
              label: 'Jornadas',
              to: '/docs/journeys',
            },
            {
              label: 'Protótipos',
              to: '/docs/prototypes',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: 'Design System',
              href: 'https://fabioeducacross.github.io/DesignSystem-Vuexy',
            },
            {
              label: 'Educacross',
              href: 'https://educacross.com.br',
            },
          ],
        },
        {
          title: 'Repositório',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/fabioeducacross/Ambiente_de_Prototipacao_V5',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Educacross. Documentação construída com Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
